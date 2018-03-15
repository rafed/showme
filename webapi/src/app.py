#! /usr/bin/env python

from flask import Flask
from flask_cors import CORS

from gsearch import gsearch
from parsepdf import pdf


app = Flask(__name__)
CORS(app)

PREFIX = '/api'

app.register_blueprint(gsearch, url_prefix=PREFIX)
app.register_blueprint(pdf, url_prefix=PREFIX)

@app.route('/')
@app.route('/index')
def index():
    return 'Showme API 2018. See the documents for usage.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)
