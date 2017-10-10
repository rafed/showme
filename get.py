#! /usr/bin/env python

import os
import scholar

arg = '--json'

author = 'Pierre Curie'
all = ''
some = ''
none = ''

if author:
    arg += ' -a ' + author
if all:
    arg += ' -A ' + all


os.system("python scholar.py " + arg)

