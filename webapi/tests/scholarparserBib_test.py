#!usr/bin/python

import unittest
from bs4 import BeautifulSoup
import json

from src.scholarparser import ScholarParser


class ScholarParserTest(unittest.TestCase):

    def setUp(self):
        self.html = '''<div id="gs_citt"><table><tr><th scope="row" class="gs_cith">MLA</th><td><div tabindex="0" class="gs_citr">Mei, Weimin, et al. &quot;Synthesis of porous rhombus-shaped Co 3 O 4 nanorod arrays grown directly on a nickel substrate with high electrochemical performance.&quot; <i>Journal of Materials Chemistry</i> 22.18 (2012): 9315-9321.</div></td></tr><tr><th scope="row" class="gs_cith">APA</th><td><div tabindex="0" class="gs_citr">Mei, W., Huang, J., Zhu, L., Ye, Z., Mai, Y., &amp; Tu, J. (2012). Synthesis of porous rhombus-shaped Co 3 O 4 nanorod arrays grown directly on a nickel substrate with high electrochemical performance. <i>Journal of Materials Chemistry</i>, <i>22</i>(18), 9315-9321.</div></td></tr><tr><th scope="row" class="gs_cith">Chicago</th><td><div tabindex="0" class="gs_citr">Mei, Weimin, Jun Huang, Liping Zhu, Zhizhen Ye, Yongjin Mai, and Jiangping Tu. &quot;Synthesis of porous rhombus-shaped Co 3 O 4 nanorod arrays grown directly on a nickel substrate with high electrochemical performance.&quot; <i>Journal of Materials Chemistry</i> 22, no. 18 (2012): 9315-9321.</div></td></tr><tr><th scope="row" class="gs_cith">Harvard</th><td><div tabindex="0" class="gs_citr">Mei, W., Huang, J., Zhu, L., Ye, Z., Mai, Y. and Tu, J., 2012. Synthesis of porous rhombus-shaped Co 3 O 4 nanorod arrays grown directly on a nickel substrate with high electrochemical performance. <i>Journal of Materials Chemistry</i>, <i>22</i>(18), pp.9315-9321.</div></td></tr><tr><th scope="row" class="gs_cith">Vancouver</th><td><div tabindex="0" class="gs_citr">Mei W, Huang J, Zhu L, Ye Z, Mai Y, Tu J. Synthesis of porous rhombus-shaped Co 3 O 4 nanorod arrays grown directly on a nickel substrate with high electrochemical performance. Journal of Materials Chemistry. 2012;22(18):9315-21.</div></td></tr></table></div><div id="gs_citi"><a class="gs_citi" href="https://scholar.googleusercontent.com/scholar.bib?q=info:LIMmEMvo-v0J:scholar.google.com/&amp;output=citation&amp;scisig=AAGBfm0AAAAAWrA6_CcL08YQw6XfSXIKOcMYy5xIPoAs&amp;scisf=4&amp;ct=citation&amp;cd=-1&amp;hl=en">BibTeX</a> <a class="gs_citi" href="https://scholar.googleusercontent.com/scholar.enw?q=info:LIMmEMvo-v0J:scholar.google.com/&amp;output=citation&amp;scisig=AAGBfm0AAAAAWrA6_CcL08YQw6XfSXIKOcMYy5xIPoAs&amp;scisf=3&amp;ct=citation&amp;cd=-1&amp;hl=en">EndNote</a> <a class="gs_citi" href="https://scholar.googleusercontent.com/scholar.ris?q=info:LIMmEMvo-v0J:scholar.google.com/&amp;output=citation&amp;scisig=AAGBfm0AAAAAWrA6_CcL08YQw6XfSXIKOcMYy5xIPoAs&amp;scisf=2&amp;ct=citation&amp;cd=-1&amp;hl=en">RefMan</a> <a class="gs_citi" href="https://scholar.googleusercontent.com/scholar.rfw?q=info:LIMmEMvo-v0J:scholar.google.com/&amp;output=citation&amp;scisig=AAGBfm0AAAAAWrA6_CcL08YQw6XfSXIKOcMYy5xIPoAs&amp;scisf=1&amp;ct=citation&amp;cd=-1&amp;hl=en" target=RefWorksMain>RefWorks</a> </div>'''
        self.soup = BeautifulSoup(self.html, 'html.parser')
        self.scholarParser = ScholarParser(self.html)

    def testGetBibUrl(self):
        url = '''https://scholar.googleusercontent.com/scholar.bib?q=info:LIMmEMvo-v0J:scholar.google.com/&output=citation&scisig=AAGBfm0AAAAAWrA6_CcL08YQw6XfSXIKOcMYy5xIPoAs&scisf=4&ct=citation&cd=-1&hl=en'''
        self.assertEqual(self.scholarParser.getBibUrl(), url)


    