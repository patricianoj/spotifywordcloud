import os
import sys
import matplotlib.pyplot as plt
from os import path
from wordcloud import WordCloud, STOPWORDS
remove_words = set(STOPWORDS)
def split_pair(str):
    pair = str.split(" ")
    return pair[0].strip(), float(pair[1])


def process_file():
    frequencies = {}
    file_name = "WordCount.txt"
    text = open(file_name).read()[:-1]
    words = ""
    for pair in text.split("\n"):
        word, count = split_pair(pair)
        if word not in remove_words:
            frequencies[word] = count
    return frequencies

def generate_word_cloud(words):
    wordcloud = WordCloud().fit_words(words)
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis("off")
    plt.show()

frequencies = process_file()
generate_word_cloud(frequencies)
