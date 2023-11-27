import {
  Table,
  addRow
} from '@/models/Table'

describe('Table model: addRow', () => {
  const NEW_COLUMN_WIDTH = 25
  const testTable = new Table(
    [10, 25, 35, 50],
    [30, 50, 56]
  )

  it('should add a new row to output table', () => {
    const modifiedTestTable = addRow(testTable, testTable.yGuidelines[2])
    const expectedResult = {
      ...testTable,
      yGuidelines: [30, 50, 56, 56 + NEW_COLUMN_WIDTH]
    }

    expect(modifiedTestTable).toEqual(expectedResult)
  })
})
