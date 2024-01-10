import {
  Table,
  getPosition
} from '@/models/Table'

describe('Table model: getPosition', () => {
  it('should return an object with the position of the table', () => {
    const testTable = new Table(
      [79, 89],
      [55, 77]
    )

    const result = getPosition(testTable)
    const expectedResult = {
      x: testTable.xGuidelines[0],
      y: testTable.yGuidelines[0]
    }

    expect(result).toEqual(expectedResult)
  })
})
