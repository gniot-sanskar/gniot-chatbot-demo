# Import required libraries
import nltk
from nltk.stem import WordNetLemmatizer

# Download required datasets (run only once)
nltk.download('wordnet')
nltk.download('omw-1.4')

# Create lemmatizer object
lemmatizer = WordNetLemmatizer()

# List of words
words = ["running", "better", "studies", "wolves", "cars", "children"]

# Perform lemmatization
print("Lemmatized Words:")
for word in words:
    print(f"{word} -> {lemmatizer.lemmatize(word)}")