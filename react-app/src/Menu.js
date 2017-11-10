import React from 'react'
import {blocks} from './content/parser'
import {Link} from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div className='Menu'>
      {blocks().map(block => (
        <Link className='blockButton' key={block.id} to={`/block/${block.id}`}>{block.title}</Link>
      ))}
    <div>&nbsp;</div>
    </div>
  )
}

export default Menu
