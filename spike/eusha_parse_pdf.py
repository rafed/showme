#! /usr/bin/env python

from flask import request
import requests
import json
import xml.etree.ElementTree as ET
import datetime

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
    # print "Extracted text:", extracted_text
    text=extracted_text.strip()
    text = text.split('[')
    
    bibs = []
    for tex in text:
        tex_split = tex.split(']')
        if len(tex_split)<2:
            continue
        ref = tex_split[1]
        
        index = tex_split[0]
        bibs.append(ref)

	print bibs
    new_bibs = []
    for tex in bibs:

        if (tex == bibs[-1]):
			#print tex
			'''tex_line = tex.split('\n')
			new_bib = tex_line[0]

			for i in range (len(tex_line)-1):
				new_bib = new_bib + tex_line[i+1]
				if (tex_line[i+1].endswith(".") or tex_line[i+1].endswith(". ") or tex_line[i+1].endswith(".\n")):
					if len(tex_line[i]) > len(tex_line[i+1]):
						break
			new_bib.replace('\n', ' ')
			new_bibs.append (new_bib)
			print new_bib'''
			
        else:
			new_bibs.append (tex.replace('\n', ' '))

    return new_bibs

    
@pdf.route('/parse/<path:pdflink>')
def parsePdf(pdflink):
    databaseUtil=DatabaseUtil()
    data = request.get_json()

    data_cid = data['data_cid']
    title = data['title']
    authors = data['authors']
    pdf = requests.get(pdflink)

    filename = "./pdfs/" + str(datetime.datetime.now().date()) + '_' + str(datetime.datetime.now().time()).replace(':', '.') + ".pdf"

    with open(filename, 'wb') as f:
        f.write(pdf.content)
    
    extracted_text = extractTextFromPDF(filename)
    return extractReferences(extracted_text)


def gettext(citation, tag):
    if citation.find(tag) is not None:
        return citation.find(tag).text
    else:
        return ''

if __name__ == '__main__':
    pdf_text = extractTextFromPDF('decision.pdf')
    extractReferences(pdf_text)
