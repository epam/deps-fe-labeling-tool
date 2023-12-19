import { Table } from '@/models/Table'
import { scale } from '@/models/Table/scale'

describe('Table model: scale', () => {
  it('should return an object with the expected properties and values', () => {
    const testTable = new Table([0.79, 0.89], [0.55, 0.77])
    const result = scale(testTable, 3)

    expect(result).toEqual({
      ...testTable,
      xGuidelines: testTable.xGuidelines.map((x) => x * 3),
      yGuidelines: testTable.yGuidelines.map((x) => x * 3)
    })
  })
})
