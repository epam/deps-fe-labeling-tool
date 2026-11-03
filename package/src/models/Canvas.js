import PropTypes from 'prop-types'

export const canvasShape = PropTypes.shape({
  add: PropTypes.func,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.shape({
    set: PropTypes.func
  }),
  defaultCursor: PropTypes.string,
  discardActiveObject: PropTypes.func,
  findTarget: PropTypes.func,
  fire: PropTypes.func,
  getActiveObject: PropTypes.func,
  getActiveObjects: PropTypes.func,
  getCenterPoint: PropTypes.func,
  getHeight: PropTypes.func,
  getObjects: PropTypes.func,
  getScenePoint: PropTypes.func,
  getWidth: PropTypes.func,
  getZoom: PropTypes.func,
  height: PropTypes.number,
  off: PropTypes.func,
  on: PropTypes.func,
  remove: PropTypes.func,
  renderAll: PropTypes.func,
  requestRenderAll: PropTypes.func,
  selection: PropTypes.bool,
  sendObjectToBack: PropTypes.func,
  setActiveObject: PropTypes.func,
  setCursor: PropTypes.func,
  setDimensions: PropTypes.func,
  setViewportTransform: PropTypes.func,
  setZoom: PropTypes.func,
  viewportTransform: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number,
  zoom: PropTypes.number,
  zoomToPoint: PropTypes.func
})
