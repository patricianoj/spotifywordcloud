import React, { Component } from 'react';

try {
  var results = require('./images/ResultsImage.png');
} catch (ex) {
    // console.log(ex);
}

class ResultsImage extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <img src={results} className="ResultsImage" />
    );
  }
}

export default ResultsImage;
