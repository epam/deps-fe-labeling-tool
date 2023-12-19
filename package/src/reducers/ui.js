import { handleActions } from 'redux-actions'
import {
  setMarkupObjectsFilter,
  setExpandedListKeys,
  toggleExpandedListKey,
  setActiveSidebar,
  addTemporaryFieldIndex,
  deleteTemporaryFieldIndex,
  setAssignToFieldsFilter,
  resetDefault
} from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'

const defaultState = {
  markupObjectsFilter: '',
  assignToFieldsFilter: '',
  expandedListKeys: [],
  activeSidebar: SidebarContent.MARKUP,
  temporaryFieldsIndexes: {}
}

const setMarkupObjectsFilterHandler = (state, action) => ({
  ...state,
  markupObjectsFilter: action.payload
})

const assignToFieldsFilterHandler = (state, action) => ({
  ...state,
  assignToFieldsFilter: action.payload
})

const setExpandedListKeysHandler = (state, action) => ({
  ...state,
  expandedListKeys: action.payload
})

const setActiveSidebarHandler = (state, action) => ({
  ...state,
  activeSidebar: action.payload
})

const toggleExpandedListKeyHandler = (state, action) => {
  const key = state.expandedListKeys.find((k) => k === action.payload)

  if (key) {
    return {
      ...state,
      expandedListKeys: state.expandedListKeys.filter((key) => key !== action.payload)
    }
  }

  return ({
    ...state,
    expandedListKeys: [...state.expandedListKeys, action.payload]
  })
}

const addTemporaryFieldIndexHandler = (state, action) => {
  const { code, index } = action.payload

  return {
    ...state,
    temporaryFieldsIndexes: {
      ...state.temporaryFieldsIndexes,
      [code]: state.temporaryFieldsIndexes[code]
        ? [...state.temporaryFieldsIndexes[code], index]
        : [index]
    }
  }
}

const deleteTemporaryFieldIndexHandler = (state, action) => {
  const { code, index } = action.payload
  const filteredIndexes = state.temporaryFieldsIndexes[code]?.filter((i) => i !== index)

  return filteredIndexes
    ? {
      ...state,
      temporaryFieldsIndexes: {
        ...state.temporaryFieldsIndexes,
        [code]: filteredIndexes
      }
    }
    : state
}

const resetDefaultHandler = () => defaultState

const uiReducerMap = new Map([
  [
    setMarkupObjectsFilter,
    setMarkupObjectsFilterHandler
  ],
  [
    setAssignToFieldsFilter,
    assignToFieldsFilterHandler
  ],
  [
    setExpandedListKeys,
    setExpandedListKeysHandler
  ],
  [
    toggleExpandedListKey,
    toggleExpandedListKeyHandler
  ],
  [
    setActiveSidebar,
    setActiveSidebarHandler
  ],
  [
    addTemporaryFieldIndex,
    addTemporaryFieldIndexHandler
  ],
  [
    deleteTemporaryFieldIndex,
    deleteTemporaryFieldIndexHandler
  ],
  [
    resetDefault,
    resetDefaultHandler
  ]
])

const uiReducer = handleActions(
  uiReducerMap,
  defaultState
)

export {
  uiReducer
}
