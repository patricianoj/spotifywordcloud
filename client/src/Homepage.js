import React, { Component } from 'react';
import ResultsImage from './ResultsImage.js';
import logo from './images/MicrosoftImage.png';
const QUERYSTRING = require('querystring');

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginLink: ""
    }
  }

  generateRandomString() {
    var text = '';
    var chars = "abcdefghijkmnpqrstuvwxyz23456789";
    for (var i = 0; i < 16; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }

  componentDidMount() {
    let client_id = "5035f40d461f480d987405fb34be0817";
    let auth_endpoint = "https://accounts.spotify.com/authorize/?";
    let redirect_uri = "http://localhost:3000/callback/"// Your redirect uri
    let scope = "user-top-read user-read-private user-read-email";
    let str = QUERYSTRING.stringify({
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      response_type: "code",
      show_dialog:true
    });

    this.setState({
      loginLink: auth_endpoint + str
    });
  }

  render() {
    return (
      <div className="Homepage">
        <div className="HomeHeader">
          <h1>Welcome to MusicWordCloud</h1>
        </div>
        <a href={this.state.loginLink} class="isButton">Login to Spotify</a>
      </div>
    );
  }
}

export default Homepage;
