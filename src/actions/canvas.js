import { createAction } from 'redux-actions'

const FEATURE_NAME = 'CANVAS'

const setZoom = createAction(
  `${FEATURE_NAME}/SET_ZOOM`
)

const setRotationAngle = createAction(
  `${FEATURE_NAME}/SET_ROTATION_ANGLE`,
  (page, angle) => ({
    page,
    angle
  })
)

const setScale = createAction(
  `${FEATURE_NAME}/SET_SCALE`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  resetDefault,
  setZoom,
  setScale,
  setRotationAngle
}
