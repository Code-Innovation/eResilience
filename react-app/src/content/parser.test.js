import {findBlock} from './parser'

it('loads exercises for a block', () => {
  let block = findBlock('b1')
  expect(block.exercises[0].title).toBe('Hand Warming')
})
