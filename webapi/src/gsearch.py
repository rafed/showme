#! /usr/bin/env python

import requests
import json
import bibtexparser

from src.databaseUtil import DatabaseUtil
from src.scholarparser import ScholarParser
from src.requester import Requester
from src.util import Util

from flask import Blueprint, request
gsearch = Blueprint('gsearch', __name__)


@gsearch.route('/search/<query>')
def searchScholar(query):
    r = Requester.scholarQuerier(query)
    scholarParser = ScholarParser(r.text)
    return scholarParser.parse()

@gsearch.route('/search', methods=['POST'])
def advancedSearchScholar():
    data = request.get_json()

    words = data['words'] if 'words' in data else ''
    phrase = data['phrase'] if 'phrase' in data else ''
    words_some = data['words_some'] if 'words_some' in data else ''
    words_none = data['words_none'] if 'words_none' in data else ''
    scope = data['scope'] if 'scope' in data else 'any'        # 'any' or 'title'
    authors = data['authors'] if 'authors' in data else ''
    published_in = data['published_in'] if 'published_in' in data else ''
    year_low = data['year_low'] if 'year_low' in data else ''
    year_hi = data['year_hi'] if 'year_hi' in data else ''

    r = Requester.scholarQuerier(words,
                                 phrase=phrase,
                                 words_some=words_some,
                                 words_none=words_none,
                                 scope=scope,
                                 authors=authors,
                                 published_in=published_in,
                                 year_low=year_low,
                                 year_hi=year_hi)

    scholarParser = ScholarParser(r.text)
    return scholarParser.parse()

@gsearch.route('/bibtex', methods=['POST'])
def getPaperInfoController():
    data = request.get_json()
    data_cid = data['data_cid']
    title = data['title']
    authors = data['authors']
    return getPaperInfo(data_cid, title, authors)


def getPaperInfo(data_cid, title, authors):
    databaseUtil=DatabaseUtil()
    
    query = "SELECT DISTINCT id FROM Node WHERE id IN (SELECT DISTINCT node_id FROM Author WHERE name IN %s) AND title LIKE %s"
    print (title, data_cid, authors)
    args = (authors, title+'%')
    rows = databaseUtil.retrieve(query, args)

    if not rows: # Search Google scholar and insert in DB
        url = Requester.google + '/scholar?q=info:' + data_cid + ':scholar.google.com/&output=cite&scirp=9&hl=en'
        requester = Requester()
        r = requester.sendRequest(url)
        
        scholarParser = ScholarParser(r.text)
        biburl = scholarParser.getBibUrl()
        r = requester.sendRequest(biburl)
        
        bibtex_str = r.text
        bibtex = bibtexparser.loads(bibtex_str)
        bibjson = bibtex.entries
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
        for author in authors:
            args = (author, id)
            databaseUtil.executeCUDSQL(query, args)
        
        bibjson = {}
        bibjson['id'] = id
        bibjson['title'] = title
        bibjson['authors'] = authors
        bibjson['volume'] = volume
        bibjson['pages'] = pages
        bibjson['year'] = str(year)

        return json.dumps(bibjson)
    else: # already available in database
        for row in rows:
            id = row['id']
            break
        
        query = "SELECT id, title, journal, volume, pages, year FROM Node WHERE id=%s"
        rows = databaseUtil.retrieve(query, (id,))

        bibjson = {}

        for row in rows:
            bibjson['id'] = row['id']
            bibjson['title'] = row['title']
            bibjson['journal'] = row['journal']
            bibjson['volume'] = row['volume']
            bibjson['pages'] = row['pages']
            bibjson['year'] = str(row['year'])
            break
        
        print ("[*] Retrieving from database...")
        query = "SELECT name FROM Author WHERE node_id=%s"
        rows = databaseUtil.retrieve(query, (id,))

        authors = []
        for row in rows:
            authors.append(row['name'])
        bibjson['authors'] = authors

        print("Ami eito!!  ", json.dumps(bibjson))
        return json.dumps(bibjson)

@gsearch.route('/pdflink', methods=['POST'])
def getPdfLink():
    data = request.get_json()
    title = data['title']
    authors = data['authors']
    authors = " ".join(x for x in authors)

    r = Requester.scholarQuerier(title, authors=authors)
    scholarParser = ScholarParser(r.text)
    searchResult = json.loads(scholarParser.parse())

    reply = {'msg':'error'}
    if searchResult:
        firstResult = searchResult[0]
        resultTitle = firstResult['title']

        if Util.similar(title, resultTitle):
            reply['msg'] = "success"
            reply['pdflink'] = firstResult['pdflink']

    return json.dumps(reply)
