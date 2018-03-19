#! /usr/bin/env python

import json
import jwt
import hashlib

from src.databaseUtil import DatabaseUtil
import src.settings as settings

from flask import Blueprint, request
authentication = Blueprint('authentication', __name__)

databaseUtil = DatabaseUtil()

### Response messages
error = '{"msg":"error"}'
success =  '{"msg":"success"}'

@authentication.route('/register', methods=['POST'])
def registration():
    data = request.get_json()
    
    email = data['email']
    password = data['password'] #############################################################
    
    queryFind = "SELECT email FROM User WHERE email=%s"
    queryCreate = "INSERT INTO TABLE User (email, password) Values (%s, %s)"
    
    rows = databaseUtil.retrieve(queryFind, (email,))

    if not rows:
        if email != 'admin':
            databaseUtil.executeCUDSQL(queryCreate, (email, password))
            return success

    return error

@authentication.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data['email']
    password = data['password'] ############################################################

    query = "SELECT email FROM User WHERE email=%s AND password=%s"
    rows = databaseUtil.retrieve(query, (email, password))

    if not rows:
        return error

    token = jwt.encode({'email': email, 'msg':'success'}, settings.JWT_SECRET, algorithm=settings.JWT_ALGO).decode("utf-8")
    print("THE jwt token:", token)
    return json.dumps(token)

def getEmail(token):
    print (token)
    decoded = jwt.decode(token, settings.JWT_SECRET, settings.JWT_ALGO)
    return decoded['email']