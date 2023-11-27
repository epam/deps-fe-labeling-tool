import {
  Table,
  deleteRow
} from '@/models/Table'

describe('Table model: deleteRow', () => {
  const testTable = new Table([25, 55], [79, 89, 95])

  it('should successfully delete a row', () => {
    const result = deleteRow(testTable, 89, 95)
    const expectedResult = new Table([25, 55], [79, 89])

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })
})
