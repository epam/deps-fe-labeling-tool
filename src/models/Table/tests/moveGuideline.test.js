import { moveGuideline } from '@/models/Table/moveGuideline'

describe('Table model: moveGuideline', () => {
  it('should successfully update an array of guidelines', () => {
    const guidelines = [0.4, 0.55, 0.61]
    const result = moveGuideline(guidelines, [], 0.4, 0.5)

    expect(result).toEqual([0.5, 0.55, 0.61])
  })

  it('should return the same array of guidelines if prevPos and newPos are equal', () => {
    const guidelines = [0.4, 0.55, 0.61]
    const result = moveGuideline(guidelines, [], 0.4, 0.4)

    expect(result).toEqual(guidelines)
  })

  it('should return the same array of guidelines if prevPos does not exist in guidelines', () => {
    const guidelines = [0.4, 0.55, 0.61]
    const result = moveGuideline(guidelines, [], 0.312, 0.4)

    expect(result).toEqual(guidelines)
  })

  it('should respect bounds if desired position breaks overflow limit', () => {
    const guidelines = [0.4, 0.55, 0.61]
    const result = moveGuideline(guidelines, [0.2, 0.5], 0.312, 0.1)

    expect(result).toEqual(guidelines)
  })
})
