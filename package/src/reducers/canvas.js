import { handleActions } from 'redux-actions'
import { resetDefault, setZoom, setScale, setRotationAngle } from '@/actions/canvas'

const setZoomHandler = (state, action) => ({
  ...state,
  zoom: action.payload
})

const setScaleHandler = (state, action) => ({
  ...state,
  scale: action.payload
})

const resetDefaultHandler = () => (defaultState)

const setRotationAngleHandler = (state, action) => {
  const { page, angle } = action.payload
  return {
    ...state,
    rotationAngles: {
      ...state.rotationAngles,
      [page]: angle
    }
  }
}

const defaultState = {
  zoom: 1,
  rotationAngles: {}
}

const canvasReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      setZoom,
      setZoomHandler
    ],
    [
      setScale,
      setScaleHandler
    ],
    [
      setRotationAngle,
      setRotationAngleHandler
    ]
  ]),
  defaultState
)

export {
  canvasReducer
}
