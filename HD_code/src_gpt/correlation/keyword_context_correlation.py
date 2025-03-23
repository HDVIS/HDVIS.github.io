import sys
import re
import nltk

# input_captext = open('/home/zhutou/project/harvard/talk-about-embedding/all_caption_text.txt', 'r')
input_captext = open('/home/zhutou/project/harvard/talk-about-embedding/all_caption_reference.txt', 'r')

unrelated_keyword = ["probe", "binomial","treatment", "barcode", "stimulation",
                     "yield", "clone", "z score", "copy", "droplet",
                     "event", "compartment", "technical", "fresh", "preserve","and tuft cells"
                     "in ventricular cardiomyocytes", "frequenc", "machine learning"
                       "scenic analysis identified", "immune cells in the lung during  in iavfection",
                       "apoe, clu", "phenotypically modulated smooth", "with yap1-dependent",
                       "including osteoblasts", "patterns between visceral and definitive endoderm cells",
                       "correction with aligned canonical","receptors involved in cellular proliferation",
                       "distinct immunosurveillance", "clearance-associated", " cxcl14 with Nos1",
                       "leukaemic myelopoiesis"]

count_text = 0
paper_pattern = r"Paper \d+"
flag = "related"

lines = input_captext.readlines()
for i, line in enumerate(lines):
    if re.match(paper_pattern, line):
        paper_index = int(line.split()[1])
        for index in range(1,50):
            if lines[i+index].startswith("Paper"):
                break
            if lines[i+index].startswith('['):
                context = lines[i+index].split(']"]')
                captions = context[0].lower().strip()
                if "correlat" in captions:
                        for ele in unrelated_keyword:
                            if ele in captions:
                                flag = "unrelated"
                                break
                        if flag == "related":
                            count_text += 1
                            if len(context) > 1:
                                reference = context[1].lower().strip()
                            print ("Text {}".format(count_text))
                            print(lines[i+1].strip())
                            if len(context) > 1:
                                print(f"Keyword: [correlation]. Caption: {captions}]. Reference sentences:[{reference}]")
                            else:
                                print(f"Keyword: [correlation]. Caption: {captions}]")
                            print()
                        else:
                            flag = "related"
    
