#! /usr/bin/env python

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PREFIX = '/api'

from one import one
app.register_blueprint(one, url_prefix=PREFIX)

from parsepdf import pdf
app.register_blueprint(pdf, url_prefix=PREFIX)

@app.route('/')
@app.route('/index')
def index():
    return 'Showme API 2018. See the documents for usage.'

if __name__ == '__main__':
   app.run(host='localhost', port=9999)
