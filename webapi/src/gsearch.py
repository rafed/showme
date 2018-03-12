#! /usr/bin/env python

from fake_useragent import UserAgent
import requests
from bs4 import BeautifulSoup
import json
import bibtexparser
import re

from flask import Blueprint
gsearch = Blueprint('gsearch', __name__)

###### Constants ########
google = 'https://scholar.google.com'
header = {
    'Host':'scholar.google.com',
    'User-Agent':"Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language':'en-US,en;q=0.5',
    'Accept-Encoding':'gzip, deflate',
    'Connection':'keep-alive',
    'Upgrade-Insecure-Requests':1
}
#########################


def extractFromSearchResult(html):
    soup = BeautifulSoup(html, 'html.parser')
    result = []

    for div in soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
        if div.has_attr('data-cid'):
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

@gsearch.route('/search/<query>')
def searchForPdf(query):
    url = google + '/scholar?' \
        + 'q=' + query \
        + '&as_epq=' \
        + '&as_oq=' \
        + '&as_eq=' \
        + '&as_occt=' \
        + '&as_sauthors=' \
        + '&as_publication=' \
        + '&as_ylo=' \
        + '&as_yhi=' \
        + '&as_vis=' \
        + '&btnG=&hl=en' \
        + '&as_sdt=0%2C5' 

    # ua = UserAgent()
    # ua.random
    # cookie = {
    #     'NID':'121=GER9lM1XLuhCvzkLm0Ah7JDA1QwCzB-wMCYIbfCBwM0GOqQmd0K0TLh2TJS6cNR4kdGEm2hxLtoFVVHZZzDrYXQtdzT33prsDvhlLIQb7vIuJbbwZVw9ehcqNwgN5Nz6vAFdpYGYK-FwWCkONbRyYHCxvn1OwunDfF4w_HVIezMBAgYCTRNUzdFWDtoy0x67o7jmsXpC6Hj8EP7h5v7iygSxjFICseFQ23kUhokJsqeaAGOLoaaxBW50ZV5RxBX_v4Y7Njw4SvOg9uzs9ZPks8VFAJPjL0uSswUsz416xIjgs6RN9zJO',
    #     '1P_JAR':'2018-1-7-16',
    #     'SID':'nQV1fVCDraLjsxSGSwyW_5SYzvIBv1gJicxF5zPg9Tc7Uo0BMm3nTj-3ObcmJ-REhc4tsA.',
    #     'HSID':'APNYTo-oP2-abgnwv',
    #     'APISID':'tS49irhdEH2SH0-D/Arx0oOdhGB5MQKMWm',
    #     'OGP':'-5061821:-5061451:',
    #     'GSP':'LD=en:CF=4:LM=1515132400:S=Yb-wF4RBxGdxUEyy',
    #     'SIDCC':'AAiTGe_CreNZSD-chgg-WBYa3v0GyZ1nFe2BFZnRFeTB5M__mlEyJ3U3EPFoHRmaguL8vsSE-XB88IBC3cQoKA',
    #     'OGPC':'873035776-1:'
    # }

    r = requests.get(url, header)
    if(r.status_code != 200):
        print r.status_code, "Error!!!"
        return "Error in searching google scholar", r.status_code

    return extractFromSearchResult(r.text)


@gsearch.route('/bibtex/<id>')
def getBibtex(id):
    refurl = google + '/scholar?q=info:' + id + ':scholar.google.com/&output=cite&scirp=9&hl=en'
    
    ua = UserAgent()
    header = {'User-Agent':ua.random}

    r = requests.get(refurl, header)
    soup = BeautifulSoup(r.text, 'html.parser')

    for a in soup.findAll('a', {'class':'gs_citi'}):
        if 'BibTeX' in a.text:
            biburl = a['href']
            r = requests.get(biburl)
            bibtex_str = r.text
            
            bib = bibtexparser.loads(bibtex_str)
            return json.dumps(bib.entries)
            
    return 'Not found!'

# @gsearch.route('/expandchild/<title>')
# def searchPdfLink(title):
#     url = google + '/scholar?q=' + query + '&btnG=&hl=en&as_sdt=0%2C5'

#     ua = UserAgent()
#     header = {'User-Agent':ua.random}

#     r = requests.get(url, header)
#     if(r.status_code != 200):
#         print r.status_code, "Error!!!"
#         return "Error in searching google scholar", r.status_code

#     soup = BeautifulSoup(r.text, 'html.parser')

#     result = []

#     for div in soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
#         paper = {}

#         paper['data-cid'] = div['data-cid']
#         for title in div.findAll('h3', {'class':'gs_rt'}):
#             for a in title.findAll('a', href=True):
#                 paper['title'] = a.text
#                 paper['sitelink'] = a['href']

#         for desc in div.findAll(True, {'class':'gs_rs'}):
#             paper['description'] = desc.text

#         for pdf in div.findAll(True, {'class':'gs_or_ggsm'}):
#             for a in pdf.findAll('a', href=True):
#                 paper['pdflink'] = a['href']

#         if 'pdflink' in paper.keys():
#             result.append(paper)

#     return json.dumps(result)