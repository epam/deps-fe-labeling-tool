import { CellValue } from '@/models/Table'

describe('Table model: CellValue', () => {
  const testCellValue = new CellValue(2, 5, 'mockValue')

  it('should return expected output from calling static method move', () => {
    const movedCellValue = CellValue.move(testCellValue, 3, 1)
    const expectedOutput = new CellValue(5, 6, 'mockValue')

    expect(movedCellValue).toEqual(expectedOutput)
  })

  it('should return expected output from calling static method transpose', () => {
    const transposedCellValue = CellValue.transpose(testCellValue)
    const expectedOutput = new CellValue(5, 2, 'mockValue')

    expect(transposedCellValue).toEqual(expectedOutput)
  })
})
