const express = require('express');
const colors = require('colors');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/:username/:password', (request, response) => {
  console.log('- request received:', request.method.cyan, request.url.underline);
  response.status(200).type('html');

  let username = request.params.username;
  let password = request.params.password;
  console.log(username);
  console.log(password);

  response.json(
    {
      data : {
        "hello" : "world"
      }
    }
  );
});

app.listen(8080);
console.log('App is listening on port 8080'.grey);
