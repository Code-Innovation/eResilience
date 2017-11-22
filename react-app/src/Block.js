import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'
import {findBlock} from './content/parser'
import './Block.css'
import './font-awesome.min.css'

const Block = ({match}) => {
  const {params} = match
  let blockContent = blockContentForParams(params)
  return renderBlock(blockContent)
}

function blockContentForParams(params) {
  let block = findBlock(params.block_id)
  if (!params.exercise_id) {
    return blockOverview(block)
  } else if (params.exercise_id === 'instructions') {
    return blockInstructions(block)
  } else if (!params.step_id) {
    return exerciseObjective(params.exercise_id, block)
  } else if (params.step_id === 'completion') {
    return completionStep(params.exercise_id, block)
  } else if (params.step_id === 'finished') {
    return finishedExercise(params.exercise_id, block)
  } else {
    return contentForStep(params.step_id, params.exercise_id, block)
  }
}

function renderBlock({title, next, prev, label, content, contentClass}) {
    let contentDiv
    if (typeof(content) === 'string') {
      contentDiv = <div id='content' className={contentClass} dangerouslySetInnerHTML={{ __html: content}}></div>
    } else {
      contentDiv = <div id='content' className={contentClass}>{content}</div>
    }

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
      {contentDiv}
    </div>
}

function blockOverview(block) {
  let blockInstructionsPath = `/block/${block.id}/instructions`
  let content = <div>
      Today's exercises:
      <ul>
        {block.exercises.map((e, i) => <li key={i}>{e.title}</li>)}
      </ul>
    <Link className='button' to={blockInstructionsPath}>Continue</Link>
    </div>
  return {
    title: block.title,
    next: blockInstructionsPath,
    prev: '/menu',
    label: 'Overview',
    content
  }
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
    prev: `/block/${block.id}`,
    label: 'Instructions',
    content
  }
}

function exerciseObjective(exercise_id, block) {
  let exercise = block.exercises.find(e => e.id === exercise_id)
  if (!exercise.objective) {
    return contentForStep(0, exercise_id, block)
  }
  return {
    title: exercise.title,
    next: `/block/${block.id}/${exercise.id}/0`,
    prev: previousExercisePath(block, exercise),
    label: 'Objective',
    content: exercise.objective,
    contentClass: 'highlight'
  }
}

function previousExercisePath(block, exercise) {
  let exerciseNum = Number(exercise.id.match(/e(\d*)/)[1])
  let previousExerciseId = exerciseNum > 1 ? 'e' + (exerciseNum - 1) : ''
  return `/block/${block.id}/${previousExerciseId}`
}

function contentForStep(step_id, exercise_id, block) {
  step_id = Number(step_id)
  let exercise = block.exercises.find(e => e.id === exercise_id)

  let blockPath = `/block/${block.id}`
  let exercisePath = exercise.objective ? `${blockPath}/${exercise_id}` : previousExercisePath(block, exercise)

  let prev = step_id === 0 ? exercisePath : `${exercisePath}/${step_id-1}`


  let next
  let isLastStep = step_id === exercise.steps.length-1
  if (isLastStep && exercise.completion) {
    next = `${exercisePath}/completion`
  } else  {
    let finishedPath = `${blockPath}/${exercise_id}/finished`
    next = isLastStep ? finishedPath : `${exercisePath}/${step_id + 1}`
  }

  let content = exercise.steps[step_id]
  return {
    title: exercise.title,
    next,
    prev,
    label: `Step ${step_id + 1} of ${exercise.steps.length}`,
    content
  }
}

function completionStep(exercise_id, block) {
  let exercise = block.exercises.find(e => e.id === exercise_id)
  let prev = `/block/${block.id}/${exercise_id}/${exercise.steps.length-1}`
  let next = `/block/${block.id}/${exercise_id}/finished`
  return {
    title: exercise.title,
    next,
    prev,
    label: 'Group Participation',
    content: exercise.completion
  }
}

function finishedExercise(exercise_id, block) {
  let exercise = block.exercises.find(e => e.id === exercise_id)
  let exerciseIds = block.exercises.map(e => e.id)
  let index = exerciseIds.indexOf(exercise_id)
  let next, content
  let blockPath = `/block/${block.id}`
  if (index === exerciseIds.length - 1) {
    next = '/menu'
    content = <div className='finishedExercise'>
      <div>
        You have finished all the exercises for {block.title}.
      </div>
      <Link className='button' to={next}>Done</Link>
    </div>
  } else {
    next = `${blockPath}/${exerciseIds[index+1]}`
    let remainingExercises = exerciseIds.length - 1 - index
    let msg = remainingExercises > 1 ?
        `There are ${remainingExercises} exercises remaining for today` :
        "There is one more exercise to do today."

    content = <div className='finishedExercise'>
      <div> {msg} </div>
      <Link className='button' to={next}>Next</Link>
    </div>
  }
  let prev
  if (exercise.completion) {
    prev = `${blockPath}/${exercise_id}/completion`
  } else {
    prev = `${blockPath}/${exercise_id}/${exercise.steps.length-1}`
  }

  return {
    title: exercise.title,
    next,
    prev,
    label: 'Completed',
    content
  }
}

export default Block
