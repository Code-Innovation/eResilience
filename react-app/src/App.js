import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Menu from './Menu'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact={true} component={Home} />
          <Route path='/menu' component={Menu} />
        </div>
      </Router>

    );
  }
}

export default App;
