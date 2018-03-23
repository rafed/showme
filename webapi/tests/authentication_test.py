
import unittest
import json

from src import authentication

class AuthenticationTest(unittest.TestCase):

    
    
    def testRegistration(self):
        email = "rafed123@showme.tk"
        password = "showme"
        self.assertEqual(authentication.register(email, password), authentication.success)

    def testRegistration2(self):
        self.assertEqual(authentication.register("rafed@yahoo.com", "asad"), authentication.error)

    def testLogin(self):
        tokenJson = json.loads(authentication.login("rafed@yahoo.com", "asad"))
        self.assertEqual(authentication.getEmail(tokenJson['token']), "rafed@yahoo.com")
