import { handleActions } from 'redux-actions'
import {
  resetDefault,
  selectTool
} from '@/actions/tools'
import { Tool } from '@/enums/Tool'

const defaultState = {
  selectedTool: Tool.POINTER
}

const selectToolHandler = (state, action) => ({
  ...state,
  selectedTool: action.payload
})

const resetDefaultHandler = () => (defaultState)

const toolsReducerMap = new Map([
  [
    resetDefault,
    resetDefaultHandler
  ],
  [
    selectTool,
    selectToolHandler
  ]
])

const toolsReducer = handleActions(
  toolsReducerMap,
  defaultState
)

export {
  toolsReducer
}
