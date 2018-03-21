
from flask import request
import requests
import json
import xml.etree.ElementTree as ET
import datetime
import re

from src.databaseUtil import DatabaseUtil
from src.rating import edgeRating
from src.util import Util

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.layout import LAParams, LTTextBox, LTTextLine
from pdfminer.converter import PDFPageAggregator

# Import this to raise exception whenever text extraction from PDF is not allowed
from pdfminer.pdfpage import PDFTextExtractionNotAllowed

from flask import Blueprint
pdfparser = Blueprint('pdfparser', __name__)


def extractTextFromPDF(filename): # Return whole text & paragraphs
    password = ""
    extracted_text = ""

    fp = open(filename, "rb")

    parser = PDFParser(fp)
    document = PDFDocument(parser, password)

    if not document.is_extractable:
        raise PDFTextExtractionNotAllowed
        
    rsrcmgr = PDFResourceManager()
    laparams = LAParams()
    device = PDFPageAggregator(rsrcmgr, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)

    stop=False
    paras=[]
    
    for page in PDFPage.create_pages(document):
        interpreter.process_page(page)
        layout = device.get_result()
        for lt_obj in layout:
            if isinstance(lt_obj, LTTextBox) or isinstance(lt_obj, LTTextLine):
                extracted_text += lt_obj.get_text()
                
                if "references" in lt_obj.get_text().lower():
                    stop=True	

            if isinstance(lt_obj, LTTextBox) and stop==False:
                paras.append(lt_obj.get_text())
        
    fp.close()
    return extracted_text, paras

def getCitations(para, candidateSnippets):
    text=para.replace('\n', ' ') # .encode('utf-8')
    candidate_citation_regex_result=re.findall(r'(\[.*?\])',text)
    candidate_citations=[]
    valid_citations={}

    for (group) in candidate_citation_regex_result:
        candidate_citations.append(group)

    filter_list = ['[', ']', ',']

    for candidate_citation in candidate_citations:
        transformed_candidate_citation=candidate_citation
        for item in filter_list:
            transformed_candidate_citation=transformed_candidate_citation.replace(item,"")
        transformed_candidate_citation=re.sub(r"\s+", "", transformed_candidate_citation, flags=re.UNICODE)
        valid_citations[candidate_citation]=transformed_candidate_citation

    regex_extract_searched = re.compile(r"^\s+|\s*,\s*|\s+$")

    for key, _ in valid_citations.items():
        numeric_key=key.replace('[',"")
        numeric_key=numeric_key.replace(']',"")
        for cite in regex_extract_searched.split(numeric_key):
            if str(cite) not in candidateSnippets.keys():
                candidateSnippets[str(cite)]=[]
            candidateSnippets[str(cite)].append(text)
    return candidateSnippets

def extractCitationSnippets(citeKey, paras):
    candidateSnippets={}
    for para in paras:
	    candidateSnippets = getCitations(para,candidateSnippets)
    
    finalSnippets={}
    for i in citeKey:
        if i in candidateSnippets.keys():
            finalSnippets[i]=candidateSnippets[i]

    return finalSnippets

def extractReferences(extracted_text, paras):
    extracted_text = extracted_text[extracted_text.lower().find("references")+10:]
    text=extracted_text.strip()
    text = text.split('[')
    
    bibs = []
    citeKey=[]

    for tex in text:
        tex_split = tex.split(']')
        if len(tex_split) < 2:
            continue
        ref = tex_split[1]
        bibs.append(ref.replace('\n', ' '))
        citeKey.append(str(tex_split[0]))
    
    citeSnippets = extractCitationSnippets(citeKey, paras)

    print("[*] Sending request to freecite API...")

    HOST = 'http://freecite.library.brown.edu/citations/create'
    data = {"citation[]" : bibs}
    r = requests.post(HOST, data=data, headers={"Accept": "text/xml"})

    print("[*] Received xml. Parsing xml...")

    xml = r.text
    etree = ET.fromstring(xml.encode('utf-8'))

    cites = []
    counter = 0
    for citation in etree.findall("citation"):
        cite = Util.getCites(citation)

        if citeKey[counter] in citeSnippets.keys():
            cite['snippets'] = citeSnippets[citeKey[counter]]
        else:
            cite['snippets'] = []

        counter += 1
        cites.append(cite)

    return cites

@pdfparser.route('/parse', methods=['POST'])
def parsePdf():
    databaseUtil=DatabaseUtil()
    data = request.get_json()

    pdflink = data['pdflink']
    title = data['title']
    authors = data['authors']

    # Find the id of the node associated with the paper (it will be our parent_id)
    query = "SELECT DISTINCT id FROM Node WHERE id IN (SELECT DISTINCT node_id FROM Author WHERE name IN %s) AND title LIKE %s"
    args = (authors, title)
    rows = databaseUtil.retrieve(query, args)
    parent_id = rows[0]['id']
    print ("THE parent node id is", parent_id) ####################

    # Now find if edges exist && bring everything from Edge table
    query = "SELECT id, sourcenode_id, targetnode_id FROM Edge WHERE sourcenode_id=%s"
    args = (parent_id,)
    rows = databaseUtil.retrieve(query, args)

    if not rows:    # Search Google scholar and insert in DB
        print ("[*] Parsing pdf for references...")
        pdf = requests.get(pdflink)

        filename = "./pdfs/" + str(datetime.datetime.now().date()) + '_' + str(datetime.datetime.now().time()).replace(':', '.') + ".pdf"

        print("[*] Opening file...")

        with open(filename, 'wb') as f:
            f.write(pdf.content)
        
        print("[*] Extracting text...")

        extracted_text, paras = extractTextFromPDF(filename)
        references = extractReferences(extracted_text, paras)

        print("[*] Extraction done.")

        queryCheck = "SELECT DISTINCT id FROM Node WHERE id IN (SELECT DISTINCT node_id FROM Author WHERE name IN %s) AND title LIKE %s"
        # Insert in db
        queryData = "INSERT INTO Node (title, journal, volume, pages, year) VALUES (%s, %s, %s, %s, %s)"
        queryAuthor = "INSERT INTO Author (name, node_id) VALUES (%s, %s)"
        queryEdge = "INSERT INTO Edge (sourcenode_id, targetnode_id) values (%s, %s)"
        querySnippet = "INSERT INTO Citation_snippet (edge_id, text) VALUES (%s, %s)"

        for ref in references:
            title = ref['title'] #if 'title' in ref else None
            journal = ref['journal'] #if 'journal' in ref else None
            authors = ref['authors'] #if 'authors' in ref else None
            volume = ref['volume'] #if 'volume' in ref else None
            pages = ref['pages'] #if 'pages' in ref else None
            year = str(ref['year']) #if 'year' in ref else None

            args = (authors, title+'%')
            rows = databaseUtil.retrieve(queryCheck, args)
            
            if not rows:
                print("[*] Inserting node with year", year)
                args = (title, journal, volume, pages, year)
                id = databaseUtil.executeCUDSQL(queryData, args)

                for a in authors:
                    args = (a, id)
                    print("[*] Inserting author", a, "with id", id)
                    databaseUtil.executeCUDSQL(queryAuthor, args)
            else:
                id = rows[0]['id']
            
            ref['id'] = id
            args = (parent_id, id)
            edge_id = databaseUtil.executeCUDSQL(queryEdge, args)
            ref['edge_id'] = edge_id
            ref['edge_rating'] = 0
            
            snippets = ref['snippets']
            for snip in snippets:
                args = (edge_id, snip)
                print ("[*] Inserting a snippet...")
                databaseUtil.executeCUDSQL(querySnippet, args)
            
        return json.dumps(references)
    else:   # Retrieve from database and return
        print ("[*] Returning references from database")

        queryData = "SELECT id, title, journal, volume, pages, year FROM Node WHERE id=%s"
        queryAuthor = "SELECT name FROM Author WHERE node_id=%s"
        queryEdge = "SELECT targetnode_id FROM Edge WHERE sourcenode_id=%s"
        querySnippets = "SELECT text FROM Citation_snippet WHERE edge_id=%s"
        
        refJson = []
        
        for row in rows:
            targetNodeId = row['targetnode_id']
            edge_id = row['id']
            
            # Get reference data
            datas = databaseUtil.retrieve(queryData, (targetNodeId,))

            for data in datas:
                # Get authors
                authors = databaseUtil.retrieve(queryAuthor, (targetNodeId,))
                authors = [a['name'] for a in authors]

                # Get snippets
                snippets = databaseUtil.retrieve(querySnippets, (edge_id,))
                snippets = [s['text'] for s in snippets]

                ref = {}
                ref['id'] = data['id']
                ref['title'] = data['title']
                ref['authors'] = authors
                ref['journal'] = data['journal']
                ref['volume'] = data['volume']
                ref['pages'] = data['pages']
                ref['year'] = str(data['year'])
                ref['edge_id'] = edge_id
                ref['edge_rating'] = edgeRating(edge_id)
                ref['snippets'] = snippets
                break # because only one row should be here

            refJson.append(ref)
        
        return json.dumps(refJson)
