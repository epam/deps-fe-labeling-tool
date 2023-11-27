import { CellsMerge } from '@/models/Table'

describe('Table model: CellsMerge', () => {
  const testCellsMerge = new CellsMerge(1, 1, 6, 6)

  it('should return expected output from calling static method split', () => {
    const result = CellsMerge.split(testCellsMerge, 5)
    const expectedOutput = [
      new CellsMerge(1, 1, 6, 4),
      new CellsMerge(5, 1, 6, 2)
    ]

    expect(result).toEqual(expectedOutput)
  })

  it('should return expected output from calling static method move', () => {
    const result = CellsMerge.move(testCellsMerge, 2, 5)
    const expectedOutput = new CellsMerge(3, 6, 6, 6)

    expect(result).toEqual(expectedOutput)
  })

  it('should return expected output from calling static method expand', () => {
    const result = CellsMerge.expand(testCellsMerge, 3, 4)
    const expectedOutput = new CellsMerge(1, 1, 9, 10)

    expect(result).toEqual(expectedOutput)
  })

  it('should return false if CellsMerge does not contain given column', () => {
    const result = CellsMerge.includesColumn(testCellsMerge, 10)

    expect(result).toBe(false)
  })

  it('should return true if CellsMerge includes given column', () => {
    const result = CellsMerge.includesColumn(testCellsMerge, 2)

    expect(result).toBe(true)
  })

  it('should return false if CellsMerge does not contain given row', () => {
    const result = CellsMerge.includesRow(testCellsMerge, 10)

    expect(result).toBe(false)
  })

  it('should return true if CellsMerge includes given row', () => {
    const result = CellsMerge.includesRow(testCellsMerge, 5)

    expect(result).toBe(true)
  })

  it('should return false if CellsMerge does not include both given row and column', () => {
    const result = CellsMerge.includes(testCellsMerge, 5, 10)

    expect(result).toBe(false)
  })

  it('should return true if CellsMerge includes both given row and column', () => {
    const result = CellsMerge.includes(testCellsMerge, 5, 2)

    expect(result).toBe(true)
  })

  it('should return true for a valid CellsMerge structure', () => {
    const result = CellsMerge.isValid(testCellsMerge)

    expect(result).toBe(true)
  })

  it('should return false for an invalid CellsMerge structure', () => {
    const invalidCellsMerge = new CellsMerge(2, 3, 0, 0)
    const result = CellsMerge.isValid(invalidCellsMerge)

    expect(result).toBe(false)
  })

  it('should return expected values for a transposed CellsMerge', () => {
    const testCellsMerge = new CellsMerge(2, 3, 4, 5)
    const result = CellsMerge.transpose(testCellsMerge)

    const expectedResult = new CellsMerge(3, 2, 5, 4)

    expect(result).toEqual(expectedResult)
  })
})
