import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import {findBlock} from './content/parser'
import './Block.css'
import './font-awesome.min.css'

const Block = (props) => {
  let block = findBlock(props.match.params.block_id)
  let content = <div>
    <ul>
      {block.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
    </ul>
    <div id='notes'>{block.notes}</div>
    <Link className='button' to='/menu'>Continue</Link>
  </div>
  return renderBlock({
    title: block.title,
    next: '/menu',
    prev: '/menu',
    label: 'Instructions',
    content
  }
  )
}

function renderBlock({title, next, prev, label, content}) {
    return <div className='Block'>
      <div id='title'> {title} </div>
      <div id='nav'>
        <Link to={prev}>
          <FontAwesome name='caret-left' size='2x'/>
        </Link>
        <span id='label'> {label} </span>
        <Link to={next}>
          <FontAwesome name='caret-right' size='2x'/>
        </Link>
      </div>
      <div id='content'> {content}</div>
    </div>
}

export default Block
