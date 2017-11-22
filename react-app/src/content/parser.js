import content from './content'

export function blocks() {
  return content.days.map(function({id, title}) {return {id, title}})
}

export function findBlock(blockId) {
  const block = content.days.find((block) => block.id === blockId)
  const exercises = block.exercises.map(id => content.exercises[id])
  block.exercises = exercises
  return block
}
