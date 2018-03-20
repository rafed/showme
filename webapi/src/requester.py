#! /usr/bin/env python

import requests
import http.cookiejar
import os.path

class Requester:
    header = {
        'Host':'scholar.google.com',
        'User-Agent':"Mozilla/5.0 (X11; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0",
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language':'en-US,en;q=0.5',
        'Accept-Encoding':'gzip, deflate',
        'Connection':'keep-alive',
        'Upgrade-Insecure-Requests':1
    }
    cookieFile = "files/cookies.txt"
    google = 'https://scholar.google.com'


    @staticmethod
    def sendRequest(url):
        if os.path.exists(Requester.cookieFile):
            print("[*] Cookie file exists!")
            cj = http.cookiejar.MozillaCookieJar()
            cj.load(Requester.cookieFile)
        else:
            cj = None
        
        return requests.get(url, Requester.header, cookies=cj)

    @staticmethod 
    def scholarQuerier(query, phrase='', words_some='', words_none='', scope='any', authors='', published_in='', year_low='', year_hi='') :
        url = Requester.google + '/scholar?' \
        + 'as_q=' + query \
        + '&as_epq=' + phrase \
        + '&as_oq=' + words_some \
        + '&as_eq=' + words_none \
        + '&as_occt=' + scope \
        + '&as_sauthors=' + authors \
        + '&as_publication=' + published_in \
        + '&as_ylo=' + year_low \
        + '&as_yhi=' + year_hi \
        + '&as_vis=' \
        + '&btnG=&hl=en' \
        + '&as_sdt=0%2C5' 

        r = Requester.sendRequest(url)
        if(r.status_code != 200):
            print (r.status_code, "Error!!!")
            return "Error in searching google scholar", r.status_code

        return r
        
