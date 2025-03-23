import spacy
import csv
from collections import Counter, defaultdict
from tqdm import tqdm  # Import tqdm for the progress bar

# Load the SpaCy model
nlp = spacy.load("en_core_web_sm")

# Define your stop words and noise words
stop_words = spacy.lang.en.stop_words.STOP_WORDS
noise_words = {'figure', 'caption', 'paper', 'shows', 'also'}
stop_words.update(noise_words)

# Initialize the counter and a dictionary to keep track of words for each lemma
counter = Counter()
lemma_to_words = defaultdict(set)

# Read file and process each line with a progress bar
with open('all_caption_reference.txt', 'r') as f:
    lines = f.readlines()  # Read all lines at once

# Process each line with a progress bar
for line in tqdm(lines, desc="Processing"):
    if line.startswith("["):
        context = line.split(']"]')
        captions = context[0].lower().strip()
        # Process the line with SpaCy
        doc = nlp(captions.lower())
        
        # Filter out stop words, punctuation, and non-alphabetic tokens; then lemmatize
        lemmatized_tokens = [token.lemma_ for token in doc if token.is_alpha and token.text not in stop_words and len(token.text) >= 3]
        
        # Store original words that map to the same lemma
        for token in doc:
            if token.is_alpha and token.text not in stop_words:
                lemma_to_words[token.lemma_].add(token.text)
        
        # Count each lemma only once per line
        unique_lemmas = set(lemmatized_tokens)
        
        # Update the counter
        counter.update(unique_lemmas)

# Get the 1000 most common lemmas
most_common_lemmas = counter.most_common(1000)

# Write the output to a CSV file
with open('caption-gram_1.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['Spacy', 'Words', 'Frequency'])  # header row
    for lemma, freq in most_common_lemmas:
        csvwriter.writerow([lemma, ", ".join(lemma_to_words[lemma]), freq])

# Optionally, print the result in descending order by frequency
for lemma, freq in most_common_lemmas:
    print(f"{lemma}: {freq}")
