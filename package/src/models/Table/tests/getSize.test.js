import {
  Table,
  getSize
} from '@/models/Table'

describe('Table model: getSize', () => {
  it('should return an object with thethe calculated size of the table', () => {
    const testTable = new Table(
      [79, 89, 110],
      [55, 77, 120]
    )

    const result = getSize(testTable)

    expect(result).toEqual({
      h: 65,
      w: 31
    })
  })
})
