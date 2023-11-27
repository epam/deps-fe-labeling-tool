import { fabric } from 'fabric'

const MOUSE_HOVERING_DELAY = 100

/**
 * Table class for the the fabric.js that is based on the fabric.Group.
 *
 * Implements custom logic to register mouseover event.
 *
 * While working with a fabric native event, I've noticed two problems:
 * - when the mouse is moving really fast, there are cases when mouseover event is being fired for the group,
 * but no mouseover/mouseout is fired on any of the table cells inside that group.
 * - group visually is 2 px wider and higher than rectangles that are inside that group (because of the outline),
 * meaning, native mouseover event can be fired when mouse is not over any of the cells.
 * Our table update logic relies on the idea that, if the mouseover event is fired for the group,
 * that means that mouse is over some of the cells as well.
 *
 * This code aims to provide custom mouseover event, that is fired if the user is inside physical table dimensions and hovers his mouse for some time.
 */
const FabricTable = fabric.util.createClass(fabric.Group, {
  type: 'table',
  /**
   * Initializes fabric group
   *
   * Registers mousemove events on the canvas to track mouse position
   * Registers mouseup and mousedown events to ignore mouseover when user presses LMB and builds a selection
   *
   * @param {Array<fabric.Rect>} rectangles - Array of the table cells that should be grouped
   * @param {fabric.IGroupOptions} options - Options for the fabric group. Canvas object is required
   */
  initialize: function (rectangles, options) {
    const { canvas } = options
    this.onCanvasMouseMove = this.onCanvasMouseMove.bind(this)
    this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this)
    this.onCanvasMouseUp = this.onCanvasMouseUp.bind(this)
    this.onCanvasMouseMoveOutside = this.onCanvasMouseMoveOutside.bind(this)
    this.onCanvasMouseMoveInside = this.onCanvasMouseMoveInside.bind(this)
    canvas.on('mouse:move', this.onCanvasMouseMove)
    canvas.on('mouse:down', this.onCanvasMouseDown)
    canvas.on('mouse:up', this.onCanvasMouseUp)
    this.on('removed', () => {
      canvas.off('mouse:move', this.onCanvasMouseMove)
      canvas.off('mouse:down', this.onCanvasMouseDown)
      canvas.off('mouse:up', this.onCanvasMouseUp)
    })
    fabric.Group.prototype.initialize.apply(this, arguments)
  },
  /**
   * Returns coordinates of the top left point.
   *
   * @param {Array<FabricCell>} objects - array of the object to search through.
   * @return {{x: number, y: number}} coordinates of the point.
   */
  getP1Coords: function (objects) {
    const x = objects.map((object) => object.aCoords.tl.x)
    const y = objects.map((object) => object.aCoords.tl.y)
    return {
      x: Math.min(...x),
      y: Math.min(...y)
    }
  },
  /**
   * Returns coordinates of the bottom right point.
   *
   * @param {Array<FabricCell>} objects - array of the object to search through.
   * @return {{x: number, y: number}} coordinates of the point.
   */
  getP2Coords: function (objects) {
    const x = objects.map((object) => object.aCoords.br.x)
    const y = objects.map((object) => object.aCoords.br.y)
    return {
      x: Math.max(...x),
      y: Math.max(...y)
    }
  },
  /**
   * Checks if the mouse is over the table and there are no other objects that are in front of it.
   *
   * @return {boolean} Result of the check
   */
  isMouseInside: function () {
    const objects = this.getObjects()
    if (
      !objects ||
      !objects.length
    ) {
      return false
    }

    const { x: x1, y: y1 } = this.getP1Coords(objects)
    const { x: x2, y: y2 } = this.getP2Coords(objects)
    const { x, y } = this.opts.absolutePointer

    const target = this.canvas && this.canvas.findTarget(this.opts.e)
    return (
      x > x1 &&
      x < x2 &&
      y > y1 &&
      y < y2 &&
      target === this
    )
  },
  onCanvasMouseDown: function () {
    this.mouseDown = true
  },
  onCanvasMouseUp: function () {
    this.mouseDown = false
  },
  /**
   * Clears the flag that indicates that mouse currently is inside the group.
   *
   * @return {boolean} Result of the check
   */
  onCanvasMouseMoveOutside: function () {
    this.notifiedInside = false
  },
  /**
   * Sets up a timer when mouse has entered area inside the group if mouse is not already inside.
   * When timer elapses, checks if the mouse is still inside the table and if there is no left mouse button pressed.
   * Notifies listeners that mouse is over the table and sets the flag that prevents multiple mouseover events being fired.
   */
  onCanvasMouseMoveInside: function () {
    if (this.mouseInsideTimeout || this.notifiedInside) {
      return
    }

    this.mouseInsideTimeout = setTimeout(() => {
      this.mouseInsideTimeout = 0
      if (this.isMouseInside() && !this.mouseDown) {
        this.notifiedInside = true
      }
    }, MOUSE_HOVERING_DELAY)
  },
  /**
   * Stores latest mouse options for the usage in the isMouseInside method.
   * Checks if the mouse is inside the group or outside and splits the code into two methods.
   */
  onCanvasMouseMove: function (opts) {
    this.opts = opts
    if (this.isMouseInside()) {
      this.onCanvasMouseMoveInside()
    } else {
      this.onCanvasMouseMoveOutside()
    }
  },
  /**
   * Monkey patches default group on method.
   * Stores listeners of the mouseover event in the custom listeners array.
   * Fallbacks to the default fabric methods for any other events.
   *
   * @param {string} eventName - name of the event to subscribe for
   * @param {*} handler - handler of the event.
   */
  on: function (eventName, handler) {
    return fabric.Group.prototype.on.call(this, eventName, handler)
  },
  /**
   * Monkey patches default group off methods.
   * Removes listeners of the mouseover event from the custom listeners array.
   * Fallbacks to the default fabric methods for any other events.
   *
   * @param {string} eventName - name of the event to subscribe for.
   * @param {*} handler - handler of the event.
   */
  off: function (eventName, handler) {
    return fabric.Group.prototype.on.call(this, eventName, handler)
  }
})

export {
  FabricTable
}
