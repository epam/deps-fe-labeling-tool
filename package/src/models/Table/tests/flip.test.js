import {
  CellsMerge,
  CellValue,
  Table
} from '@/models/Table'
import { flip } from '../flip'

describe('Table model: flip', () => {
  const testTable = new Table(
    [10, 20, 30, 40],
    [50, 60, 70, 80],
    [new CellsMerge(1, 0, 1, 2)],
    [new CellValue(0, 0, ''), new CellValue(1, 0, 'Piloncillo D')]
  )

  it('should successfully flip a table', () => {
    const result = flip(testTable, 20)

    const expectedResult = {
      ...testTable,
      xGuidelines: [0, 10, 20, 30],
      values: [new CellValue(0, 2, ''), new CellValue(1, 2, 'Piloncillo D')],
      merges: [new CellsMerge(1, 2, 1, 2)]
    }
    expect(result).toEqual(expectedResult)
  })
})
