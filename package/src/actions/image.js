import { createAction } from 'redux-actions'

const FEATURE_NAME = 'IMAGE'

const setImage = createAction(
  `${FEATURE_NAME}/SET_IMAGE`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  resetDefault,
  setImage
}
