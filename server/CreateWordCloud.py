import os
import sys
import numpy as np
import matplotlib.pyplot as plt
from os import path
from wordcloud import WordCloud, STOPWORDS, ImageColorGenerator
from PIL import Image
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk.tokenize import word_tokenize
import requests
from bs4 import BeautifulSoup




# Step 3: Constants
num_tracks = "10"

# Step 4: Constants
remove_words = set(STOPWORDS)
WORDFILE = "WordCount.txt"
IMGFILE = "MicrosoftImage.png"

garbageWords = ["[","]","0","1","2","4","5","6","7","8","9","Verse","Chorus",",","!","?", "\'\'","``","Outro","'d","'s"]

def getSongsAndArtists(token):
    tracks = []
    SPOTIFY_API_BASE_URL = "https://api.spotify.com"
    API_VERSION = "v1"
    SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}
    
    # Get top tracks for current user
    top_tracks_payload = {
        "time_range" : "long_term",
        "limit" : num_tracks
    }
    
    top_tracks_params = "&".join(["{}={}".format(key, quote(val)) for key, val in top_tracks_payload.items()])
    top_tracks_api_endpoint = "{}/me/top/tracks".format(SPOTIFY_API_URL)
    top_tracks_response = requests.get(top_tracks_api_endpoint, headers=authorization_header, params = top_tracks_params)
    top_tracks = json.loads(top_tracks_response.text)["items"]
    
    # format tracks into array of name-artists pairs 
    for track in top_tracks:
        artists_names = ""
        name = track["name"]
        artists = track["artists"]
        for artist in artists:
            artists_names = artists_names + " " + artist["name"]
        print(artists_names)
        tracks.append([name, artists_names])

    print(tracks) 
    # Given the access token, get the songs and whatever
    return tracks

##########
#    Step 3:
#    Getting song lyrics given artist and title
##########

def request_song_info(song_title, artist_name):
    base_url = 'https://api.genius.com'
    headers = {'Authorization': 'Bearer ' + 'AZr2b-EVxiithfATDLRFIBJCDIZnToQMJVnJGzuV_aXWRl2Q-Ht-qeK4qx7jj5PI'}
    search_url = base_url + '/search'
    data = {'q': song_title + ' ' + artist_name}
    response = requests.get(search_url, data=data, headers=headers)

    return response

def scrap_song_url(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, 'html.parser')
    lyrics = html.find('div', class_='lyrics').get_text()
    return lyrics

def removeStopWords(song):
  stop_words = remove_words

  word_tokens = word_tokenize(song)

  filtered_song = [w for w in word_tokens if not w in stop_words]

  filtered_song = []

  for w in word_tokens:
    if w not in stop_words:
       if w not in garbageWords:
        filtered_song.append(w.lower())

  return filtered_song

def passInTopSongs(arr):
    lyricsArr = []
    for elem in arr:
        artist_name = elem[1]
        song_name = elem[0]
        response = request_song_info(song_name, artist_name)
        json = response.json()
        remote_song_info = None

        for hit in json['response']['hits']:
          if artist_name.lower() in hit['result']['primary_artist']['name'].lower():
            remote_song_info = hit
            break

        lyrics = ""
        if remote_song_info:
          song_url = remote_song_info['result']['url']
          lyricsWStopWords = scrap_song_url(song_url)
          lyrics = removeStopWords(lyricsWStopWords)
        lyricsArr.append([elem[1], lyrics])
    return lyricsArr

##########
#    Step 4:
#    Creating the word cloud from word freq
##########
def split_pair(str):
    pair = str.split(" ")
    return pair[0].strip(), float(pair[1])

def process_image():
    return np.array(Image.open(IMGFILE))

def process_file(lyrics):
    frequencies = {}
# [[artist, lyrics -> ['word', 'word', ..]],
#  [artist, lyrics -> ['word', 'word', ..]], ...]
    allwords = ""
    for lyric in lyrics:
        artist = lyric[0]
        words = lyric[1]
        for word in words:
            if word in frequencies:
                frequencies[word] = frequencies[word] + 1
            else:
                frequencies[word] = 1
            allwords = allwords + word + " "
    return frequencies, allwords

def generate_word_cloud(words, img_color):
    wc = WordCloud(background_color="white", max_words=1000, mask=img_color, max_font_size=90, random_state=42)
    wc.fit_words(words)
    image_colors = ImageColorGenerator(img_color)
    plt.figure(figsize=[7,7])
    plt.imshow(wc.recolor(color_func=image_colors), interpolation="bilinear")
    plt.axis("off")
    plt.savefig('../client/src/images/ResultsImage.png')
    print("Saved file sucessfully.")

token = sys.argv[1]
print('got token', token)
artistsAndSongsArray = getSongsAndArtists(token)
print(artistsAndSongsArray)
lyricsarr = passInTopSongs(artistsAndSongsArray) # [0][1]
print(lyricsarr)
frequencies, words = process_file(lyricsarr)
print(words)
image = process_image()
generate_word_cloud(frequencies, image)
