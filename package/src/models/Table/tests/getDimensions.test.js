import {
  Table,
  getDimensions
} from '@/models/Table/'

describe('Table model: getDimensions', () => {
  it('should return an object with the correct dimensions', () => {
    const testTable = new Table(
      [79, 89, 99],
      [55, 77]
    )

    const result = getDimensions(testTable)

    expect(result).toEqual({
      columns: 2,
      rows: 1
    })
  })
})
