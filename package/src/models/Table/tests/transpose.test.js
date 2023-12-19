import {
  CellValue,
  Table
} from '@/models/Table'
import { transpose } from '@/models/Table/transpose'

describe('Table model: transpose', () => {
  const testTable = new Table(
    [10, 20, 30],
    [40, 50, 60],
    [],
    [new CellValue(0, 0, 'LeftValue'), new CellValue(0, 1, 'RightValue')]
  )

  it('should return a transposed table with expected values', () => {
    const result = transpose(testTable)
    const expectedResult = {
      ...testTable,
      values: [
        new CellValue(0, 0, 'LeftValue'),
        new CellValue(1, 0, 'RightValue')
      ],
      xGuidelines: testTable.yGuidelines,
      yGuidelines: testTable.xGuidelines
    }

    expect(result).toEqual(expectedResult)
  })
})
