
import unittest
import xml.etree.ElementTree as ET

from src.util import Util

class UtilTest(unittest.TestCase):
    
    def testAuthor1(self):
        authorsIn = ["Rafed Muhammad Yasir", "Moumita Asad", "Aquib Azmain", "Eusha Kadir", "Kishan Kumar Ganguly"]
        authorsOut = ["Yasir", "Asad", "Azmain", "Kadir", "Ganguly"]
        self.assertEqual(Util.lastNamify(authorsIn), authorsOut)

    def testAuthor2(self):
        authorsIn = ["J Schäfer", "R Schoppe", "J Hölzl", "R Feder"]
        authorsOut = ["Schäfer", "Schoppe", "Hölzl", "Feder"]
        self.assertEqual(Util.lastNamify(authorsIn), authorsOut)

    def testAuthor3(self):
        authorsIn = ["", "-P Ng", "KP Chiu", "L Lim", "T Zhang", "KP Chan"]
        authorsOut = ["Ng", "Chiu", "Lim", "Zhang", "Chan"]
        self.assertEqual(Util.lastNamify(authorsIn), authorsOut)

    def testSimilar1(self):
        a = "Condensed cube"
        b = "Data cube"
        self.assertEqual(Util.similar(a, b), False)

    def testSimilar2(self):
        a = "Cube data"
        b = "Data cube"
        self.assertEqual(Util.similar(a, b), False)

    def testGetCites(self):
        xml = '''<citations><citation valid='true'><authors><author>I S Udvarhelyi</author><author>C A Gatsonis</author><author>A M Epstein</author><author>C L Pashos</author><author>J P Newhouse</author><author>B J McNeil</author></authors><title>Acute Myocardial Infarction in the Medicare population: process of care and clinical outcomes</title><journal>Journal of the American Medical Association</journal><volume>18</volume><pages>2530--2536</pages><year>1992</year><raw_string>Udvarhelyi, I.S., Gatsonis, C.A., Epstein, A.M., Pashos, C.L., Newhouse, J.P. and McNeil, B.J. Acute Myocardial Infarction in the Medicare population: process of care and clinical outcomes. Journal of the American Medical Association, 1992; 18:2530-2536.</raw_string></citation><ctx:context-objects xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:schemaLocation='info:ofi/fmt:xml:xsd:ctx http://www.openurl.info/registry/docs/info:ofi/fmt:xml:xsd:ctx' xmlns:ctx='info:ofi/fmt:xml:xsd:ctx'><ctx:context-object timestamp='2018-03-21T17:40:19-04:00' encoding='info:ofi/enc:UTF-8' version='Z39.88-2004' identifier=''><ctx:referent><ctx:metadata-by-val><ctx:format>info:ofi/fmt:xml:xsd:journal</ctx:format><ctx:metadata><journal xmlns:rft='info:ofi/fmt:xml:xsd:journal' xsi:schemaLocation='info:ofi/fmt:xml:xsd:journal http://www.openurl.info/registry/docs/info:ofi/fmt:xml:xsd:journal'><rft:atitle>Acute Myocardial Infarction in the Medicare population: process of care and clinical outcomes</rft:atitle><rft:spage>2530</rft:spage><rft:date>1992</rft:date><rft:stitle>Journal of the American Medical Association</rft:stitle><rft:genre>article</rft:genre><rft:volume>18</rft:volume><rft:epage>2536</rft:epage><rft:au>I S Udvarhelyi</rft:au><rft:au>C A Gatsonis</rft:au><rft:au>A M Epstein</rft:au><rft:au>C L Pashos</rft:au><rft:au>J P Newhouse</rft:au><rft:au>B J McNeil</rft:au></journal></ctx:metadata></ctx:metadata-by-val></ctx:referent></ctx:context-object></ctx:context-objects></citations>'''
        output = {'authors':[
                    "Udvarhelyi",
                    "Gatsonis",
                    "Epstein",
                    "Pashos",
                    "Newhouse",
                    "McNeil"
                ],
                "title":"Acute Myocardial Infarction in the Medicare population: process of care and clinical outcomes",
                "journal":"Journal of the American Medical Association",
                "volume":"18",
                "pages":"2530--2536",
                "year":"1992"
            }

        etree = ET.fromstring(xml)
        for i in etree.findall("citation"):
            self.assertEqual(Util.getCite(i), output)
        
