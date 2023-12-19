import {
  CellsMerge,
  CellValue,
  Table,
  splitCells
} from '@/models/Table'

describe('Table model: splitCells', () => {
  it('should split cells vertically adding one column and modifying cell values in case throughout', () => {
    const testTable = new Table(
      [267, 497, 603],
      [267, 497, 603],
      [],
      [
        new CellValue(0, 0, ''),
        new CellValue(0, 1, ''),
        new CellValue(1, 0, 'Piloncillo D 6HA'),
        new CellValue(1, 1, '3579.00 Ft'),
        new CellValue(2, 0, 'Original Hole'),
        new CellValue(2, 1, '15251.00 Ft')
      ]
    )

    const result = splitCells(
      testTable,
      {
        x: 543,
        y: 860
      },
      {
        x: 541,
        y: 915
      },
      true
    )

    const expectedResult = new Table(
      [267, 497, 543, 603],
      [267, 497, 603],
      [],
      [
        new CellValue(0, 0, ''),
        new CellValue(0, 2, ''),
        new CellValue(1, 0, 'Piloncillo D 6HA'),
        new CellValue(1, 2, '3579.00 Ft'),
        new CellValue(2, 0, 'Original Hole'),
        new CellValue(2, 2, '15251.00 Ft')
      ]
    )
    expectedResult.uid = testTable.uid

    expect(result).toEqual(expectedResult)
  })

  it('should split cells horizontally, not add any new guidelines, set new cell merge in case not throughout', () => {
    const testTable = new Table(
      [704, 800, 891, 1035],
      [478, 505, 531, 556],
      [new CellsMerge(0, 0, 1, 3)]
    )

    const result = splitCells(
      testTable,
      {
        x: 707,
        y: 505
      },
      {
        x: 750,
        y: 504
      },
      false
    )

    const expectedResult = new Table(
      [704, 800, 891, 1035],
      [478, 505, 531, 556],
      [new CellsMerge(1, 0, 1, 2)]
    )
    expectedResult.uid = testTable.uid

    expect(result).toEqual(expectedResult)
  })

  it('should split cells horizontally, add any new guideline, set new cell merges in case not throughout', () => {
    const testTable = new Table(
      [704, 800, 891, 1035],
      [478, 505, 531, 556],
      [new CellsMerge(0, 0, 1, 3)]
    )

    const result = splitCells(
      testTable,
      {
        x: 707,
        y: 525
      },
      {
        x: 750,
        y: 529
      },
      false
    )

    const expectedResult = new Table(
      [704, 800, 891, 1035],
      [478, 505, 525, 531, 556],
      [
        new CellsMerge(0, 0, 1, 2),
        new CellsMerge(2, 0, 1, 2),
        new CellsMerge(1, 1, 1, 2),
        new CellsMerge(1, 2, 1, 2)
      ]
    )
    expectedResult.uid = testTable.uid

    expect(result).toEqual(expectedResult)
  })
})
