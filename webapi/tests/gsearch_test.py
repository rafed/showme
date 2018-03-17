#!usr/bin/python

import unittest
from bs4 import BeautifulSoup

from src import gsearch

html = '''<div class="gs_r gs_or gs_scl" data-cid="XEec5xrhXmEJ" data-did="XEec5xrhXmEJ" data-lid="" data-rp="11"><div class="gs_ggs gs_fl"><div class="gs_ggsd"><div class="gs_or_ggsm" ontouchstart="gs_evt_dsp(event)" tabindex="-1"><a href="https://www.researchgate.net/profile/Zhuo_Wang/publication/4347298_Minimal_Condensed_Cube_Data_Organization_Fast_Computation_and_Incremental_Update/links/564da42608ae4988a7a45fae.pdf" data-clk="hl=en&amp;sa=T&amp;oi=gga&amp;ct=gga&amp;cd=11&amp;ei=U3KnWvubL8SzjgSf6KnIDA"><span class="gs_ctg2">[PDF]</span> researchgate.net</a></div></div></div><div class="gs_ri"><h3 class="gs_rt" ontouchstart="gs_evt_dsp(event)"><a href="http://ieeexplore.ieee.org/abstract/document/4548235/" data-clk="hl=en&amp;sa=T&amp;ct=res&amp;cd=11&amp;ei=U3KnWvubL8SzjgSf6KnIDA">Minimal <b>Condensed Cube</b>: data organization, fast computation, and incremental update</a></h3><div class="gs_a">Z Wang, Y Xu&nbsp;- Internet Computing in Science and Engineering&nbsp;_, 2008 - ieeexplore.ieee.org</div><div class="gs_rs">The <b>condensed cube </b>has been proposed to reduce the huge size of data cubes in OLAP <br>system. The intuition of <b>condensed cube </b>is to compress semantically redundant tuples into <br>their representative Base Single Tuples (BSTs). However, previous studies showed that a </div><div class="gs_fl"><a href="javascript:void(0)" class="gs_or_sav" title="Save" role="button"><svg viewBox="0 0 17 16" class="gs_or_svg"><path d="M8 11.57l3.824 2.308-1.015-4.35 3.379-2.926-4.45-.378L8 2.122 6.261 6.224l-4.449.378 3.379 2.926-1.015 4.35z"></path></svg></a> <a href="javascript:void(0)" class="gs_or_cit gs_nph" title="Cite" role="button" aria-controls="gs_cit" aria-haspopup="true"><svg viewBox="0 0 17 16" class="gs_or_svg"><path d="M1.5 3.5v5h2v.375L1.75 12.5h3L6.5 8.875V3.5zM9.5 3.5v5h2v.375L9.75 12.5h3L14.5 8.875V3.5z"></path></svg></a> <a href="/scholar?cites=7016292775160989532&amp;as_sdt=2005&amp;sciodt=0,5&amp;hl=en">Cited by 5</a> <a href="/scholar?q=related:XEec5xrhXmEJ:scholar.google.com/&amp;hl=en&amp;as_sdt=0,5">Related articles</a> <a href="/scholar?cluster=7016292775160989532&amp;hl=en&amp;as_sdt=0,5" class="gs_nph">All 6 versions</a> <a href="https://scholar.googleusercontent.com/scholar.bib?q=info:XEec5xrhXmEJ:scholar.google.com/&amp;output=citation&amp;scisig=AAGBfm0AAAAAWqd0q1JCdhqSSAeBL9sgHaFyUochr5lV&amp;scisf=4&amp;ct=citation&amp;cd=11&amp;hl=en" class="gs_nta gs_nph">Import into BibTeX</a> <a href="javascript:void(0)" title="More" class="gs_or_mor gs_ota gs_oph" role="button"><svg viewBox="0 0 17 16" class="gs_or_svg"><path d="M1.5 5.5l2-2L8 8l-4.5 4.5-2-2L4 8zM8.5 5.5l2-2L15 8l-4.5 4.5-2-2L11 8z"></path></svg></a> <a href="javascript:void(0)" title="Fewer" class="gs_or_nvi gs_or_mor" role="button"><svg viewBox="0 0 17 16" class="gs_or_svg"><path d="M8.5 5.5l-2-2L2 8l4.5 4.5 2-2L6 8zM15.5 5.5l-2-2L9 8l4.5 4.5 2-2L13 8z"></path></svg></a></div></div></div>'''
soup = BeautifulSoup(html, 'html.parser')

class GsearchTest(unittest.TestCase):

    def testGetTitle(self):
        title = '''Minimal Condensed Cube: data organization, fast computation, and incremental update'''
        self.assertEqual(gsearch.getTitle(soup), title)

    def testGetDescription(self):
        description = '''The condensed cube has been proposed to reduce the huge size of data cubes in OLAP system. The intuition of condensed cube is to compress semantically redundant tuples into their representative Base Single Tuples (BSTs). However, previous studies showed that a '''
        self.assertEqual(gsearch.getDescription(soup), description)

    def testGetYear(self):
        year = "2008"
        self.assertEqual(gsearch.getYear(soup), year)

    def testAuthors(self):
        authors = ["Wang", "Xu"]
        self.assertEqual(gsearch.getAuthors(soup), authors)
    
    def testGetSiteLink(self):
        sitelink = "http://ieeexplore.ieee.org/abstract/document/4548235/"
        self.assertEqual(gsearch.getSiteLink(soup), sitelink)

    def testGetPdfLink(self):
        pdflink = "https://www.researchgate.net/profile/Zhuo_Wang/publication/4347298_Minimal_Condensed_Cube_Data_Organization_Fast_Computation_and_Incremental_Update/links/564da42608ae4988a7a45fae.pdf"
        self.assertEqual(gsearch.getPdfLink(soup), pdflink)

    def testExtractFromSearchResult(self):
        output = '''[{"data_cid": "XEec5xrhXmEJ", "title": "Minimal Condensed Cube: data organization, fast computation, and incremental update", "description": "The condensed cube has been proposed to reduce the huge size of data cubes in OLAP system. The intuition of condensed cube is to compress semantically redundant tuples into their representative Base Single Tuples (BSTs). However, previous studies showed that a ", "sitelink": "http://ieeexplore.ieee.org/abstract/document/4548235/", "year": "2008", "authors": ["Wang", "Xu"], "pdflink": "https://www.researchgate.net/profile/Zhuo_Wang/publication/4347298_Minimal_Condensed_Cube_Data_Organization_Fast_Computation_and_Incremental_Update/links/564da42608ae4988a7a45fae.pdf"}]'''
        self.assertEqual(gsearch.extractFromSearchResult(html), output)
