
import { renderCell } from './Cell'

describe('Component: Cell', () => {
  it('should return modified td from calling renderCell', () => {
    const td = { style: { color: undefined } }
    const result = renderCell(td, 'mockValue', { readOnly: true }, false)
    const expected = {
      style: { color: '#DCE1E7' },
      textContent: 'mockValue'
    }
    expect(result).toEqual(expected)
  })
})
