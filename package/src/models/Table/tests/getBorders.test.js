import { mockUuid } from '@/mocks/mockUuid'
import { Point } from '@/models/Point'
import {
  Cell,
  Table,
  getBorders
} from '@/models/Table'
import { Border } from '@/models/Table/Border'

jest.mock('uuid', () => mockUuid)

describe('Table model: getBorder', () => {
  it('should return an empty array for an 0x0 table', () => {
    const testTable = new Table([5], [4])
    const result = getBorders(testTable)
    expect(result).toEqual([])
  })

  it('should return an array of 4 borders for an 1x1 table', () => {
    const testTable = new Table([5, 6], [4, 55])
    const result = getBorders(testTable)
    const expectedResult = [
      new Border(testTable, new Point(5, 4), new Point(6, 4), [new Cell('2~0', testTable, 5, 4, 1, 51, 0, 0, '')]),
      new Border(testTable, new Point(5, 55), new Point(6, 55), [new Cell('2~0', testTable, 5, 4, 1, 51, 0, 0, '')]),
      new Border(testTable, new Point(5, 4), new Point(5, 55), [new Cell('2~0', testTable, 5, 4, 1, 51, 0, 0, '')]),
      new Border(testTable, new Point(6, 4), new Point(6, 55), [new Cell('2~0', testTable, 5, 4, 1, 51, 0, 0, '')])
    ]
    expect(result).toEqual(expectedResult)
  })
})
