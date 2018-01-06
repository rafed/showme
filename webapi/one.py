#! /usr/bin/env python

from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import json
import bibtexparser
import re

from flask import Blueprint
one = Blueprint('one', __name__)


def extractInfoFromDiv():
    # TO DO
    print 'lala'

@one.route('/search/<query>')
def searchPdf(query):
    google = 'https://scholar.google.com'
    url = google + '/scholar?q=' + query + '&btnG=&hl=en&as_sdt=0%2C5'

    ua = UserAgent()
    header = {'User-Agent':ua.random}

    r = requests.get(url, header)
    if(r.status_code != 200):
        print r.status_code, "Error!!!"
        return "Error in searching google scholar", r.status_code

    soup = BeautifulSoup(r.text, 'html.parser')

    result = []

    for div in soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
        paper = {}

        paper['data_cid'] = div['data-cid']
        for title in div.findAll('h3', {'class':'gs_rt'}):
            for a in title.findAll('a', href=True):
                paper['title'] = a.text
                paper['sitelink'] = a['href']

        for desc in div.findAll(True, {'class':'gs_rs'}):
            paper['description'] = desc.text

        # re for year
        for string in div.findAll(True, {'class':'gs_a'}):
            year = re.compile('[12][0-9]{3}')
            matchresult = year.search(string.text)

            if matchresult:
                paper['pubin'] = matchresult.group(0)

        for pdf in div.findAll(True, {'class':'gs_or_ggsm'}):
            for a in pdf.findAll('a', href=True):
                paper['pdflink'] = a['href']

        if 'pdflink' in paper.keys():
            result.append(paper)

    return json.dumps(result)

@one.route('/searchPdfLink/<title>')
def searchPdfLink(title):
    google = 'https://scholar.google.com'
    url = google + '/scholar?q=' + query + '&btnG=&hl=en&as_sdt=0%2C5'

    ua = UserAgent()
    header = {'User-Agent':ua.random}

    r = requests.get(url, header)
    if(r.status_code != 200):
        print r.status_code, "Error!!!"
        return "Error in searching google scholar", r.status_code

    soup = BeautifulSoup(r.text, 'html.parser')

    result = []

    for div in soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
        paper = {}

        paper['data-cid'] = div['data-cid']
        for title in div.findAll('h3', {'class':'gs_rt'}):
            for a in title.findAll('a', href=True):
                paper['title'] = a.text
                paper['sitelink'] = a['href']

        for desc in div.findAll(True, {'class':'gs_rs'}):
            paper['description'] = desc.text

        for pdf in div.findAll(True, {'class':'gs_or_ggsm'}):
            for a in pdf.findAll('a', href=True):
                paper['pdflink'] = a['href']

        if 'pdflink' in paper.keys():
            result.append(paper)

    return json.dumps(result)

@one.route('/bibtex/<id>')
def getBibtex(id):
    refurl = 'https://scholar.google.com/scholar?q=info:' + id + ':scholar.google.com/&output=cite&scirp=9&hl=en'
    
    ua = UserAgent()
    header = {'User-Agent':ua.random}

    r = requests.get(refurl, header)
    soup = BeautifulSoup(r.text, 'html.parser')

    for a in soup.findAll('a', {'class':'gs_citi'}):
        if 'BibTeX' in a.text:
            biburl = a['href']
            r = requests.get(biburl)
            bibtex_str = r.text
            
            bib_database = bibtexparser.loads(bibtex_str)
            return json.dumps(bib_database.entries)
            
    return 'Not found!'
