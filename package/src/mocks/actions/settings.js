const storeSettings = jest.fn((settings) => ({
  type: 'MOCK_STORE_SETTINGS_ACTION',
  payload: settings
}))

const mockSettingsActions = {
  storeSettings
}

export {
  mockSettingsActions
}
