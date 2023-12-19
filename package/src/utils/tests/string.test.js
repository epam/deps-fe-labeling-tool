import { replaceAll } from '@/utils/string'

describe('util: string', () => {
  it('should return expect value', () => {
    const inputString = 'Are you sure you want to delete {0} objects?'
    const args = 45
    const outputString = `Are you sure you want to delete ${args} objects?`
    expect(replaceAll(inputString, args)).toBe(outputString)
  })

  it('should return value with two changes', () => {
    const inputString = 'Are you sure you want to delete {0} objects and {1} object'
    const arg1 = 10
    const arg2 = 20
    const outputString = `Are you sure you want to delete ${arg1} objects and ${arg2} object`
    expect(replaceAll(inputString, arg1, arg2)).toBe(outputString)
  })
})
