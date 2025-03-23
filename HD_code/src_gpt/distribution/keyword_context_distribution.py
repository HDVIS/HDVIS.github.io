
import sys
import re

# input_captext = open('/home/zhutou/project/harvard/talk-about-embedding/all_caption_text.txt', 'r')
input_captext = open('/home/xliu1217/projects/talk-about-embedding/data/caption_reference/all_caption_reference.txt', 'r')

unrelated_keyword = ["probe", "binomial","score", "barcode", "stimulation",
                     "yield", "clone", "z score", "copy", "droplet",
                     "event", "compartment", "poisson distribution"]
count = 0
flag = "related"
flag_2 = "now"

lines = input_captext.readlines()
for i, line in enumerate(lines):
    if line.startswith("Paper"):
        paper_index = int(line.split()[1])
        if paper_index != 1576:
            for index in range(1,30):
                if lines[i+index].startswith("Paper"):
                    flag_2 = "next"
                    break
                if lines[i+index].startswith('['):
                    context = lines[i+index].split(']"]')
                    captions = context[0].lower().strip()
                    if "distribution" in captions:
                        for ele in unrelated_keyword:
                            if ele in captions:
                                flag = "unrelated"
                                break
                        if flag == "related":
                            count += 1
                            if len(context) > 1:
                                reference = context[1].lower().strip()
                            print ("Text {}".format(count))
                            print(lines[i+1].strip())
                            if len(context) > 1:
                                print(f"Keyword: [distribution]. Caption: {captions}]. Reference sentences:[{reference}]")
                            else:
                                print(f"Keyword: [distribution]. Caption: {captions}]")
                            print()
                        else:
                            flag = "related"
            flag_2 = "now"   



