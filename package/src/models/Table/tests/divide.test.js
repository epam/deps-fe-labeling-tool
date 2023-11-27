import {
  Table,
  divide
} from '@/models/Table'

describe('Table model: divide', () => {
  const testTable = new Table(
    [25, 55, 57, 66, 99],
    [54, 79, 89, 91, 94]
  )

  it('should correctly reduce table to 1 row and 1 column', () => {
    const result = divide(testTable, 1, 1)
    const expectedResult = new Table([25, 99], [54, 94])
    expectedResult.uid = testTable.uid

    expect(result).toEqual(expectedResult)
  })
})
