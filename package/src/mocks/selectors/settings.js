import { Settings } from '@/models/Settings'

const settingsSelector = jest.fn(() => new Settings())

const mockSettingsSelectors = {
  settingsSelector
}

export {
  mockSettingsSelectors
}
