import { mockUuid } from '@/mocks/mockUuid'
import {
  Table,
  CellsMerge,
  CellValue
} from '@/models/Table'
import { merge } from '@/models/Table/merge'

jest.mock('uuid', () => mockUuid)

describe('Table model: merge', () => {
  it('should successfully merge both tables', () => {
    const testTableLeft = new Table(
      [30, 50, 56],
      [30, 50, 56],
      [new CellsMerge(0, 0, 1, 1)],
      [],
      null,
      'mockFieldCodeLeft'
    )
    const testTableRight = new Table(
      [56, 81],
      [10, 25, 35, 50],
      [new CellsMerge(0, 0, 2, 2)],
      [new CellValue(3, 1, 'mockValue')],
      { meta: 'some meta' },
      '',
      3
    )

    const result = merge(testTableLeft, testTableRight, [
      new CellsMerge(0, 0, 2, 2)
    ])

    const expectedResult = new Table(
      [30, 50, 56, 81],
      [10, 25, 30, 35, 50, 56],
      [new CellsMerge(0, 2, 2, 2), new CellsMerge(0, 0, 2, 2)],
      [new CellValue(3, 3, 'mockValue')],
      { meta: 'some meta' },
      'mockFieldCodeLeft',
      3
    )

    expect(result).toEqual({ ...expectedResult, uid: expect.any(String) })
  })
})
