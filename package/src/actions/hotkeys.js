import { createAction } from 'redux-actions'

const FEATURE_NAME = 'HOT_KEYS'

const registerHotKeyEvents = createAction(
  `${FEATURE_NAME}/ADD_HOT_KEY_EVENTS`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  registerHotKeyEvents,
  resetDefault
}
