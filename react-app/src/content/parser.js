import content from './content'

export function blocks() {
  return content.map(function({id, title}) {return {id, title}})
}

export function findBlock(blockId) {
  return content.find((block) => block.id === blockId)
}
