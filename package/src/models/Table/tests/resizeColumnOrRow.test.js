import {
  Table,
  resizeColumnOrRow
} from '@/models/Table'

describe('Table model: resizeColumnOrRow', () => {
  it('should correctly resize a table', () => {
    const testTable = new Table(
      [79, 89, 95],
      [55, 77, 82]
    )

    const result = resizeColumnOrRow(testTable, [79, 81], [77, 60])

    const expectedResults = {
      ...testTable,
      xGuidelines: [81, 91, 97],
      yGuidelines: [55, 60, 65]
    }

    expect(result).toEqual(expectedResults)
  })
})
