import { handleActions } from 'redux-actions'
import { resetDefault, requestAttempt, requestSuccess, requestFailure } from '@/actions/api'

const requestAttemptHandler = (state, action) => {
  return ({
    ...state,
    pending: state.pending.concat(action.payload)
  })
}

const requestSuccessHandler = (state, action) => ({
  ...state,
  pending: state.pending.filter((id) => id !== action.payload)
})

const requestFailureHandler = (state, action) => ({
  ...state,
  pending: state.pending.filter((id) => id !== action.payload.requestId),
  errors: state.errors.concat(action.payload)
})

const defaultState = {
  pending: [],
  errors: []
}

const resetDefaultHandler = () => (defaultState)

const apiReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      requestAttempt,
      requestAttemptHandler
    ],
    [
      requestSuccess,
      requestSuccessHandler
    ],
    [
      requestFailure,
      requestFailureHandler
    ]
  ]),
  defaultState
)

export {
  apiReducer
}
