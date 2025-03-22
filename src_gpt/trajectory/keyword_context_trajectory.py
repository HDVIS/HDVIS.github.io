import sys
import re

# input_captext = open('/home/zhutou/project/harvard/talk-about-embedding/all_caption_text.txt', 'r')
input_captext = open('/home/zhutou/project/harvard/talk-about-embedding/all_caption_reference.txt', 'r')


count_text = 0
paper_pattern = r"Paper \d+"

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
                if len(context) > 1:
                    reference = context[1].lower().strip()
                if "trajector" in captions:
                    count_text += 1
                    print("Text {}".format(count_text))
                    print(lines[i+1].strip())
                    if len(context) > 1:
                        print(f"Keyword: [trajectory]. Caption: {captions}]. Reference sentences:[{reference}]")
                    else:
                        print(f"Keyword: [trajectory]. Caption: {captions}]")
                    print()
                  
       