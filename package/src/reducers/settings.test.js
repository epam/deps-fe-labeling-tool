import { mockAction } from '@/mocks/mockAction'
import { resetDefault, storeSettings } from '@/actions/settings'
import { Settings } from '@/models/Settings'
import { settingsReducer } from '@/reducers/settings'

const MOCK_SETTINGS = new Settings()

describe('Reducer: settings', () => {
  let defaultState

  beforeEach(() => {
    defaultState = settingsReducer(defaultState, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(settingsReducer({}, action)).toEqual(defaultState)
  })

  it('should handle selectTool action correctly', () => {
    const action = storeSettings(MOCK_SETTINGS)

    expect(settingsReducer(defaultState, action)).toEqual({
      ...defaultState,
      ...MOCK_SETTINGS
    })
  })
})
