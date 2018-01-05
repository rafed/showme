#!/usr/bin/env python

from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import requests
import time

from stem import Signal
from stem.control import Controller

def printLinks(soup):
    for div in soup.findAll('h3', {'class':'gs_rt'}):
        for a in div.findAll('a', href=True):
            # if 'rafed123.github.io' in a['href']:
            print a.text
            print a['href']
            print

def nextURL(soup):
    table = soup.find('table')
    links = table.findAll('a')
    return google + links[-1]['href']

def newConn(): # tor connection
    with Controller.from_port(port = 9051) as controller: # edit /etc/torrc -> uncomment ControlPort 9051
        controller.authenticate(password="password")
        controller.signal(Signal.NEWNYM)

proxy = {'http':  'socks5://127.0.0.1:9050',
         'https': 'socks5://127.0.0.1:9050'}

toSearch = 'data cube'
google = 'https://scholar.google.com'
query = google + '/scholar?q=' + toSearch + '&btnG=&hl=en&as_sdt=0%2C5'

ua = UserAgent()
header = {'User-Agent':ua.random}


prevPage = ''
nextPage = query

counter = 0

while(prevPage != nextPage):

    if counter > 2:
        break

    r = requests.get(nextPage, header) # proxies=proxy

    if(r.status_code != 200):
        print r.status_code, "Error!!!"
        print 'Sleeping...'
        time.sleep(10)
        # newConn()
        continue
    
    soup = BeautifulSoup(r.text, 'html.parser')

    counter = counter + 1

    print 'Page no.', counter
    printLinks(soup)

    prevPage = nextPage
    nextPage = nextURL(soup)

    time.sleep(2)
