import { Rectangle } from '@/models/Rectangle'
import { toFixedNumber } from '@/utils/number'

/**
 * Fabric getScaledWidth and getScaledHeight return the object bigger that expected because they include strokeWidth in size calculations.
 * Currently all objects are hardcoded with strokeWidth equal to 1, so just subtracting 1 from width and height.
 * More robust solution that will account for the border size is required.
 */
const FABRIC_SIZE_CORRECTION = 1

/**
 * Fabric uses scale multiplier in order to change the size of the cell.
 * If we will set cell width/height as 0 as the result of our calculations,
 * then fabric will not be able to resize it anymore because no matter the scale, width/height * scale is 0.
 * Use this value instead of 0 if you need to set min object width/height.
 */
const FABRIC_MIN_SIZE = 1

const DEFAULT_INITIAL_SCALE = 1

/**
 * Sets FABRIC_MIN_SIZE to the width or height if cell size is smaller than FABRIC_MIN_SIZE.
 * Modifies the cell that was provided into the function.
 * @param {any} obj - object with w and h props that might need adjustment.
 * @returns {any} modified object that was accepted as an argument.
 */
const ensureMinSize = (obj) => {
  if (!obj) {
    return
  }

  obj.w = obj.w < FABRIC_MIN_SIZE ? FABRIC_MIN_SIZE : obj.w
  obj.h = obj.h < FABRIC_MIN_SIZE ? FABRIC_MIN_SIZE : obj.h
}

/**
 * Goes thought the array of the currently active objects and returns data prop from each of them.
 * @param {fabric.Canvas} canvas - fabric canvas.
 * @returns {Array<any>} array of the data prop values assigned to the active objects.
 */
const getActiveDataObjects = (canvas) => (
  canvas.getActiveObjects()
    .filter((ao) => !!ao.data)
    .map((ao) => ao.data)
)

/**
 * Returns position and size of the object before scaling.
 * @param {fabric.IEvent} opts fabric event options.
 * @returns {Rectangle} rectangle that represents position and size of the object.
 */
const getPositionAndSizeBeforeScaling = (opts) => {
  const { top, left } = opts.transform.original
  const { width, height } = opts.transform.target
  return new Rectangle(left, top, width, height)
}

/**
 * Returns an absolute canvas position (from canvas x:0, y:0) of the object on the canvas event if it's inside the group.
 * When object is inside the group, fabric calculates object position from the center of the group by default.
 * In theory, object can be inside of the multiple groups/selections. In such case this method should be re-written to be recursive.
 * @param {fabric.Object} target - object, absolute position of which should be returned.
 * @returns {{ x: number, y: number }}} point like object that represent absolute canvas position.
 */
const getAbsoluteCanvasPosition = (target) => {
  const x = target.x || target.left
  const y = target.y || target.top

  const group = target.group
  if (!group) {
    return {
      x,
      y
    }
  }

  const center = group.getCenterPoint()
  return {
    x: center.x + x,
    y: center.y + y
  }
}

/**
 * Returns group relative coordinates (from group center x, y) if the representation of the object on canvas is grouped.
 * When we're trying to update the position of some already rendered object on the canvas, we need to account for the fact, that already rendered object may be grouped.
 * This function takes an object, that came from store as its first argument and fabric object representation (already rendered object) as its second argument.
 * If second argument is not grouped, we just return position of the first argument. If second argument is grouped - we adjust position of the first argument,
 * so it will account for its being grouped on the canvas.
 * @param {any} object - object that came from store and we need to update its rendered counterpart on the canvas.
 * @param {fabric.Object} objectOnCanvas - rendered counterpart of the first argument on the canvas.
 * @returns {{ x: number, y: number }}} point like object that represent position to set for rendered counterpart.
 */
const getGroupRelativePosition = (point, group) => {
  const { x, y } = point
  if (!group) {
    return {
      x,
      y
    }
  }

  const center = group.getCenterPoint()
  return {
    x: x - center.x,
    y: y - center.y
  }
}

/**
 * When fabric resizes object it actually leaves the width/height of the object untouched and modifies scaleX and scaleY properties of the object.
 * For the simplification of the calculations we can use this method to "applyScale" which will calculate scaled width/height of the object and will reset the scale to initial scale.
 * @param {fabric.Object} target - object, that should have its scale converted to the width/height.
 * @returns {fabric.Object} updated object.
 */
const applyScale = (target) => {
  if (target.scaleX !== DEFAULT_INITIAL_SCALE) {
    let width = target.getScaledWidth() - FABRIC_SIZE_CORRECTION
    width = width < FABRIC_MIN_SIZE ? FABRIC_MIN_SIZE : width
    target.set({
      width,
      scaleX: DEFAULT_INITIAL_SCALE
    })
  }

  if (target.scaleY !== DEFAULT_INITIAL_SCALE) {
    let height = target.getScaledHeight() - FABRIC_SIZE_CORRECTION
    height = height < FABRIC_MIN_SIZE ? FABRIC_MIN_SIZE : height
    target.set({
      height,
      scaleY: DEFAULT_INITIAL_SCALE
    })
  }

  return target.setCoords()
}

/**
 * Saves current active selection on the canvas and returns callback to restore original selection.
 * Useful if we want to mess with current selection and then return it back.
 * @param {fabric.Canvas} canvas - fabric canvas object.
 * @returns {Function} that can be used to restore the selection. Could be undefined if there where no selection when calling saveSelection.
 */
const saveSelection = (canvas) => {
  let ao = canvas.getActiveObject()
  if (!ao) {
    return
  }

  ao.on('removed', () => {
    ao = null
  })

  return () => {
    ao && canvas.setActiveObject(ao)
  }
}

/**
 * Removes all selection events from the target, executes provided callback and then restores selection events back.
 * Useful if we want to mess with selection without notifying others that something was going on.
 * Access private fabric variable, but thats the only what I found and fabric uses stuff like this under its hood.
 * @param {fabric.Object} target - objects that should have its selection events suppressed.
 * @param {Function} callback - sync function to execute before selection should be restored.
 */
const withSuppressedSelectionEvents = (target, callback) => {
  const created = target.__eventListeners['selection:created']
  const updated = target.__eventListeners['selection:updated']
  const cleared = target.__eventListeners['selection:cleared']
  target.__eventListeners['selection:created'] = []
  target.__eventListeners['selection:updated'] = []
  target.__eventListeners['selection:cleared'] = []
  callback()
  target.__eventListeners['selection:created'] = created
  target.__eventListeners['selection:updated'] = updated
  target.__eventListeners['selection:cleared'] = cleared
}

/**
 * Returns true if x/left and y/top value of the provided objects are equal to each other.
 * @param {Rectangle || fabric.Object} left - left fabric.Object or Rectangle for comparison.
 * @param {Rectangle || fabric.Object} right - right fabric.Object or Rectangle for comparison.
 * @returns {boolean} flag that indicates if two objects are in the same spot.
 */
const atSameSpot = (left, right) => {
  const leftX = left.x || left.left
  const leftY = left.y || left.top
  const rightX = right.x || right.left
  const rightY = right.y || right.top
  return (
    toFixedNumber(leftX) === toFixedNumber(rightX) &&
    toFixedNumber(leftY) === toFixedNumber(rightY)
  )
}

/**
 * Returns true if w/width and h/height value of the provided objects are equal to each other.
 * @param {Rectangle || fabric.Object} left - left fabric.Object or Rectangle for comparison.
 * @param {Rectangle || fabric.Object} right - right fabric.Object or Rectangle for comparison.
 * @returns {boolean} flag that indicates if two objects has the same size.
 */
const hasSameSize = (left, right) => {
  const leftW = left.w || left.width
  const leftH = left.h || left.height
  const rightW = right.w || right.width
  const rightH = right.h || right.height
  return (
    toFixedNumber(leftW) === toFixedNumber(rightW) &&
    toFixedNumber(leftH) === toFixedNumber(rightH)
  )
}

/**
 * Disables rotation controls for provided objects
 * @param { fabric.Object } object - object for disable rotation controls
 */
const disableRotationControls = (object) => {
  object.setControlsVisibility({
    mtr: false
  })
}

export {
  FABRIC_MIN_SIZE,
  ensureMinSize,
  getActiveDataObjects,
  applyScale,
  getPositionAndSizeBeforeScaling,
  getAbsoluteCanvasPosition,
  getGroupRelativePosition as getPositionInsideGroup,
  saveSelection,
  withSuppressedSelectionEvents,
  atSameSpot,
  hasSameSize,
  disableRotationControls
}
