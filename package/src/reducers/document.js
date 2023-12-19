import { handleActions } from 'redux-actions'
import { resetDefault, storeDocument } from '@/actions/document'

const defaultState = {
  pages: [],
  language: null,
  name: '',
  engine: '',
  extraName: ''
}

const resetDefaultHandler = () => (defaultState)

const storeDocumentHandler = (state, action) => action.payload

const documentReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      storeDocument,
      storeDocumentHandler
    ]
  ]),
  defaultState
)

export {
  documentReducer
}
