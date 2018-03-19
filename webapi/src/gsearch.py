#! /usr/bin/env python

import requests
from bs4 import BeautifulSoup
import json
import bibtexparser
import re
import os
import http.cookiejar

from src.databaseUtil import DatabaseUtil
from src.scholarparser import ScholarParser
from src.requester import Requester

from flask import Blueprint, request
gsearch = Blueprint('gsearch', __name__)

google = 'https://scholar.google.com'

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

    requester = Requester()
    r = requester.sendRequest(url)
    if(r.status_code != 200):
        print (r.status_code, "Error!!!")
        return "Error in searching google scholar", r.status_code

    scholarParser = ScholarParser(r.text)
    return scholarParser.parse()


@gsearch.route('/bibtex', methods=['POST'])
def getPaperInfo():
    databaseUtil=DatabaseUtil()
    data = request.get_json()

    data_cid = data['data_cid']
    title = data['title']
    authors = data['authors']
    print (data_cid, title, authors[0], authors[1])

    query = "SELECT DISTINCT id FROM Node WHERE id IN (SELECT DISTINCT node_id FROM Author WHERE name IN %s) AND title LIKE %s"
    args = (authors, title+'%')
    rows = databaseUtil.retrieve(query, args)

    if not rows: # Search Google scholar and insert in DB
        url = google + '/scholar?q=info:' + data_cid + ':scholar.google.com/&output=cite&scirp=9&hl=en'
        requester = Requester()
        r = requester.sendRequest(url)
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
        journal = bibjson['journal'] if 'journal' in bibjson else None
        volume = bibjson['volume'] if 'volume' in bibjson else None
        pages = bibjson['pages'] if 'pages' in bibjson else None
        year = bibjson['year'] if 'year' in bibjson else None

        print ("[*] Inserting in Database...")

        query = "INSERT INTO Node (title, journal, volume, pages, year) VALUES (%s, %s, %s, %s, %s)"
        args = (title, journal, volume, pages, year)
        id = databaseUtil.executeCUDSQL(query, args)

        query = "INSERT INTO Author (name, node_id) VALUES (%s, %s)"
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
    else: # already available in database
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
        