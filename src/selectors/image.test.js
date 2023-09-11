import { imageSelector } from '@/selectors/image'

describe('Selectors: image', () => {
  const defaultState = {
    image: {
      width: 1,
      height: 1
    }
  }

  it('should get corect value from state when using imageSelector', () => {
    expect(imageSelector(defaultState)).toStrictEqual({ width: 1, height: 1 })
  })
})
