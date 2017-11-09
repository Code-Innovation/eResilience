import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact={true} component={Home} />
          <Route path='/menu' render={() => (<div>Menu</div>)} />
        </div>
      </Router>

    );
  }
}

export default App;
