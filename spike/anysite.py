#! /usr/bin/env python

import requests

url = 'https://anystyle.io/parse/references.json'

header={
    'Content-Type': 'application/json;charset=UTF-8'
}

data={
    "access_token":"35fd9fd45755461c66a4238e5c1069be",
    "references": [
        "Turing, Alan, Computing Machinery and Intelligence, Mind 59, pp 433-460 (1950)"
    ]
}

r = requests.post(url=url, headers=header, data=data)

print r
# print r.headers
print r.text

        # "Rafed, Yasir, Man in the middle attacks with Ettercap, Book of stars, pp 110-112 (2012)"
