import { createSelector } from 'reselect'
import { currentPageSelector } from './pagination'

const rootSelector = (state) => state.canvas

const zoomSelector = createSelector(
  [rootSelector],
  (canvasState) => canvasState.zoom
)

const scaleSelector = createSelector(
  [rootSelector],
  (canvasState) => canvasState.scale
)

const rotationAnglesSelector = createSelector(
  [rootSelector],
  (canvasState) => canvasState.rotationAngles
)

const pageRotationAngleSelector = createSelector(
  [rotationAnglesSelector, currentPageSelector],
  (rotationAngles, page) => rotationAngles[page]
)

export {
  zoomSelector,
  scaleSelector,
  rotationAnglesSelector,
  pageRotationAngleSelector
}
