import sys
import re
import openai
import time
import os
import wandb
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the environment variables from .env
openai.api_key = os.getenv('OPENAI_API_KEY')


def GPT_analyze(figure_text):
    
    prompt = "Below is a summary of the [clustering] relationship found in a figure from a single-cell transcriptomics paper.\
              Please indicate with a 'Yes' or 'No' whether they pertain to any of the five specified categories: 1. Clustering\
            of Items: Does the summary describe the formation or identification of  items (such as cells) based on similarity?\
            2. Clustering of Dimensions: Does the summary describe the formation or identification of dimensions (such as gene\
            expression levels or transcription factors)? 3. Existence of Clusters: Is there a clear indication in the summary that\
            clusters exist within the data? 4. Name of Clusters: Does the summary include information about the naming or\
            labeling of clusters? 5. Relationships Among Clusters: Does the summary provide insights into the connections,\
            interactions, or associations between different clusters, indicating a global structure or hierarchical relationships?\
            The expected output format is: Question [index]: [question content]\
          followed by 'yes' or 'no'. If all responses are ’no’, propose a new category that better describes this pattern."

            
    
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


with open('/home/zhutou/project/harvard/talk-about-embedding/clustering_summary.txt', 'r') as f:
    lines = f.readlines()

# Iterate over the lines to find "Text x"
for i, line in enumerate(lines):
    if line.startswith("Text"):
        print(line.strip())  # Print the "Text x" line
        print(lines[i+1].strip())
        print(lines[i+2].strip())
        GPT_analyze(lines[i+3].strip())
        print("-------------------")
        print()