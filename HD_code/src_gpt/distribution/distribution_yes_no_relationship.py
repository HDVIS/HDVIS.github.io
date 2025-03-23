import sys
import re
import openai
import time
import os
# import wandb
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the environment variables from .env
openai.api_key = os.getenv('OPENAI_API_KEY')


def GPT_analyze(figure_text):
    
    #prompt for distribution relationship
    # prompt = "Below is a summary of the [distribution] relationship found in a figure from a single-cell transcriptomics paper.\
    #           Please indicate with a 'Yes' or 'No' whether they pertain to any of the three specified categories:\
    #           1. Distribution of dimension(s) on different items: Does the summary describe how dimensions (marker,\
    #           receptor, gene expression and etc) vary in or across the item (cell)? 2. Distribution of items in a 2D space: Does the summary mention the\
    #         items (such as cells) in 2D space? 3. Spatial distribution of item clusters or dimensions?: Does the summary explain how\
    #         item clusters (such as cells) or dimensions ( marker, receptor, genexpression and etc) spatially distribute in a certain region? The expected output\
    #         format is: Question [index]: [question content] followed by 'yes' or 'no' (yes or no in the new line below the question).\
    #         If all responses are 'no', propose a new category that better describes this pattern."

    prompt = "In single-cell research, 'dimensions' refer to various attributes or features being studied, such as molecular markers, glutamate receptors,\
          or other cellular properties. These dimensions can vary widely across different studies. 'Items' usually refer to the entities like different cell types.\
            There are 3 labels to consider for classifying the given context:\
                1. 'Distribution of dimension(s) on different items'\
                2. 'Distribution of items in a 2D space'\
                3. 'Spatial distribution of item clusters or dimensions'\
            Example 1: Given the context: 'Distribution patterns of molecular markers and glutamate receptors vary among different single-cell types in the neocortex.'\
                Step 1: Identify items. In this context, the 'items' are single-cell types.\
                Step 2: Identify dimensions. The 'dimensions' mentioned are molecular markers and glutamate receptors.\
                Step 3: Identify spatial location. In this context, it did not mention spatial distribution.\
                Step 4: Determine the label separately. Since the context discusses the distribution of dimensions\
            (molecular markers and glutamate receptors) across different items (single-cell types),\
                the appropriate label is 'Distribution of dimension(s) on different items.'\
                Final output:\
                1. 'Distribution of dimension(s) on different items':\
                yes\
                2. 'Distribution of items in a 2D space':\
                no\
                3. 'Spatial distribution of item clusters or dimensions'\
                no\
            Example 2: Given the context: 'Distribution patterns of different cell types within single-cell RNA-seq data from FACS-sorted DC populations are shown in the figure.'\
                Step 1: Identify items. In this context, the 'items' are different cell types.\
                Step 2: Identify dimensions. There are no dimensions in the context.\
                Step 3: Identify spatial location. In this context, it did not mention spatial distribution.\
                Step 4: Determine the label separately. Since the context discusses the distribution of items\
            (different cell types) from DC populations,\
                the appropriate label is 'Distribution of items in a 2D space.'\
                Final output:\
                1. 'Distribution of dimension(s) on different items':\
                no\
                2. 'Distribution of items in a 2D space':\
                yes\
                3. 'Spatial distribution of item clusters or dimensions'\
                no\
                Followed the analysis workflow above, determine the label for the context  below. The output should be exactly the same as the example above \
                (beginning at Step 1, for the final output, 'yes' or 'no' should be in the new line below the question)."

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


# with open('/home/zhutou/project/harvard/talk-about-embedding/distribution_no_dot_relationship.txt', 'r') as f:
#     lines = f.readlines()



with open('/home/zhutou/project/harvard/talk-about-embedding/distribution_summary.txt', 'r') as f:
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