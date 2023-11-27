import {
  CellValue,
  Table,
  autoMerge
} from '@/models/Table'

describe('Table model: autoMerge', () => {
  it('should return same table if table contains less than 3 columns', () => {
    const testTable = new Table(
      [79, 89],
      [55, 77],
      [],
      [new CellValue(0, 0, 'Test content')],
      { meta: 'some meta' }
    )
    expect(autoMerge(testTable)).toEqual(testTable)
  })

  it('should return table with merged rows and columns (last of each)', () => {
    const testTable = new Table(
      [79, 89, 91],
      [55, 77, 78],
      [],
      [new CellValue(0, 0, 'Test content')],
      { meta: 'some meta' }
    )

    const expectedAutoMergedTable = {
      ...testTable,
      xGuidelines: [79, 89],
      yGuidelines: [55, 77]
    }

    expect(autoMerge(testTable)).toEqual(expectedAutoMergedTable)
  })
})
