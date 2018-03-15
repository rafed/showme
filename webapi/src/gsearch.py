#! /usr/bin/env python

import requests
from bs4 import BeautifulSoup
import json
import bibtexparser
import re
import os
import http.cookiejar

from databaseUtil import DatabaseUtil

from flask import Blueprint, request
gsearch = Blueprint('gsearch', __name__)

###### Constants ######
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
cj = http.cookiejar.MozillaCookieJar()
cookiepath = os.getcwd()
cj.load(os.path.join(cookiepath, 'cookies.txt'))
#########################

###### GOOGLE SEARCH TEXT EXTRACTION METHODS ######
def getTitle(div):
    for string in div.findAll('h3', {'class':'gs_rt'}):
        for a in string.findAll('a', href=True):
            title = a.text
            if title.endswith('...'):
                title = title[:-3]
            return title
    return None

def getDescription(div):
    for desc in div.findAll(True, {'class':'gs_rs'}):
        return desc.text
    return None

def getYear(div):
    for string in div.findAll(True, {'class':'gs_a'}):
        year = re.compile('[12][0-9]{3}')
        matchresult = year.search(string.text)

        if matchresult:
            return matchresult.group(0)
    return None

def getAuthors(div):
    for stuff in div.findAll(True, {'class':'gs_a'}):
        if "-" in stuff.text:
            string = stuff.text.split("-", 1)[0]
        else:
            string = stuff.text

        string.strip()

        if "," in string:
            authors = []
            
            fullname = [x.strip() for x in string.split(",")]
            
            for name in fullname:
                if " " in name:
                    lastname = name.split()[-1]
                    lastname.strip()
                else:
                    lastname = name

                authors.append(lastname)
            
            return authors
        else:
            if " " in string:
                return string.split()[-1].strip()
            else:
                return string

    return None
    
def getSiteLink(div):
    for string in div.findAll('h3', {'class':'gs_rt'}):
        for a in string.findAll('a', href=True):
            return a['href']
    return None

def getPdfLink(div):
    for pdf in div.findAll(True, {'class':'gs_or_ggsm'}):
        for a in pdf.findAll('a', href=True):
            return a['href']
    return None
###################################################

def extractFromSearchResult(html):
    soup = BeautifulSoup(html, 'html.parser')
    result = []

    for div in soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
        if div.has_attr('data-cid'):
            paper = {}

            paper['data_cid'] = div['data-cid']

            paper['title'] = getTitle(div)
            paper['description'] = getDescription(div)
            paper['sitelink'] = getSiteLink(div)

            year = getYear(div)
            if year is not None:
                paper['pubin'] = year
            
            authors = getAuthors(div)
            if authors is not None:
                paper['authors'] = authors

            pdflink = getPdfLink(div)
            if pdflink is not None:
                paper['pdflink'] = pdflink

            if 'pdflink' in paper.keys():
                result.append(paper)

    return json.dumps(result)

@gsearch.route('/search/<query>')
def searchScholar(query):
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

    r = requests.get(url, header, cookies = cj)
    if(r.status_code != 200):
        print (r.status_code, "Error!!!")
        return "Error in searching google scholar", r.status_code

    return extractFromSearchResult(r.text)


@gsearch.route('/bibtex', methods=['POST'])
def getBibtex():
    databaseUtil=DatabaseUtil()
    data = request.get_json()

    data_cid = data['data_cid']
    title = data['title']
    authors = data['authors']
    print (data_cid, title, authors[0], authors[1])

    query = "SELECT id FROM Node WHERE id in (SELECT node_id FROM Author WHERE name in (%s, %s)) AND title LIKE %s"
    args = (authors[0], authors[1], title+'%')
    rows = databaseUtil.retrieve(query, args)

    if not rows: # Search Google scholar and insert in DB
        refurl = google + '/scholar?q=info:' + data_cid + ':scholar.google.com/&output=cite&scirp=9&hl=en'
        
        r = requests.get(refurl, header, cookies=cj)
        soup = BeautifulSoup(r.text, 'html.parser')

        for a in soup.findAll('a', {'class':'gs_citi'}):
            if 'BibTeX' in a.text:
                biburl = a['href']
                r = requests.get(biburl)
                bibtex_str = r.text
                
                bib = bibtexparser.loads(bibtex_str)
                bibstring = json.dumps(bib.entries)
                break
        else:
            return "{'error':'Not found'}"
        
        bibjson = json.loads(bibstring)
        bibjson = bibjson[0]

        title = bibjson['title']
        # authors already got from client request, dont take from bibtex
        # author = bibjson['author']
        # authors = author.split(",")
        journal = bibjson['journal'] if 'journal' in bibjson else ''
        volume = bibjson['volume'] if 'volume' in bibjson else ''
        pages = bibjson['pages'] if 'pages' in bibjson else ''
        year = bibjson['year'] if 'year' in bibjson else ''

        print ("[*] Inserting in Database...")

        query = "INSERT INTO Node (title, journal, volume, pages, year) VALUES (%s, %s, %s, %s, %s)"
        args = (title, journal, volume, pages, year)
        id = databaseUtil.executeCUDSQL(query, args)

        query = "INSERT INTO Author VALUES (%s, %s)"
        for a in authors:
            args = (a, id)
            databaseUtil.executeCUDSQL(query, args)
        
        bibjson = {}
        bibjson['title'] = title
        bibjson['authors'] = authors
        bibjson['volume'] = volume
        bibjson['pages'] = pages
        bibjson['year'] = year

        return json.dumps(bibjson)
    else:
        for row in rows:
            id = row['id']
            break
        
        query = "SELECT title, journal, volume, pages, year FROM Node WHERE id=%s"
        args = (id,)
        rows = databaseUtil.retrieve(query, args)

        bibjson = {}

        for row in rows:
            bibjson['title'] = row['title']
            bibjson['journal'] = row['journal']
            bibjson['volume'] = row['volume']
            bibjson['pages'] = row['pages']
            bibjson['year'] = row['year']
            break
        
        print ("[*] Retrieving from database...")

        query = "SELECT name FROM Author WHERE node_id=%s"
        args = (id,)
        rows = databaseUtil.retrieve(query, args)

        authors = []
        for row in rows:
            authors.append(row['name'])

        bibjson['authors'] = authors

        return json.dumps(bibjson)
        