import pandas as pd
import sys
import os
import re

paper_list = pd.read_csv('/home/zhutou/project/harvard/talk-about-embedding/data/paper_list.csv')
f = open('/home/zhutou/project/harvard/talk-about-embedding/all_original_captions.txt', 'w')
orig_stdout = sys.stdout
sys.stdout = f

for idx, row in paper_list.iterrows():
    if idx == 1 or idx == 2 or idx == 318 or idx ==775:
        continue
    if row['Downloaded']:
    
        print(row["DOI"])
        print("Paper {}".format(idx))
        pdf_folder = f'/home/zhutou/project/harvard/talk-about-embedding/data/papers/{row["DOI"].replace("/", "-").replace(")", "").replace("(", "")}/'
        # print (pdf_folder)
        PDFOUT = f'{pdf_folder}PDFOUT'
        # print(PDFOUT)
        fig_cap_folder = f'{PDFOUT}/{row["DOI"].replace("/","-").replace(")", "").replace("(", "")}'
        # print(fig_cap_folder)
        for caption in os.listdir(fig_cap_folder):
            if caption.endswith('.txt'):
                #  print(caption)
                #  print(fig_cap_folder+'/'+ caption)
                figure_text = fig_cap_folder+'/'+ caption
                with open(figure_text) as f:
                    lines = f.readlines()
                lines = [s.replace('ﬁ', 'fi') for s in lines]
                # lines = [s.replace(r'\b[Ff]ig\.|\b[Ff]igure\.', 'fig') for s in lines]
                print(lines)
                print("--------------------")
        print()
                #  if GPT_analyze(ele, idx) == False:
                #     invalid_tokens_paper.append(idx)
                # print(invalid_tokens_paper)
# print(invalid_tokens_paper)        
sys.stdout = orig_stdout
f.close()