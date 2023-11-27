import {
  CellsMerge,
  CellValue,
  Table
} from '@/models/Table'
import { normalize } from '@/models/Table/normalize'

describe('Table model: normalize', () => {
  it('should return undefined for an 0 x anyNum>2 table', () => {
    const testTable = new Table([79], [55, 60, 75])
    const result = normalize(testTable)

    expect(result).toBe(undefined)
  })

  it('should return undefined for an anyNum>2 x 0 table', () => {
    const testTable = new Table([79, 90, 100], [55])
    const result = normalize(testTable)

    expect(result).toBe(undefined)
  })

  it('should remove an invalid merge and modify rows', () => {
    const testCellsMerge1 = new CellsMerge(1, 3, 4, 1)
    const testCellsMerge2 = new CellsMerge(1, 1, 1, 1)
    const testCellsMerge3 = new CellsMerge(1, 1, 3, 5)

    const testTable = new Table(
      [10, 20, 30, 40],
      [50, 60, 70],
      [testCellsMerge1, testCellsMerge2, testCellsMerge3],
      [new CellValue(0, 0, 'mockValue')]
    )

    const filteredCellsMerge = [testCellsMerge1, new CellsMerge(1, 1, 3, 1)]
    const result = normalize(testTable)

    const expectedResult = {
      ...testTable,
      merges: filteredCellsMerge,
      yGuidelines: [50, 60]
    }

    expect(result).toEqual(expectedResult)
  })
})
