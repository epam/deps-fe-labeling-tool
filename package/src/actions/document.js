import { createAction } from 'redux-actions'

const FEATURE_NAME = 'DOCUMENT'

const storeDocument = createAction(`${FEATURE_NAME}/STORE`)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  resetDefault,
  storeDocument
}
