
import unittest

from src import rating

class RatingTest(unittest.TestCase):
    
    def testEdgeRate1(self):
        self.assertEqual(rating.edgeRating(1), 1)

    def testEdgeRate1(self):
        self.assertEqual(rating.edgeRating(2), 2)

    def testEdgeRate1(self):
        self.assertEqual(rating.edgeRating(5), 5)