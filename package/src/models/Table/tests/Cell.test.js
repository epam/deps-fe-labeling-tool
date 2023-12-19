import { mockUuid } from '@/mocks/mockUuid'
import {
  Cell,
  Table
} from '@/models/Table'

jest.mock('uuid', () => mockUuid)

describe('Table model: Cell', () => {
  const testTable = new Table(
    [0.79, 0.89],
    [0.55, 0.77],
    [],
    [],
    { meta: 'some meta' }
  )
  const testCell = new Cell(1, testTable, 1, 2, 3, 4)

  it('should return a clone of the cell', () => {
    const testCellClone = Cell.clone(testCell)
    expect(testCellClone).toEqual(testCell)
  })

  it('should return a transposed version of the cell', () => {
    const expectedTransposedCell = {
      ...testCell,
      h: 3,
      w: 4,
      x: 2,
      y: 1
    }

    expect(Cell.transpose(testCell)).toEqual(expectedTransposedCell)
  })

  it('should return expected array from calling xDiff if left x and right x are equal', () => {
    const leftCell = new Cell(1, testTable, 5, 2, 3, 4)
    const rightCell = new Cell(2, testTable, 5, 2, 7, 4)

    const result = Cell.xDiff(leftCell, rightCell)
    const expectedOutput = [8, 12]

    expect(result).toEqual(expectedOutput)
  })

  it('should return expected array from calling xDiff if left and right x are different', () => {
    const leftCell = new Cell(1, testTable, 5, 2, 3, 4)
    const rightCell = new Cell(2, testTable, 12, 2, 7, 4)

    const result = Cell.xDiff(leftCell, rightCell)
    const expectedOutput = [5, 12]

    expect(result).toEqual(expectedOutput)
  })

  it('should return expected array from calling yDiff (first if)', () => {
    const leftCell = new Cell(1, testTable, 1, 2, 3, 4)
    const rightCell = new Cell(2, testTable, 1, 2, 3, 4)

    const expectedOutput = [6, 6]
    const result = Cell.yDiff(leftCell, rightCell)

    expect(result).toEqual(expectedOutput)
  })

  it('should return expected array from calling yDiff (else)', () => {
    const leftCell = new Cell(1, testTable, 1, 2, 3, 4)
    const rightCell = new Cell(2, testTable, 8, 10, 3, 4)

    const expectedOutput = [2, 10]
    const result = Cell.yDiff(leftCell, rightCell)

    expect(result).toEqual(expectedOutput)
  })
})
