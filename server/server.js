const express = require('express');
const colors = require('colors');
// const req = require('request');
const path = require('path');
const cors = require('cors');
const querystring = require('querystring');
const bodyParser = require('body-parser');
// var SpotifyWebApi = require('spotify-web-api-node');

const CLIENT_ID = "5035f40d461f480d987405fb34be0817"; // Your client id
const CLIENT_SECRET = "d95f880cb67b4616824a40922235c993"; // Your secret
const REDIRECT_URI = "https://localhost:3000/callback"; // Your redirect uri
const BASE_URL = "https://api.spotify.com/v1";
const GET_URI = "/v1/me/top";
const TRACKS = "/tracks";
const ARTIST = "/artists";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/:token', (request, response) => {
  console.log('- request received:', request.method.cyan, request.url.underline);
  response.status(200).type('html');

  let token = request.params.token;
  console.log("received token! ", token);
  var spawn = require("child_process").spawn;

  var process = spawn('python',["./CreateWordCloud.py", token]);
  process.stdout.on('data', function(data) {
    console.log(data.toString());
    response.json(
      {
        data : {
          "hello" : "world"
        }
      }
    );
  });
});

app.listen(8080);
console.log('App is listening on port 8080'.grey);
