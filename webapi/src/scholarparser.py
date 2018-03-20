#! /usr/bin/env python

from bs4 import BeautifulSoup
import json
import re

from src.util import Util

class ScholarParser:
    def __init__(self, html):
        self.soup = BeautifulSoup(html, "html.parser")

    def _getTitle(self, soup):
        for string in soup.findAll('h3', {'class':'gs_rt'}):
            for a in string.findAll('a', href=True):
                title = a.text
                if title.endswith('...'):
                    title = title[:-3]
                return title
        return None

    def _getDescription(self, soup):
        for desc in soup.findAll(True, {'class':'gs_rs'}):
            return desc.text
        return None

    def _getYear(self, soup):
        for string in soup.findAll(True, {'class':'gs_a'}):
            year = re.compile('[12][0-9]{3}')
            matchresult = year.search(string.text)
            if matchresult:
                return matchresult.group(0)
        return None

    def _getAuthors(self, soup):
        for stuff in soup.findAll(True, {'class':'gs_a'}):
            if "-" in stuff.text:
                string = stuff.text.split("-", 1)[0]
            else:
                string = stuff.text

            string = string.strip().replace('…', '')

            if "," in string:
                authors = [x.strip() for x in string.split(",")]
                authors = Util.lastNamify(authors)
                
                return authors
            else:
                if " " in string:
                    return string.split()[-1].strip()
                else:
                    return string

        return None
        
    def _getSiteLink(self, soup):
        for string in soup.findAll('h3', {'class':'gs_rt'}):
            for a in string.findAll('a', href=True):
                return a['href']
        return None

    def _getPdfLink(self, soup):
        for pdf in soup.findAll(True, {'class':'gs_or_ggsm'}):
            for a in pdf.findAll('a', href=True):
                return a['href']
        return None

    def parse(self):
        result = []

        for div in self.soup.findAll('div', {'class':['gs_r', 'gs_or', 'gs_scl']}):
            if div.has_attr('data-cid'):
                paper = {}

                paper['pdflink'] = self._getPdfLink(div)
                if paper['pdflink'] is None:
                    continue

                paper['data_cid'] = div['data-cid']
                paper['title'] = self._getTitle(div)
                paper['description'] = self._getDescription(div)
                paper['sitelink'] = self._getSiteLink(div)
                paper['year'] = self._getYear(div)
                paper['authors'] = self._getAuthors(div)
                result.append(paper)

        return json.dumps(result)

    def getBibUrl(self):
        for a in self.soup.findAll('a', {'class':'gs_citi'}):
            if 'BibTeX' in a.text:
                biburl = a['href']
                return biburl
        
        return None
    