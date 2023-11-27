import { toFixedNumber } from '@/utils/number'

describe('util: number', () => {
  const number = 15.25639893210259
  const expectNumber = 15.2563989321
  const expectNumberWithFourDigits = 15.2564

  it('should return expect value', () => {
    expect(toFixedNumber(number)).toBe(expectNumber)
    expect(toFixedNumber(number, 4)).toBe(expectNumberWithFourDigits)
  })
})
