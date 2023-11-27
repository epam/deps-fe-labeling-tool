import {
  Table,
  move
} from '@/models/Table'

describe('Table model: move', () => {
  it('should correctly move a table depending of arguments', () => {
    const testTable = new Table([20, 30, 40], [10, 15])
    const result = move(testTable, 30, 50)

    const expectedResult = {
      ...testTable,
      xGuidelines: testTable.xGuidelines.map((xg) => xg + 30),
      yGuidelines: testTable.yGuidelines.map((xg) => xg + 50)
    }

    expect(result).toEqual(expectedResult)
  })
})
