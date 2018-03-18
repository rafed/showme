#! /usr/bin/env python

import json
from src.databaseUtil import DatabaseUtil

from flask import Blueprint, request
rating = Blueprint('rating', __name__)


@rating.route('/rating', methods=['POST'])
def rate_relation():
    data = request.get_json()

    email = data['email']
    edge_id = data['edge_id']
    value = data['title']
    
    databaseUtil=DatabaseUtil()
    query = "INSERT INTO Rating (email_id, edge_id, value) VALUES (%s, %s, %s) ON DUPLIATE KEY UPDATE value=%s"
    args = (email, edge_id, value, value)
    databaseUtil.executeCUDSQL(query, args)

    return json.dumps({"msg":"success"})

    