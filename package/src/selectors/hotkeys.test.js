import { hotKeysSelector } from '@/selectors/hotkeys'

describe('Selectors: hotkeys', () => {
  const defaultState = {
    document: 'some document',
    hotKeys: [
      'DELETE',
      'COPY'
    ]
  }

  it('should get labels from state when using labelsSelector', () => {
    expect(
      hotKeysSelector(defaultState)
    ).toEqual(
      defaultState.hotKeys
    )
  })
})
