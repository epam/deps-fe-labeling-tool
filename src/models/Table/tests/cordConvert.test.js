import { mockUuid } from '@/mocks/mockUuid'
import {
  Table,
  toAbsolute,
  toRelative
} from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Table model: cordConvert', () => {
  const testImage = new Image(500, 400)

  it('should return expected table when calling toAbsolute', () => {
    const testTable = new Table([0.79, 0.89], [0.55, 0.77])
    const result = toAbsolute(testTable, 1.4, testImage)
    const expectedResult = {
      ...testTable,
      xGuidelines: [552.9999999999999, 623],
      yGuidelines: [308, 431.19999999999993]
    }

    expect(result).toEqual(expectedResult)
  })

  it('should return expected table when calling toRelative', () => {
    const testTable = new Table([79, 89], [55, 77])
    const result = toRelative(testTable, 1.4, testImage)

    const expectedResult = {
      ...testTable,
      xGuidelines: [0.11285714285714286, 0.12714285714285714],
      yGuidelines: [0.09821428571428571, 0.13750000000000001]
    }

    expect(result).toEqual(expectedResult)
  })
})
