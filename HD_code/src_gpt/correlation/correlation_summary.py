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
    #correlation context
    prompt = "Below is a caption and reference sentences of a figure in a single-cell transcriptomics paper.\
             This figure shows patterns related to the [keyword] mentioned below. Please succinctly summarize this types of patterns\
             and ignore others. In your summary, replace specific domain terminologies with general terms in single-cell domain.\
             For example,'mESC', a specific cell, can be regarded as 'item', 'expression of cdk1', a specific gene can be regarded\
             'gene expression'. Typically, the caption contains more critical information than the reference. Your summary should be\
            concise and does not exceed 30 words. For example, the output summary can be 'the distribution of several gene\
            expressions across different cells' for the keyword'distribution."







    prompt = prompt + figure_text
    messages = [{"role": "user", "content": prompt}]
    # # print(messages)
    model = "gpt-3.5-turbo"
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



input_caption = open('/home/zhutou/project/harvard/talk-about-embedding/correlation_original_context.txt', 'r')

count = 0
# index = 0
lines = input_caption.readlines()

for i, line in enumerate(lines):
    if "correlation" in line:
        count += 1
        print("Text {}".format(count))
        print(lines[i-1].strip())
        print(line.strip())
        GPT_analyze(line)
        print()
        # time.sleep(5)
