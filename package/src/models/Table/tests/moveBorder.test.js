import { mockUuid } from '@/mocks/mockUuid'
import {
  Table,
  moveBorder
} from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Table model: moveBorder', () => {
  const testTable = new Table(
    [79, 89],
    [55, 77]
  )

  it('should return same table with updated guidelines', () => {
    const xDiff = [79, 81]
    const yDiff = [55, 60]
    const result = moveBorder(testTable, xDiff, yDiff)

    const expectedResult = {
      ...testTable,
      xGuidelines: result.xGuidelines,
      yGuidelines: result.yGuidelines
    }

    expect(result).toEqual(expectedResult)
  })
})
