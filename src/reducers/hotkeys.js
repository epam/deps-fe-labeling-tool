import { handleActions } from 'redux-actions'
import { registerHotKeyEvents, resetDefault } from '@/actions/hotkeys'

const defaultState = []

const resetDefaultHandler = () => (defaultState)

const registerHotKeyEventsHandler = (state, action) => ([
  ...new Set(
    [
      ...state,
      ...action.payload
    ]
  )
])

const hotKeysReducer = handleActions(
  new Map([
    [
      registerHotKeyEvents,
      registerHotKeyEventsHandler
    ],
    [
      resetDefault,
      resetDefaultHandler
    ]
  ]),
  defaultState
)

export {
  hotKeysReducer
}
