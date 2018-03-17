import os
import re
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage
# From PDFInterpreter import both PDFResourceManager and PDFPageInterpreter
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfdevice import PDFDevice
# Import this to raise exception whenever text extraction from PDF is not allowed
from pdfminer.pdfpage import PDFTextExtractionNotAllowed
from pdfminer.layout import LAParams, LTTextBox, LTTextLine
from pdfminer.converter import PDFPageAggregator

snippets={}

filter_list = ['[', ']', ',']
def get_citation(citation):
	text=citation.encode('utf-8')
	candidate_citation_regex_result=re.findall(r'(\[.*?\])',text)
	candidate_citations=[]
	valid_citations={}
	searched_citations=[]
	for (group) in candidate_citation_regex_result:
		#print group
		candidate_citations.append(group)
	for candidate_citation in candidate_citations:
		transformed_candidate_citation=candidate_citation
		for item in filter_list:
			transformed_candidate_citation=transformed_candidate_citation.replace(item,"")
		transformed_candidate_citation=re.sub(r"\s+", "", transformed_candidate_citation, flags=re.UNICODE)
		valid_citations[candidate_citation]=transformed_candidate_citation
	regex_extract_searched = re.compile("^\s+|\s*,\s*|\s+$")
	for key,value in valid_citations.iteritems():
		numeric_key=key.replace('[',"")
		numeric_key=numeric_key.replace(']',"")
		for cite in regex_extract_searched.split(numeric_key):
			if str(cite) not in snippets.keys():
				snippets[str(cite)]=[]
			snippets[str(cite)].append(text)

my_file = os.path.join("ai.pdf")
log_file = os.path.join("out.txt")

password = ""
extracted_text = ""

# Open and read the pdf file in binary mode
fp = open(my_file, "rb")

# Create parser object to parse the pdf content
parser = PDFParser(fp)

# Store the parsed content in PDFDocument object
document = PDFDocument(parser, password)

# Check if document is extractable, if not abort
if not document.is_extractable:
	raise PDFTextExtractionNotAllowed
	
# Create PDFResourceManager object that stores shared resources such as fonts or images
rsrcmgr = PDFResourceManager()

# set parameters for analysis
laparams = LAParams()

# Create a PDFDevice object which translates interpreted information into desired format
# Device needs to be connected to resource manager to store shared resources
# device = PDFDevice(rsrcmgr)
# Extract the decive to page aggregator to get LT object elements
device = PDFPageAggregator(rsrcmgr, laparams=laparams)

# Create interpreter object to process page content from PDFDocument
# Interpreter needs to be connected to resource manager for shared resources and device 
interpreter = PDFPageInterpreter(rsrcmgr, device)

a=[]
stop=False
# Ok now that we have everything to process a pdf document, lets process it page by page
for page in PDFPage.create_pages(document):
	# As the interpreter processes the page stored in PDFDocument object
	interpreter.process_page(page)
	# The device renders the layout from interpreter
	layout = device.get_result()
	# Out of the many LT objects within layout, we are interested in LTTextBox and LTTextLine
	for lt_obj in layout:
		if isinstance(lt_obj, LTTextBox) or isinstance(lt_obj, LTTextLine):
			extracted_text += lt_obj.get_text()	
			#pages.append(lt_obj.get_text())
			if "References" in lt_obj.get_text():
				stop=True	
			if isinstance(lt_obj, LTTextBox) and stop==False:
				a.append(lt_obj.get_text())
	
for para in a:
	get_citation(para)

references=[]
extracted_text=extracted_text[extracted_text.find("References")+10:]	
text=extracted_text.strip()
text = text.split('[')
bibs = []
for tex in text:
	tex_split = tex.split(']')
	if len(tex_split)<2:
		continue
	ref = tex_split[1]
	references.append(str(tex_split[0]))

finalSnippets={}
for i in references:
	if i in snippets.keys():
		finalSnippets[i]=snippets[i]

print finalSnippets

fp.close()

