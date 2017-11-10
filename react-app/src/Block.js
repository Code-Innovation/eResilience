import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import {findBlock} from './content/parser'
import './Block.css'

const Block = (props) => {
  let block = findBlock(props.match.params.block_id)
  return (
    <div className='Block'>
      <div id='title'>
        {block.title}
      </div>
      <div id='nav'>
        <FontAwesome name='caret-left' size='2x'/>
        <span id='label'>
          Instructions
        </span>
        <FontAwesome name='caret-right' size='2x'/>
      </div>
      <div id='content'>
        <ul>
          {block.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
        </ul>
        <div id='notes'>{block.notes}</div>
        <Link className='button' to='/'>Continue</Link>
      </div>

    </div>
  )
}

export default Block
