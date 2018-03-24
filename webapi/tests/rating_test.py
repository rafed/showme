
import unittest

from src import rating

class RatingTest(unittest.TestCase):
    
    def testEdgeRate1(self):
        self.assertEqual(rating.edgeRating(1), 1)

    def testEdgeRate2(self):
        self.assertEqual(rating.edgeRating(2), 2)

    def testEdgeRate3(self):
        self.assertEqual(rating.edgeRating(5), 5)

    def testUsersEdgeRating1(self):
        self.assertEqual(rating.usersEdgeRating("rafed@yahoo.com", 2), 2)

    def testUsersEdgeRating2(self):
        self.assertEqual(rating.usersEdgeRating("rafed@yahoo.com", 6), 0)