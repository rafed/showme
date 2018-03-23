
import unittest
import json

from src import gsearch

class GSearchTest(unittest.TestCase):

    def testGetPaperInfo(self):
        title = "Condensed cube: An effective approach to reducing data cube size"
        authors = ["Wang", "Feng", "Lu", "Yu"]
        output = {"id": 1, "title": "Condensed cube: An effective approach to reducing data cube size", "journal": None, "volume": None, "pages": "155--165", "year": "2002", "authors": ["Wang", "Feng", "Lu", "Yu"]}
        self.assertEqual(gsearch.getPaperInfo("data_cid", title, authors), json.dumps(output))

