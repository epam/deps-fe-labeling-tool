import { Settings } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'

describe('Selectors: settings', () => {
  const defaultState = {
    settings: new Settings()
  }

  it('should get current settings from state when using settingsSelector', () => {
    expect(settingsSelector(defaultState)).toBe(defaultState.settings)
  })
})
