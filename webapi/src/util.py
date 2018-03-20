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

            trimmedAuthors.append(lastname)
        return trimmedAuthors
    
    @staticmethod
    def getFromXml(citation, tag):
        if citation.find(tag) is not None:
            return citation.find(tag).text
        else:
            return None
    
    @staticmethod
    def getCites(citation):
        cite = {}
        authors = [i.text for i in citation.iter("author")]
        authors = Util.lastNamify(authors)

        cite['authors'] = authors
        cite['title'] = Util.getFromXml(citation, 'title')
        cite['journal'] = Util.getFromXml(citation, 'journal')
        cite['volume'] = Util.getFromXml(citation, 'volume')
        cite['pages'] = Util.getFromXml(citation, 'pages')
        cite['year'] = Util.getFromXml(citation, 'year')

        return cite

    @staticmethod
    def similar(a, b):
        return SequenceMatcher(None, a, b).ratio() > 0.85