import nltk
nltk.data.path.append('nltk_data')
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
import gensim
import pandas as pd
import random
from gensim.models import KeyedVectors
from keyphraseExtraction import extractor

# Load the saved model from disk
loaded_model = KeyedVectors.load("KeyPhrase/fasttext/fasttext_model")

def generate_option(answer):
    answer=answer.split(" ")
    options=[]
    if(len(answer)>1):
        similar_words = loaded_model.most_similar(answer[0], topn=20)
        similar = [w[0] for w in similar_words if w[0][0].lower() !=answer[0][0]]
        for option in similar:
            if len(answer)==2:
                options.append(option+" "+answer[1])
            else:
                options.append(option+" "+answer[1]+" "+answer[2])
      
    else:
        similar_words = loaded_model.most_similar(answer[0], topn=20)
        similar = [w[0] for w in similar_words if w[0][0].lower() !=answer[0][0]]
        for option in similar:
            options.append(option)
    return options

def generate_mcq(summary_text):
    response=[]
    keyphrases = extractor(summary_text.lower())
    sentence = sent_tokenize(summary_text.lower())
    for result in keyphrases:
        if result['entity_group'] == 'KEY':
            for token in sentence:
                if result['word'] in token and not result['word'].isalnum():
                    sentence_str = token.replace(result["word"], "_____")
                    try:
                        options=generate_option(result["word"])
                        random.shuffle(options)
                        options=options[:3]
                        options.append(result["word"])
                        random.shuffle(options)
                    except KeyError:
                        continue
                    response.append({"question":sentence_str, "options":options,"answer":result['word']})
            continue
    random.shuffle(response)
    return response