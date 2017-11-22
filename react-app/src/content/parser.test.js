import {findBlock} from './parser'

describe('findBlock', () => {
  it('loads exercises for a block', () => {
    let block = findBlock('b1')
    expect(block.exercises[0].title).toBe('Hand Warming')
  })

  it('works when called twice in a row', () => {
    let block = findBlock('b1')
    block = findBlock('b1')
    expect(block.exercises[0].title).toBe('Hand Warming')
  })

  it('loads the id of each exercise', () => {
    let block = findBlock('b1')
    expect(block.exercises[0].id).toBe('e1')
  })
})
