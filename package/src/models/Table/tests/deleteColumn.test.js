import {
  CellValue,
  Table,
  deleteColumn
} from '@/models/Table'

describe('Table model: deleteColumn', () => {
  const testTable = new Table(
    [25, 55, 66, 99],
    [79, 89],
    [],
    [new CellValue(0, 0, 'mockValue')]
  )

  it('should delete leftmost column including the value', () => {
    const result = deleteColumn(testTable, 25, 55)
    const expectedResult = new Table(
      [55, 66, 99],
      [79, 89],
      [],
      []
    )

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })

  it('should delete center column and normalize resulting table', () => {
    const result = deleteColumn(testTable, 55, 66)
    const expectedResult = new Table(
      [25, 55, 88],
      [79, 89],
      [],
      [new CellValue(0, 0, 'mockValue')]
    )

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })

  it('should delete rightmost column', () => {
    const result = deleteColumn(testTable, 66, 99)
    const expectedResult = new Table(
      [25, 55, 66],
      [79, 89],
      [],
      [new CellValue(0, 0, 'mockValue')]
    )

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })
})
