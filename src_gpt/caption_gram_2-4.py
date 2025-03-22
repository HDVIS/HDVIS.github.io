import nltk
import csv
from nltk.corpus import stopwords
from nltk.util import ngrams
from nltk.stem import WordNetLemmatizer
from collections import Counter
from tqdm import tqdm

# Initialize WordNetLemmatizer and stopwords
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

# Add noise words
noise_words = {'figure', 'caption', 'paper', 'shows', 'also'}
stop_words.update(noise_words)

# Initialize the counter
# Initialize separate counters for 2-gram, 3-gram, and 4-gram
counter_2gram = Counter()
counter_3gram = Counter()
counter_4gram = Counter()

# Read file and process each line with a progress bar
with open('all_caption_reference.txt', 'r') as f:
    lines = f.readlines()  # Read all lines at once


# Process each line with a progress bar
for line in tqdm(lines, desc="Processing"):
    if line.startswith("["):
        context = line.split(']"]')
        captions = context[0].lower().strip()
        # Tokenize and lowercase
        tokens = nltk.word_tokenize(captions.lower())
        
        # Remove stopwords and non-alphabetic tokens
        filtered_tokens = [word for word in tokens if word.isalpha() and word not in stop_words and len(word) >= 3]
        
        # Lemmatize the filtered tokens
        lemmatized_tokens = [lemmatizer.lemmatize(word) for word in filtered_tokens]
        
        # Initialize a set to keep track of unique n-grams for this line
        unique_ngrams = {2: set(), 3: set(), 4: set()}
        
        # Generate 2, 3, 4-grams
        for n in range(2, 5):
            n_grams = ngrams(lemmatized_tokens, n)
            
            # Add unique n-grams to the set
            unique_ngrams[n].update([' '.join(gram) for gram in n_grams])
        
        # Update the counters with the unique n-grams for this line
        counter_2gram.update(unique_ngrams[2])
        counter_3gram.update(unique_ngrams[3])
        counter_4gram.update(unique_ngrams[4])

# Get the 1000 most common n-grams for each
most_common_2grams = counter_2gram.most_common(1000)
most_common_3grams = counter_3gram.most_common(1000)
most_common_4grams = counter_4gram.most_common(1000)

# Write output to a CSV file
with open('caption_gram_2-4.csv', 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    csvwriter.writerow(['N-gram', 'Frequency'])  # header row
    
    for ngram, freq in most_common_2grams:
        csvwriter.writerow([ngram, freq])
        
    for ngram, freq in most_common_3grams:
        csvwriter.writerow([ngram, freq])
        
    for ngram, freq in most_common_4grams:
        csvwriter.writerow([ngram, freq])
