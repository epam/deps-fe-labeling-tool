import { handleActions } from 'redux-actions'
import { resetDefault, openPage } from '@/actions/pagination'

const defaultState = {
  currentPage: 1
}

const openPageHandler = (state, action) => ({
  ...state,
  currentPage: action.payload
})

const resetDefaultHandler = () => (defaultState)

const paginationReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      openPage,
      openPageHandler
    ]
  ]),
  defaultState
)

export {
  paginationReducer
}
