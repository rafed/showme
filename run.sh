#!/usr/bin/env bash

export FLASK_APP=app.py 

cd webapi
flask run --host=0.0.0.0 --port=9999