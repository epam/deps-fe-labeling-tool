import {
  CellsMerge,
  CellValue,
  Table
} from '@/models/Table'
import { slice } from '@/models/Table/slice'

describe('Table model: slice', () => {
  const testTable = new Table(
    [12, 20, 56, 81, 100],
    [10, 25, 35, 50],
    [new CellsMerge(0, 0, 2, 2)],
    [new CellValue(3, 1, 'mockValue')]
  )

  it('should return undefined if slicing from desired guideline results in a 0xAnyNum table', () => {
    const result = slice(testTable, testTable.xGuidelines[0])
    expect(result).toBe(undefined)
  })

  it('should correctly slice a table', () => {
    const result = slice(testTable, testTable.xGuidelines[1])
    const expectedResult = {
      ...testTable,
      xGuidelines: [12, 20],
      merges: [new CellsMerge(0, 0, 1, 2)],
      values: []
    }

    expect(result).toEqual(expectedResult)
  })
})
