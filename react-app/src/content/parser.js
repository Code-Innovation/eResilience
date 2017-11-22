import content from './content'

export function blocks() {
  return content.days.map(function({id, title}) {return {id, title}})
}

export function findBlock(blockId) {
  let block = content.days.find((block) => block.id === blockId)
  block = {...block}
  block.exercises = block.exercises
    .map((id, idx) => {
      let exercise = content.exercises[id]
      return {id: 'e' + (Number(idx)+1), ...exercise}
    })

  return block
}
