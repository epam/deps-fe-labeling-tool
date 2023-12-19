import { mockUuid } from '@/mocks/mockUuid'
import {
  Cell,
  CellValue,
  Table,
  getCells
} from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Table model: getCells', () => {
  it('should return an array with the CellValue information', () => {
    const testTable = new Table(
      [79, 89],
      [55, 77],
      [],
      [new CellValue(0, 0, 'Test content')]
    )
    const result = getCells(testTable)
    const expectedOutput = [new Cell(`${testTable.uid}~0`, testTable, 79, 55, 10, 22, 0, 0, 'Test content')]

    expect(result).toEqual(expectedOutput)
  })
})
