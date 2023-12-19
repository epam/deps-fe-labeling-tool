
import dayjs from 'dayjs'
import { toLocalizedDateString } from './dayjs'

const date = '2020-04-21T07:51:32.844606+00:00'
const expectedDate = dayjs(date).format('L')
const expectedTime = dayjs(date).format('LT')

describe('Utils: Day.js', () => {
  beforeAll(() => {
    jest.spyOn(dayjs, 'locale').mockImplementation()
  })

  it('should return empty string if date is not provided', () => {
    expect(toLocalizedDateString('')).toEqual('')
  })

  it('should return empty string if invalid string passed instead of date', () => {
    expect(toLocalizedDateString('some invalid string')).toEqual('')
  })

  it('should return date and time if withTime is true', () => {
    expect(toLocalizedDateString(date, true)).toEqual(`${expectedDate}, ${expectedTime}`)
  })

  it('should return date only if withTime is not set', () => {
    expect(toLocalizedDateString(date)).toEqual(expectedDate)
  })

  it('should return date only if withTime is false', () => {
    expect(toLocalizedDateString(date)).toEqual(expectedDate)
  })
})
