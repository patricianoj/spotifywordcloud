import React from 'react';
import Homepage from './Homepage.js';
import LoggedIn from './LoggedIn.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import logo from './images/MicrosoftImage.png';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <div className="MusicWordCloud">
          <Route exact path='/' component={Homepage} />
          <Route exact path='/:access_token' component={LoggedIn} />
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
