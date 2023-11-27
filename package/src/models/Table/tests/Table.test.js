import { mockUuid } from '@/mocks/mockUuid'
import { Rectangle } from '@/models/Rectangle'
import { CellsMerge, CellValue, Table } from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Model: Table', () => {
  const testTable = new Table(
    [0.5, 0.6, 0.7],
    [0.1, 0.2, 0.3],
    [new CellsMerge(1, 0, 2, 1)],
    [new CellValue(1, 0, '')],
    {},
    'codeTable',
    21
  )

  it('should return true for a valid table structure', () => {
    const result = Table.isValid(testTable)
    expect(result).toBe(true)
  })

  it('should return false for an invalid table structure', () => {
    const testTable = new Table([2, 3, 4], [5, 2, 3])
    delete testTable.uid

    const result = Table.isValid(testTable)
    expect(result).toBe(false)
  })

  it('should return a string including fieldcode and index from calling getName', () => {
    const result = Table.getName(testTable)
    expect(result).toBe('codeTable.21')
  })

  it('should return an empty string when theres no fieldCode from calling getName', () => {
    const testTableTemp = Table.clone(testTable)
    testTableTemp.fieldCode = ''

    const result = Table.getName(testTableTemp)
    expect(result).toBe('')
  })

  it('should return just a string with the fieldCode when theres no index in table from calling getName', () => {
    const testTableTemp = Table.clone(testTable)
    testTableTemp.index = undefined

    const result = Table.getName(testTableTemp)
    expect(result).toBe('codeTable')
  })

  it('should return an array with tables that share the same given fieldCode', () => {
    const testTable1 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode1')
    const testTable2 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode2')
    const testTable3 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode1')

    const tablesArr = [testTable1, testTable2, testTable3]
    const filteredTablesArr = [testTable1, testTable3]

    const result = Table.getSameTablesByFieldCode(tablesArr, 'fieldCode1')
    expect(result).toEqual(filteredTablesArr)
  })

  it('should find a matching table within a tables array', () => {
    const testTable1 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode1', 1)
    const testTable2 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode2', 2)
    const testTable3 = new Table([2, 3], [4, 5], [], [], {}, 'fieldCode3', 3)

    const tablesArr = [testTable1, testTable2, testTable3]

    const tableToFind = Table.clone(testTable2)

    const result = Table.getSameTable(tableToFind, tablesArr)
    expect(result).toEqual(testTable2)
  })

  it('should return expected shifted table', () => {
    const TABLE_SHIFT_COEFFICIENT = 1.01

    const expectedResults = {
      ...testTable,
      xGuidelines: testTable.xGuidelines.map(
        (xg) => xg * TABLE_SHIFT_COEFFICIENT
      ),
      yGuidelines: testTable.yGuidelines.map(
        (xy) => xy * TABLE_SHIFT_COEFFICIENT
      )
    }

    const result = Table.shift(testTable)
    expect(result).toEqual(expectedResults)
  })

  it('should return a duplicated table', () => {
    const result = Table.duplicate(testTable)

    expect(result).toEqual({
      ...testTable,
      index: undefined,
      fieldCode: '',
      uid: expect.any(String)
    })
  })

  it('should return a new table based on a rectangle', () => {
    const testRectangle = new Rectangle(10, 20, 30, 40)
    const result = Table.fromRectangle(testRectangle)

    const expectedResult = new Table([10, 40], [20, 60])

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })
})
