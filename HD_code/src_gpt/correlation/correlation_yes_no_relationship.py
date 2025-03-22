import sys
import re
import openai
import time
import os
import wandb
from dotenv import load_dotenv
import os

env_path = '/home/zhutou/project/harvard/talk-about-embedding/key.env'
load_dotenv(dotenv_path=env_path)
openai.api_key = os.getenv('OPENAI_API_KEY')



def GPT_analyze(figure_text):
    
    #prompt for correlation relationship
    prompt = "In single-cell research,  'dimensions' refer to various attributes or features being studied, such as molecular markers, gene expression levels, transcription factors\
          or other cellular properties. These dimensions can vary widely across different studies. 'Items' refer to the single cells and cell types.\
            There are 3 labels to consider for classifying the given context:\
            1. 'correlation between items'\
            2. 'correlation between dimensions'\
            3. 'correlation between items and dimensions'\
            You should only consider the entities in the context rightly after ' correlation between' or 'correlation in ' and ignore descriptive entities afterwards\
            Example 1: Given the context: 'Correlation patterns between single cells in different cell types and cell-cycle phases were analyzed using PCA and over-representation analyses.'\
                Step 1: Identify correlation of items. In this context, itmes are 'single cells in different cell types'.\
                Step 2: Identify correlation of dimensions. There are no dimensions.\
                Step 3: Determine the label. Since the context discusses the correlation between items (single cells in different cell types),\
                it satisfies the label 'correlations between items'.\
                Final output:\
                1. 'correlation between items'\
                yes\
                2. 'correlation between dimensions'\
                no\
                3. 'correlation between items and dimensions'\
                no\
            Example 2: Given the context: 'Correlation patterns of gene expression levels between ES and MEF cells using Cel-seq method.'\
                Step 1: Identify correlation of items. There are no items in this example.\
                Step 2: Identify correlation of dimensions. The dimensions are gene expression levels between ES and MEF cells.\
                Step 3:  Determine the label. Since the context discusses the correlation between dimensions (gene expression levels),\
                it satisfies the label 'correlation between dimensions'\
                 Final output:\
                1. 'correlation between items'\
                no\
                2. 'correlation between dimensions'\
                yes\
                3. 'correlation between items and dimensions'\
                no\
                    Followed the analysis workflow above, determine the label for the context  below. The output should be exactly the same as the example above \
                (beginning at Step 1 till the final output part. For the final output, 'yes' or 'no' should be in the new line below the question)."
    prompt = prompt + figure_text
    messages = [{"role": "user", "content": prompt}]
    # # print(messages)
    model = "gpt-3.5-turbo"
    # model = "gpt-4"
    try:
        response = openai.ChatCompletion.create(
            model= model,
            messages=messages,
            temperature=0, # this is the degree of randomness of the model's output
        )
        print(response.choices[0].message["content"])
    except openai.error.InvalidRequestError as e:
        print("An exception occured : {}".format(str(e)))
        return False
    except openai.error.ServiceUnavailableError:
        print("The server is overloaded")
        time.sleep(10)
        GPT_analyze(figure_text)
    except openai.error.APIError:
        time.sleep(10)
        print("openai.error.APIError")
        GPT_analyze(figure_text)
    except Exception as e:
        print("An exception occured : {}".format(str(e)))
        time.sleep(10)
        GPT_analyze(figure_text)


# with open('/home/zhutou/project/harvard/talk-about-embedding/correlation_no_dot_relationship.txt', 'r') as f:
#     lines = f.readlines()



with open('/home/zhutou/project/harvard/talk-about-embedding/correlation_summary.txt', 'r') as f:
    lines = f.readlines()


# Iterate over the lines to find "Text x"
for i, line in enumerate(lines):
    if line.startswith("Text"):
        print(line.strip())  # Print the "Text x" line
        print(lines[i+1].strip())
        print(lines[i+2].strip())
        print(lines[i+3].strip())
        GPT_analyze(lines[i+3].strip())
        print("-------------------")
        print()