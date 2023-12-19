import { isCompilationFeatureEnabled } from '@/utils/compilation'

describe('util: compilation', () => {
  beforeAll(() => {
    global.FEATURES = ['one', 'two', 'three']
  })

  afterAll(() => {
    delete global.FEATURES
  })

  it('should return true if feature is in list', () => {
    expect(isCompilationFeatureEnabled('one')).toBe(true)
  })

  it('should return false if feature is not in list', () => {
    expect(isCompilationFeatureEnabled('four')).toBe(false)
  })
})
