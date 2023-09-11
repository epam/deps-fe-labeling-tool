import {
  CellValue,
  Table
} from '@/models/Table'
import { split } from '@/models/Table/split'

describe('Table model: split', () => {
  it('should split and return both sides of a table', () => {
    const testTable = new Table([10, 20, 30], [40, 50], [], [new CellValue(0, 0, 'LeftValue'), new CellValue(0, 1, 'RightValue')])
    const [leftSide, rightSide] = split(testTable, 20)

    const expectedResults = {
      leftSide: {
        ...testTable,
        xGuidelines: [10, 20],
        yGuidelines: [40, 50],
        values: [new CellValue(0, 0, 'LeftValue')]
      },
      rightSide: {
        ...testTable,
        xGuidelines: [20, 30],
        yGuidelines: [40, 50],
        values: [new CellValue(0, 0, 'RightValue')]
      }
    }

    expect({ leftSide, rightSide }).toEqual(expectedResults)
  })
})
