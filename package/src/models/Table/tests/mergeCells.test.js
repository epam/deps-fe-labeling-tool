import {
  Cell,
  CellsMerge,
  CellValue,
  Table,
  getMergeProjection,
  mergeCells
} from '@/models/Table'

describe('Table model: mergeCells', () => {
  const testTable = new Table(
    [267, 497, 603],
    [840, 872, 906, 938],
    [],
    [
      new CellValue(0, 0, ''),
      new CellValue(1, 0, 'Piloncillo D 6HA'),
      new CellValue(2, 0, 'Original Hole')
    ]
  )

  const cellsToMerge = [
    new Cell('1', testTable, 267, 872, 230, 34, 1, 0, 'Piloncillo D 6HA'),
    new Cell('2', testTable, 267, 906, 230, 31, 2, 0, 'Original Hole')
  ]

  describe('mergeCells', () => {
    it('should return unmodified table if cellsToMerge array is empty', () => {
      const result = mergeCells(testTable, [])
      expect(result).toEqual(testTable)
    })

    it('should successfully add a merge and add merged cell values when merging 2 cells', () => {
      const result = mergeCells(testTable, cellsToMerge)
      const expectedResult = {
        ...testTable,
        merges: [new CellsMerge(1, 0, 1, 2)],
        values: [
          new CellValue(0, 0, ''),
          new CellValue(1, 0, ' Piloncillo D 6HA\nOriginal Hole')
        ]
      }

      expect(result).toEqual(expectedResult)
    })
  })

  describe('Util: getMergeProjection', () => {
    it('should return an object detailing the merge projection', () => {
      const result = getMergeProjection(testTable, cellsToMerge)
      const expectedResult = {
        h: 66,
        w: 230,
        x: 267,
        y: 872
      }

      expect(result).toEqual(expectedResult)
    })
  })
})
