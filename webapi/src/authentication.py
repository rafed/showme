#! /usr/bin/env python

import json
import jwt
import hashlib

from src.databaseUtil import DatabaseUtil
import src.settings as settings

from flask import Blueprint, request
authentication = Blueprint('authentication', __name__)

### Response messages
error = '{"msg":"error"}'
success =  '{"msg":"success"}'

@authentication.route('/register', methods=['POST'])
def registrationController():
    data = request.get_json()
    email = data['email']
    password = data['password']
    return register(email, password)
    
def register(email, password):
    databaseUtil = DatabaseUtil()
    password = hashlib.sha256(password.encode()).hexdigest()
    queryFind = "SELECT email FROM User WHERE email=%s"
    queryCreate = "INSERT INTO User (email, password, created) VALUES (%s, %s, NOW())"
    
    rows = databaseUtil.retrieve(queryFind, (email,))

    if not rows:
        databaseUtil.executeCUDSQL(queryCreate, (email, password))
        return success

    return error


@authentication.route('/login', methods=['POST'])
def loginController():
    data = request.get_json()
    email = data['email']
    password = data['password']
    return login(email, password)

def login(email, password):
    databaseUtil = DatabaseUtil()
    password = hashlib.sha256(password.encode()).hexdigest()
    query = "SELECT email FROM User WHERE email=%s AND password=%s"
    rows = databaseUtil.retrieve(query, (email, password))

    if not rows:
        return error

    token = jwt.encode({'email': email, 'msg':'success'}, settings.JWT_SECRET, algorithm=settings.JWT_ALGO).decode("utf-8")
    tokenJson = {'token':token, 'msg':'success'}
    return json.dumps(tokenJson)


def getEmail(token):
    decoded = jwt.decode(token, settings.JWT_SECRET, settings.JWT_ALGO)
    return decoded['email']