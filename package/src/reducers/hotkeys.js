import { handleActions } from 'redux-actions'
import { registerHotKeyEvents, resetDefault } from '@/actions/hotkeys'
import { HotKeyEvent } from '@/constants/hotKeys'

const defaultState = [HotKeyEvent.ZOOM.name]

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
