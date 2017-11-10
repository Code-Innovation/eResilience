import content from './content'

export function blocks() {
  return content.map(block => block.title)
}
