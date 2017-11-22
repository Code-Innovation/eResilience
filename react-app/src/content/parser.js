import content from './content'

export function blocks() {
  return content.days.map(function({id, title}) {return {id, title}})
}

export function findBlock(blockId) {
  let block = content.days.find((block) => block.id === blockId)
  block = {...block}
  const exercises = block.exercises.map(id => content.exercises[id])
  block.exercises = exercises
  return block
}
