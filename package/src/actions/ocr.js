import { createAction } from 'redux-actions'

const FEATURE_NAME = 'OCR'

const storeOcr = createAction(`${FEATURE_NAME}/STORE_OCR`)

const setPrimaryEngine = createAction(`${FEATURE_NAME}/SET_PRIMARY_ENGINE`)

const setPrimaryLanguage = createAction(`${FEATURE_NAME}/SET_PRIMARY_LANGUAGE`)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  resetDefault,
  setPrimaryEngine,
  setPrimaryLanguage,
  storeOcr
}
