import React from 'react'
import {blocks} from './content/parser'
import {Link} from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div className='Menu'>
      {blocks().map((blockTitle, i) => (
        <Link className='blockButton' key={i} to='/'>{blockTitle}</Link>
      ))}
    <div>&nbsp;</div>
    </div>
  )
}

export default Menu
