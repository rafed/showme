#!/usr/bin/env python

from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import requests
import time
import random

# from stem import Signal
# from stem.control import Controller

def printLinks(soup):
    count = 0
    for div in soup.findAll('h3', {'class':'gs_rt'}):
        for a in div.findAll('a', href=True):
            # print a.text
            # print a['href']
            # print
            count = count + 1
    print 'parsed', count, 'papers',

def newConn(): # tor connection
    with Controller.from_port(port = 9051) as controller: # edit /etc/torrc -> uncomment ControlPort 9051
        controller.authenticate(password="password")
        controller.signal(Signal.NEWNYM)

def sleepRandom(limit):
    x = random.randint(limit/2, limit)
    print 'Sleeping', x, 'seconds'
    time.sleep(x)

proxylist = (
    #'http':  'socks5://127.0.0.1:9050', # Tor
    #'https': 'socks5://127.0.0.1:9050',
    ({'https':'socks5://104.151.241.30:19241'}, 'USA Miami'), 
    ({'https':'socks5://104.200.227.12:26337'}, 'USA LA'),
    ({'https':'socks4://104.200.227.38:26337'}, 'USA LA 2'),
    ({'http':'http://87.79.68.60:8080'}, 'Germany 1'),
    ({'https':'socks5://160.44.206.89:8888'}, 'Germany 2'),
    ({'http':'https://45.115.99.126:53281'}, 'India Delhi'),
    ({'https':'socks5://149.56.82.207:1080'}, 'Canada Montreal'),
    ({'http':'https://103.76.180.108:8080'}, 'Thailand')
)

ua = UserAgent()

header = None
proxy = None

def newId():
    # Change IP
    newProxy = random.choice(proxylist)
    proxy = newProxy[0]
    print 'Changed proxy to', newProxy[1]

    # Change user agent
    newUa = ua.random
    print 'Changed user agent to', newUa
    header = {'User-Agent':newUa}

google = 'https://scholar.google.com'

keywords = ['sql', 'data cube', 'protein mutation', 'plastic consequences', 'chip circuits',
            'r tree', 'tree structure in algorithms', 'vacuum tube', 'nostril operations', 
            'waxing effects', 'competitive behavior', 'ozone savers', 'data structres',
            'cathode ray', 'symbiosis', 'nocturnal bacterias', 'sleeping disorder', 'rat',
            'google patents', 'pen writing', 'handwriting', 'candle burning', 'carbon synthesis',
            'micro tubules', 'photosynthesis', 'linux distros', 'facebook obsession',
            'obesity in macdonalds', 'candlelight dinner', 'Manga effects on kids',
            'slang usage in america', 'urbanization effects', 'daylight saving']

counter = 0

newId()

while(True):

    toSearch = random.choice(keywords)
    query = google + '/scholar?q=' + toSearch + '&btnG=&hl=en&as_sdt=0%2C5&oq='

    r = requests.get(query, header, timeout=12, proxies=proxy) # proxies=proxy

    if(r.status_code != 200):
        print "[-] Error", r.status_code, r.reason
        newId()
        sleepRandom(25)
        continue

    soup = BeautifulSoup(r.text, 'html.parser')

    counter = counter + 1

    print str(counter) + '.', 
    printLinks(soup)
    print 'of "' + toSearch + '"'

    sleepRandom(10)
