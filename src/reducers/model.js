import { handleActions } from 'redux-actions'
import {
  cancelDeleteFieldsMode,
  enableDeleteFieldsMode,
  resetDefault,
  storeFields,
  storeInitialFields,
  updateInitialFields,
  updateFieldsToDelete
} from '@/actions/model'

const storeFieldsHandler = (state, action) => ({
  ...state,
  fields: action.payload
})

const storeInitialFieldsHandler = (state, action) => ({
  ...state,
  initialFields: action.payload
})

const enableDeleteFieldsModeHandler = (state) => ({
  ...state,
  fieldsToDelete: []
})

const updateInitialFieldsHandler = (state) => ({
  ...state,
  initialFields: [...state.fields]
})

const updateFieldsToDeleteHandler = (state, action) => ({
  ...state,
  fieldsToDelete: [...state.fieldsToDelete, action.payload]
})

const cancelDeleteFieldsModeHandler = (state) => ({
  ...state,
  fieldsToDelete: undefined
})

const resetDefaultHandler = () => (defaultState)

const defaultState = {
  fieldsToDelete: undefined
}

const modelReducer = handleActions(
  new Map([
    [
      enableDeleteFieldsMode,
      enableDeleteFieldsModeHandler
    ],
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      storeFields,
      storeFieldsHandler
    ],
    [
      storeInitialFields,
      storeInitialFieldsHandler
    ],
    [
      updateInitialFields,
      updateInitialFieldsHandler
    ],
    [
      updateFieldsToDelete,
      updateFieldsToDeleteHandler
    ],
    [
      cancelDeleteFieldsMode,
      cancelDeleteFieldsModeHandler
    ]
  ]),
  defaultState
)

export {
  modelReducer
}
