import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import Menu from './Menu'
import Block from './Block'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact={true} component={Home} />
          <Route path='/menu' component={Menu} />
          <Route path='/block/:block_id' component={Block} />
        </div>
      </Router>

    );
  }
}

export default App;
