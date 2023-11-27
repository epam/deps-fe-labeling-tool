const setZoom = jest.fn((zoom) => ({
  type: 'MOCK_SET_ZOOM_ACTION',
  payload: zoom
}))

const setScale = jest.fn((scale) => ({
  type: 'MOCK_SET_SCALE_ACTION',
  payload: scale
}))

const setRotationAngle = jest.fn((rotation) => ({
  type: 'MOCK_SET_ROTATION_ANGLE',
  payload: rotation
}))

const mockCanvasActions = {
  setZoom,
  setScale,
  setRotationAngle
}

export {
  mockCanvasActions
}
