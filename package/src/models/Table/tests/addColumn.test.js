import { mockUuid } from '@/mocks/mockUuid'
import {
  CellsMerge,
  CellValue,
  Table,
  addColumn
} from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Table model: addColumn', () => {
  const NEW_COLUMN_WIDTH = 25

  const testTable = new Table(
    [79, 89, 100, 200],
    [55, 77, 100, 120, 130],
    [
      new CellsMerge(1, 1, 2, 1),
      new CellsMerge(1, 3, 2, 1),
      new CellsMerge(2, 2, 2, 1),
      new CellsMerge(2, 4, 2, 1)
    ],
    [new CellValue(0, 0, 'Test content')],
    { meta: 'some meta' }
  )

  it('should add an extra column to table without calling normalize (no rightMoved)', () => {
    const newTable = addColumn(testTable, testTable.xGuidelines[3])
    const expectedResult = {
      ...testTable,
      merges: [
        new CellsMerge(1, 1, 2, 1)
      ],
      xGuidelines: [79, 89, 100, 200, 200 + NEW_COLUMN_WIDTH]
    }

    expect(newTable).toEqual(expectedResult)
  })

  it('should call normalize with updated table if new column was inserted before the end', () => {
    const newTable = addColumn(testTable, testTable.xGuidelines[1])
    const expectedResult = {
      ...testTable,
      merges: [
        new CellsMerge(1, 2, 2, 1),
        new CellsMerge(1, 4, 2, 1),
        new CellsMerge(2, 3, 2, 1),
        new CellsMerge(2, 5, 2, 1)
      ],
      xGuidelines: [
        79,
        89,
        89 + NEW_COLUMN_WIDTH,
        100 + NEW_COLUMN_WIDTH,
        200 + NEW_COLUMN_WIDTH
      ]
    }

    expect(newTable).toEqual(expectedResult)
  })
})
