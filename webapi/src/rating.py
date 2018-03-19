#! /usr/bin/env python

import json

from src.databaseUtil import DatabaseUtil
import src.authentication as authentication

from flask import Blueprint, request
rating = Blueprint('rating', __name__)


@rating.route('/rating', methods=['POST'])
def rate_relation():
    data = request.get_json()

    email = authentication.getEmail(data['token'])
    edge_id = data['edge_id']
    value = data['rating']
    
    databaseUtil=DatabaseUtil()
    query = "INSERT INTO Rating (email_id, edge_id, value) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE value=%s"
    args = (email, edge_id, value, value)
    databaseUtil.executeCUDSQL(query, args)

    return json.dumps({"msg":"success"})


#######################################

class Rating:
    ratingValue=0.0
    similarity=0.0
    count=0

class RatingCalculator:
    def calculateRating(self,ratings,similarity):
        weightedSum=0.0
        sumWeights=0.0
        for rating in ratings:
            weightedSum+=rating.count*rating.ratingValue
            sumWeights+=rating.count
        weightedSum/=sumWeights
        return weightedSum+similarity

# def testRating(reader, similarity):
#     dict = {}
#     ratingList = []
#     for line in reader:
#         ratingValue = int(line['Rating'])
#         if ratingValue in dict:
#             dict[ratingValue] += 1
#         else:
#             dict[ratingValue] = 1

#     for ratingValue, count in dict.items():
#         rating = Rating()
#         rating.ratingValue = ratingValue
#         rating.count = count
#         ratingList.append(rating)
    
#     ratingCalculator = RatingCalculator()
#     print ratingCalculator.calculateRating(ratingList, similarity)
