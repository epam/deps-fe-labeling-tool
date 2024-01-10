import { Table, CellsMerge } from '@/models/Table'
import { getIntersectingMerges } from '@/models/Table/getIntersectingMerges'

describe('Table model: getIntersectingMerges', () => {
  const testTable = new Table(
    [0.142857, 0.185268, 0.22768, 0.2701, 0.3125, 0.3549, 0.39732],
    [0.3049, 0.320413, 0.33592, 0.3514, 0.3669, 0.38243, 0.3979, 0.41343],
    [
      new CellsMerge(1, 1, 2, 1),
      new CellsMerge(1, 3, 2, 1),
      new CellsMerge(2, 2, 2, 1),
      new CellsMerge(2, 4, 2, 1)
    ]
  )
  it('should return an array with 1 intersection with given args', () => {
    const result = getIntersectingMerges(testTable, 0.21, 0.1)
    const expectedResult = [
      new CellsMerge(1, 1, 2, 1)
    ]

    expect(result).toEqual(expectedResult)
  })

  it('should return an empty array when called with given args', () => {
    const result = getIntersectingMerges(testTable, 0.9)

    expect(result).toEqual([])
  })
})
