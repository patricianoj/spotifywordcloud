import React, { Component } from 'react';
import ResultsImage from './ResultsImage.js';
import Loader from 'react-loader-spinner'
import logo from './images/MicrosoftImage.png';
const QUERYSTRING = require('querystring');

try {
  var results = require('./images/ResultsImage.png');
} catch (ex) {
    // console.log(ex);
}

function getImage() {
  try {
    var results = require('./images/ResultsImage.png');
    return results;
  } catch (ex) {
      // console.log(ex);
    return null;
  }
}
class LoggedIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loader: false,
      imageCreated: true,
      access_token: null,
      error: false,
      errorMessage: "",
      logoutLink:""
    }
  }

  componentDidMount() {
    let client_id = "-";
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

    // TODO: Get name
    let access_token = this.parseAccessToken(this.props.location.search);
    if (access_token == null) {
      this.setState({
        loader:false,
        error:true,
        errorMessage:"Invalid access token! Unable to access your Spotify."
      });
    } else {
      this.setState({
        loader:false,
        access_token:access_token,
        error:false,
        errorMessage:"",
        logoutLink: auth_endpoint + str
      });
    }
  }

  parseAccessToken(str) {
    if (str.substring(0,6) === "?code=") {
      return str.substring(6,str.length);
    }
    return null;
  }

  generateImage() {
    this.setState({
      loader:true
    });
    let data = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    let uri = "http://localhost:8080/" + this.state.access_token ;

    fetch(uri, data)
      .then(res => res.json())
      .then(info => {
        this.setState({loader:false});
      });
  }

  logout() {
    let client_id = "5035f40d461f480d987405fb34be0817";
    let auth_endpoint = "https://accounts.spotify.com/authorize/?";
    let redirect_uri = "http://localhost:3000/callback/"// Your redirect uri
    let scope = "user-top-read user-read-private user-read-email";
    let str = QUERYSTRING.stringify({
      client_id: client_id,
      redirect_uri: redirect_uri,
      scope: scope,
      response_type: "code",
    });

    this.setState({
      loginLink: auth_endpoint + str
    });
  }

  render() {
    return (
      <div className="Homepage">
        <div className="HomeHeader">
          <img src={logo} className="MusicWordCloud-logo" alt="Image not available" />
          <h1>Welcome {this.state.name}</h1>
        </div>
        <div className="HomeContent">
          <button className="submitButton" onClick={this.generateImage.bind(this)}>Generate Image</button>
          <a href={this.state.logoutLink} class="isButton">Different user?</a>
        </div>
        { this.state.error ?
          (
            <div className="Error">
              <p>{this.state.errorMessage}</p>
            </div>
          ) :
          (
            <div className="HomeResults">
              { this.state.loader ?
                (<Loader type="Circles" color="white" height={80} width={80}/>) :
                (<p></p>)
              }
              {this.state.imageCreated ?
                (<img src={results} className="ResultsImage" />) :
                (<p></p>)}
            </div>
          )
        }

      </div>
    );
  }
}

export default LoggedIn;
