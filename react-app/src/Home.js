import React from 'react';
import {Link} from 'react-router-dom'
import logo from './logo.png';
import './Home.css'

const home = () => {
  return (
    <div className="Home">
      <div id='logo'>
        <img src={logo} alt='eResilience' title='eResilience' />
        <div id='version'>
        Field Version 1.0
        </div>
      </div>

      <Link className='button' to='/menu'>START</Link>
    </div>
  )
}
export default home
