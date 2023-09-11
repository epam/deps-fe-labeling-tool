import { handleActions } from 'redux-actions'
import { resetDefault, storeSettings } from '@/actions/settings'

const storeSettingsHandler = (state, action) => ({
  ...state,
  ...action.payload
})

const resetDefaultHandler = () => defaultState

const defaultState = {}

const settingsReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      storeSettings,
      storeSettingsHandler
    ]
  ]),
  defaultState
)

export {
  settingsReducer
}
