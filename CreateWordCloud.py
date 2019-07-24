import os
import sys
import numpy as np
import matplotlib.pyplot as plt
from os import path
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
from PIL import Image

remove_words = set(STOPWORDS)
WORDFILE = "WordCount.txt"
IMGFILE = "MicrosoftImage.png"

def split_pair(str):
    pair = str.split(" ")
    return pair[0].strip(), float(pair[1])

def process_image():
    return np.array(Image.open(IMGFILE))

def process_file():
    frequencies = {}
    text = open(WORDFILE).read()[:-1]
    words = ""
    for pair in text.split("\n"):
        word, count = split_pair(pair)
        if word not in remove_words:
            frequencies[word] = count
            words = words + word + " "
    return frequencies, words

def generate_word_cloud(words, img_color):
    wc = WordCloud(background_color="white", max_words=1000, mask=img_color, max_font_size=90, random_state=42)
    wc.fit_words(words)
    image_colors = ImageColorGenerator(img_color)
    plt.figure(figsize=[7,7])
    plt.imshow(wc.recolor(color_func=image_colors), interpolation="bilinear")
    plt.axis("off")
    plt.show()


frequencies, words = process_file()
image = process_image()
generate_word_cloud(frequencies, image)
