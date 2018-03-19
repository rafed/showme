#! /usr/bin/env python

from flask import request
import requests
import json
import xml.etree.ElementTree as ET
import datetime

from src.databaseUtil import DatabaseUtil

from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
from pdfminer.layout import LAParams, LTTextBox, LTTextLine
from pdfminer.converter import PDFPageAggregator

from pdfminer.pdfpage import PDFTextExtractionNotAllowed


from flask import Blueprint
pdf = Blueprint('pdf', __name__)

def extractTextFromPDF(filename):
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

    for page in PDFPage.create_pages(document):
        interpreter.process_page(page)
        layout = device.get_result()
        for lt_obj in layout:
            if isinstance(lt_obj, LTTextBox) or isinstance(lt_obj, LTTextLine):
                extracted_text += lt_obj.get_text()
    
    fp.close()
    return extracted_text

def extractReferences(extracted_text):
    extracted_text = extracted_text[extracted_text.lower().find("references")+10:]
    text=extracted_text.strip()
    text = text.split('[')
    
    bibs = []
    for tex in text:
        tex_split = tex.split(']')
        if len(tex_split)<2:
            continue
        ref = tex_split[1]
        
        bibs.append(ref.replace('\n', ' '))
    
    HOST = 'http://freecite.library.brown.edu/citations/create'
    data = {"citation[]" : bibs}

    r = requests.post(HOST, data=data, headers={"Accept": "text/xml"})

    xml = r.text
    print (xml)
    etree = ET.fromstring(xml.encode('utf-8'))

    cites = []
    for citation in etree.findall("citation"):
        bib = {}
        authors = [i.text for i in citation.iter("author")]
        trimmedAuthors = []
        for a in authors:
            if " " in a:
                lastname = a.split()[-1]
            else:
                lastname = a
            trimmedAuthors.append(lastname)

        bib['authors'] = trimmedAuthors
        bib['title'] = gettext(citation, 'title')
        bib['journal'] = gettext(citation, 'journal')
        bib['volume'] = gettext(citation, 'volume')
        bib['pages'] = gettext(citation, 'pages')
        bib['year'] = gettext(citation, 'year')
        # bib['raw_string'] = gettext(citation, 'raw_string')
        
        # print ("[*] This is a reference", bib)
        cites.append(bib)

    return json.dumps(cites)

@pdf.route('/parse', methods=['POST'])
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
    print ("THE parent node id is", parent_id)


    # Now find if edges exist
    query = "SELECT sourcenode_id, targetnode_id FROM Edge WHERE sourcenode_id=%s"
    args = (parent_id,)
    rows = databaseUtil.retrieve(query, args)

    if not rows:    # Search Google scholar and insert in DB
        print ("[*] Parsing pdf for references...")
        pdf = requests.get(pdflink)

        filename = "./pdfs/" + str(datetime.datetime.now().date()) + '_' + str(datetime.datetime.now().time()).replace(':', '.') + ".pdf"

        with open(filename, 'wb') as f:
            f.write(pdf.content)
        
        extracted_text = extractTextFromPDF(filename)
        references = json.loads(extractReferences(extracted_text))

        # Insert in db
        queryData = "INSERT INTO Node (title, journal, volume, pages, year) VALUES (%s, %s, %s, %s, %s)"
        queryAuthor = "INSERT INTO Author (name, node_id) VALUES (%s, %s)"
        queryEdge = "INSERT INTO Edge (sourcenode_id, targetnode_id) values (%s, %s)"

        for ref in references:
            print ("The boss", ref)
            title = ref['title'] if 'title' in ref else ''
            journal = ref['journal'] if 'journal' in ref else ''
            authors = ref['authors'] if 'authors' in ref else ''
            volume = ref['volume'] if 'volume' in ref else ''
            pages = ref['pages'] if 'pages' in ref else ''
            year = ref['year'] if 'year' in ref else ''

            args = (title, journal, volume, pages, year)
            id = databaseUtil.executeCUDSQL(queryData, args)

            for a in authors:
                args = (a, id)
                print("Inserting authors", a, id)
                databaseUtil.executeCUDSQL(queryAuthor, args)

            args = (parent_id, id)
            databaseUtil.executeCUDSQL(queryEdge, args)
            
        return json.dumps(references)
    else:   # Return from database
        print ("[*] Returning references from database")
        childNodes = [row['targetnode_id'] for row in rows]

        refJson = []
        queryData = "SELECT title, journal, volume, pages, year FROM Node WHERE id=%s"
        queryAuthor = "SELECT name FROM Author WHERE node_id=%s"
                
        for id in childNodes:
            # Get reference data
            args = (id,)
            datas = databaseUtil.retrieve(queryData, args)

            for data in datas:
                # Get authors
                args = (id,)
                authors = databaseUtil.retrieve(queryAuthor, args)
                
                ref = {}
                ref['title'] = data['title']
                ref['authors'] = authors
                ref['journal'] = data['journal']
                ref['volume'] = data['volume']
                ref['pages'] = data['pages']
                ref['year'] = data['year']
                break # because only one row should be here

            refJson.append(ref)
        
        return json.dumps(refJson)


def gettext(citation, tag):
    if citation.find(tag) is not None:
        return citation.find(tag).text
    else:
        return ''
