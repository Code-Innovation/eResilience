import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import {findBlock} from './content/parser'
import './Block.css'
import './font-awesome.min.css'

const Block = ({match}) => {
  const {params} = match
  console.log(params)
  let block = findBlock(params.block_id)
  let blockContent = {}
  if (!params.exercise_id) {
    blockContent = blockInstructions(block)
  } else if (!params.step_id) {
    blockContent = exerciseObjective(params.exercise_id, block)
  }
  return renderBlock(blockContent)
}

function renderBlock({title, next, prev, label, content, contentClass}) {
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
      <div id='content' className={contentClass}> {content}</div>
    </div>
}

function blockInstructions(block) {
  let firstEngagementPath = `/block/${block.id}/${block.exercises[0].id}`
  let content = <div>
    <ul>
      {block.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
    </ul>
    <div id='notes'>{block.notes}</div>
    <Link className='button' to={firstEngagementPath}>Continue</Link>
  </div>
  return {
    title: block.title,
    next: firstEngagementPath,
    prev: '/menu',
    label: 'Instructions',
    content
  }
}

function exerciseObjective(exercise_id, block) {
  let exercise = block.exercises.find(e => e.id === exercise_id)
  return {
    title: exercise.title,
    next: '/',
    prev: `/block/${block.id}`,
    label: 'Objective',
    content: exercise.objective,
    contentClass: 'highlight'
  }
}

export default Block
