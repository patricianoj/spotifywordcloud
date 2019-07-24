import React, { Component } from 'react';
import ResultsImage from './ResultsImage.js';
import logo from './images/MicrosoftImage.png';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      imageCreated: true
    }
  }

  usernameChange(event) {
    this.setState({username:event.target.value});
  }

  passwordChange(event) {
    this.setState({password:event.target.value});
  }

  submitClicked() {

  }

  submitClicked(e) {
    console.log("clicked on create chatroom");

    let data = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    
    let uri = "http://localhost:8080/" + this.state.username + "/" + this.state.password;
    fetch(uri, data)
      .then(res => res.json())
      .then(info => {
        console.log(info);
      });
  }


  render() {
    return (
      <div className="home">
        <img src={logo} className="MusicWordCloud-logo" alt="Image not available" />
        <h1>Welcome to MusicWordCloud</h1>
        <input type="text" placeholder="username" onChange={this.usernameChange.bind(this)} />
        <p>Value: [{this.state.username}]</p>
        <input type="text" placeholder="password" onChange={this.passwordChange.bind(this)} />
        <p>Value: [{this.state.password}]</p>
        <button onClick={this.submitClicked.bind(this)}>Submit</button>

        <div className="imageHolder">
          {this.state.imageCreated ?
            (<ResultsImage />) :
            (<p></p>)}
        </div>
      </div>
    );
  }
}

export default Homepage;
