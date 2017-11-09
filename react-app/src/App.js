import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id='logo'>
          <img src={logo} alt='eResilience' title='eResilience' />
          <div id='version'>
          Field Version 1.0
          </div>
        </div>

        <button>Start</button>
      </div>
    );
  }
}

export default App;
