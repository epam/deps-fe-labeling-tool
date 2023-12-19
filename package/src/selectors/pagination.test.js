import { currentPageSelector } from '@/selectors/pagination'

describe('Selectors: pagination', () => {
  const defaultState = {
    pagination: {
      currentPage: 2
    }
  }

  it('should get labels from state when using labelsSelector', () => {
    expect(currentPageSelector(defaultState)).toBe(2)
  })
})
