#! /usr/bin/env python

from difflib import SequenceMatcher

class Util:
    @staticmethod
    def lastNamify(authors):
        trimmedAuthors = []
        for author in authors:
            if " " in author:
                lastname = author.split()[-1]
            else:
                lastname = author
            lastname = lastname.strip()

            if lastname:
                trimmedAuthors.append(lastname)
        return trimmedAuthors
    
    @staticmethod
    def getXmlTagText(xml, tag):
        if xml.find(tag) is not None:
            return xml.find(tag).text
        else:
            return None
    
    @staticmethod
    def getCite(xml):
        cite = {}
        authors = [i.text for i in xml.iter("author")]
        authors = Util.lastNamify(authors)

        cite['authors'] = authors
        cite['title'] = Util.getXmlTagText(xml, 'title')
        cite['journal'] = Util.getXmlTagText(xml, 'journal')
        cite['volume'] = Util.getXmlTagText(xml, 'volume')
        cite['pages'] = Util.getXmlTagText(xml, 'pages')
        cite['year'] = Util.getXmlTagText(xml, 'year')

        return cite

    @staticmethod
    def similar(a, b):
        return SequenceMatcher(None, a, b).ratio() > 0.85