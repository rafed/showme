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


    def sendRequest(self, url):
        
        if os.path.exists(self.cookieFile):
            print("[*] Cookie file exists!")
            cj = http.cookiejar.MozillaCookieJar()
            cj.load(self.cookieFile)
            
            return requests.get(url, self.header, cookies=cj)

        return requests.get(url, self.header)
            
        
        

