
import json

from src.databaseUtil import DatabaseUtil
import src.authentication as authentication

from flask import Blueprint, request
rating = Blueprint('rating', __name__)


@rating.route('/rating', methods=['POST'])
def rateRelation():
    data = request.get_json()

    email = authentication.getEmail(data['token'])
    edge_id = data['edge_id']
    value = data['rating']
    
    databaseUtil=DatabaseUtil()
    query = "INSERT INTO Rating (email_id, edge_id, value) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE value=%s"
    args = (email, edge_id, value, value)
    databaseUtil.executeCUDSQL(query, args)

    return json.dumps({"msg":"success"})


def edgeRating(edge_id):
    databaseUtil=DatabaseUtil()
    query = "SELECT IFNULL(AVG(VALUE), 0) AS avg_rating FROM Rating WHERE edge_id=%s"
    rows = databaseUtil.retrieve(query, (edge_id,))
    return round(rows[0]['avg_rating'])

def usersEdgeRating(email, edge_id):
    databaseUtil=DatabaseUtil()
    query = "SELECT value FROM Rating WHERE email_id=%s AND edge_id=%s"
    rows = databaseUtil.retrieve(query, (email, edge_id))

    if rows:
        return rows[0]['value']
    else:
        return 0;
    