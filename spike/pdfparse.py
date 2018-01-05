#!usr/bin/python

# mew's code
my_file = "./temp.pdf"

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

extracted_text=extracted_text[extracted_text.find("References")+10:]	
text=extracted_text.strip()
text = text.split('[')

bibs = []
for tex in text:
    tex_split = tex.split(']')
    if len(tex_split)<2:
        continue
    ref = tex_split[1]
    
    index = tex_split[0]
    bibs.append(ref.replace('\n', ' '))

#close the pdf file
fp.close()