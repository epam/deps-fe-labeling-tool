import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { openMenu } from '@/components/ContextMenu'
import { MouseButton } from '@/enums/MouseButton'
import { canvasShape } from '@/models/Canvas'
import { Option } from '@/models/Option'
import { Rectangle } from '@/models/Rectangle'
import * as Table from '@/models/Table'
import { Cell } from '@/models/Table/Cell'
import { COLORS } from '@/theme/theme.default'
import {
  atSameSpot,
  applyScale,
  getPositionAndSizeBeforeScaling,
  getAbsoluteCanvasPosition,
  saveSelection,
  withSuppressedSelectionEvents,
  disableRotationControls
} from '@/utils/fabric'
import { FabricCell } from './FabricCell'
import { FabricTable } from './FabricTable'

const MenuOption = {
  ADD_ROW: 'add-row',
  ADD_COLUMN: 'add-column',
  DELETE_ROW: 'delete-row',
  DELETE_COLUMN: 'delete-column'
}

const RESOURCE_MENU_OPTION = {
  [MenuOption.ADD_ROW]: 'Add row',
  [MenuOption.ADD_COLUMN]: 'Add column',
  [MenuOption.DELETE_ROW]: 'Delete row',
  [MenuOption.DELETE_COLUMN]: 'Delete column'
}

const { tableShape, CELL_TYPE_NAME } = Table

// TODO: #583
class CanvasTableDefault extends PureComponent {
  static propTypes = {
    canvas: canvasShape.isRequired,
    table: tableShape.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selectable: PropTypes.bool,
    scale: PropTypes.number.isRequired,
    image: PropTypes.PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  }

  /**
   * Locks scaling of the rectangle by setting its width and height to the values before the scale.
   * This is useful for the alternative table borders move logic.
   * @param {*} target - cell that is currently being resized.
   * @param {*} before - object that stores dimension of the cell before scaling.
   * @returns {boolean} result of the check.
   */
  lockResize = (target, before) => {
    !atSameSpot(target, before) && target.set({
      width: before.w,
      height: before.h
    }).setCoords()
  }

  /**
   * Checks if current target is table cell and belongs to the table passed via props.
   * @param {*} target - target to check.
   * @param {*} table - table, that should include target cell.
   * @returns {boolean} result of the check.
   */
  isTableCell = (target, table) => (
    target &&
    target.data &&
    target.data.typeName === CELL_TYPE_NAME &&
    target.data.table.uid === table.uid
  )

  /**
   * Checks if current target is a table, that is rendered by current instance of the CanvasTable.
   * @param {*} target - target to check.
   * @param {*} table - table, that should include target cell.
   * @returns {boolean} result of the check.
   */
  isTable = (target, table) => (
    target &&
    target.data &&
    target.data.uid === table.uid
  )

  /**
   * Checks if currently selected object is the table rendered by current instance of CanvasTable.
   * @param {Table} table - instance of the table status of which we want to know.
   * @returns {Table} table if it is selected or null otherwise.
   */
  getSelectedTable = (table) => {
    const ao = this.canvas.getActiveObject()
    const selectedTable = ao && ao.data && ao.data.uid === table.uid
    return selectedTable ? table : null
  }

  /**
   * Checks if currently selected object is the rendered table cell.
   * @param {Table} table - instance of the table with the cell that we're looking for.
   * @returns {Cell} cell from the provided table if it is selected or null otherwise.
   */
  getSelectedCell = (table) => {
    const ao = this.canvas.getActiveObject()
    const isCellSelected = ao && ao.data && ao.data.typeName === CELL_TYPE_NAME
    if (!isCellSelected || ao.data.table.uid !== table.uid) {
      return
    }

    return ao.data
  }

  getTableColor = () => {
    const [borderColor, backgroundColor] = this.props.table.fieldCode !== ''
      ? [COLORS.LABEL_TABLE_BORDER, COLORS.LABEL_TABLE_BACKGROUND]
      : [COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER, COLORS.MARKUP_OBJECT_UNASSIGNED_BACKGROUND]

    return {
      borderColor,
      backgroundColor
    }
  }

  /**
   * Search for the provided table among elements that are rendered on the canvas.
   * @param {*} table - table to search for.
   * @returns {FabricTable} fabric object that represents table on the canvas.
   */
  getRenderedGroup = (table) => (
    this.props.canvas.getObjects().find((obj) => (
      obj.data && obj.data.uid === table.uid
    ))
  )

  /**
   * Ungroups table if its not selected and fires cell onMouseOver event.
   * Saves current canvas selection to restore it when mouse will leave the table
   * (in case user just hovers/flyby above the table without clicking on it)
   * @param {fabric.IEvent} - opts fabric event options.
   */
  onTableMouseOver = (opts) => {
    if (!this.props.selectable) {
      return
    }

    const ao = this.canvas.getActiveObject()
    if (this.isTable(ao, this.props.table)) {
      return
    }

    this.restoreSelection = saveSelection(this.canvas)
    this.ungroupTable(this.props.table)

    const target = this.canvas.findTarget(opts.e)
    this.onCellMouseOver({ target })
  }

  /**
   * Table mouse uo event handler.
   * @param {fabric.IEvent} opts - fabric event options.
   */
  onTableMouseUp = (opts) => {
    if (opts.button !== MouseButton.RIGHT) {
      return
    }

    this.ungroupTable(this.props.table)
    this.clearSelection()
    const context = this.canvas.findTarget(opts.e)
    this.openContextMenu(opts.e, context)
  }

  /**
   * Activates current cell if its not already active without notifying any selection events listeners.
   * Fabric doesn't allow us to resize the objects that are not active.
   * If we want to give user one-click to resize experience, we need activate cell ourselves.
   * In the same time, we don't fire any selection events, because no object is being selected by the user.
   * @param {fabric.IEvent} - opts fabric event options.
   */
  onCellMouseOver = (opts) => {
    const ao = this.canvas.getActiveObject()
    const active = ao === opts.target
    if (active) {
      return
    }

    this.getRenderedRectangles(this.props.table).forEach((cell) => {
      cell.fill = COLORS.TRANSPARENT
    })

    opts.target.fill = COLORS.SELECTION

    withSuppressedSelectionEvents(this.canvas, () => {
      opts.target && this.canvas.setActiveObject(opts.target)
    })

    this.canvas.requestRenderAll()
  }

  /**
   * Groups rectangles back to the table when mouse leave the cell if the next target is not another table cell from the current table.
   * If mouse leaves table cells tries to restore selection that was stored during group mouseover event.
   * @param {fabric.IEvent} - opts fabric event options.
   */
  onCellMouseOut = (opts) => {
    const { backgroundColor } = this.getTableColor()

    this.getRenderedRectangles(this.props.table).forEach((cell) => {
      cell.fill = backgroundColor
    })

    if (this.isTableCell(opts.nextTarget, this.props.table)) {
      return
    }

    this.groupTable(this.props.table)

    if (this.restoreSelection) {
      withSuppressedSelectionEvents(this.canvas, () => {
        this.restoreSelection()
      })

      this.restoreSelection = null
    }
  }

  /**
   * If user clicks on any cells inside the table, just clear the callback created inside onTableMouseOver and fire selection cleared.
   */
  onCellMouseDown = () => {
    if (this.restoreSelection) {
      this.restoreSelection = null
      this.clearSelection()
    }
  }

  /**
   * Handler for the context menu option selection.
   * @param {string} option - context menu option value that was clicked.
   * @param {FabricCell} context - context menu context.
   */
  onContextMenuSelection = (option, context) => {
    const [{ x: x1, y: y1 }, { x: x2, y: y2 }] = Cell.getPoints(context.data)
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)

    let updatedTable
    switch (option) {
      case MenuOption.ADD_ROW:
        updatedTable = Table.addRow(absolutePropsTable, y2)
        break
      case MenuOption.ADD_COLUMN:
        updatedTable = Table.addColumn(absolutePropsTable, x2)
        break
      case MenuOption.DELETE_ROW:
        updatedTable = Table.deleteRow(absolutePropsTable, y1, y2)
        break
      case MenuOption.DELETE_COLUMN:
        updatedTable = Table.deleteColumn(absolutePropsTable, x1, x2)
    }

    updatedTable = Table.toRelative(updatedTable, this.props.scale, this.props.image)

    this.props.onUpdate(updatedTable)
  }

  /**
   * Opens context menu with table context menu options.
   * @param {amy} e - mouse click event.
   * @param {FabricCell} context - context for the context menu.
   */
  openContextMenu = (e, context) => {
    const { rows, columns } = Table.getDimensions(this.props.table)

    openMenu(
      e.clientX,
      e.clientY,
      [
        new Option(MenuOption.ADD_ROW, RESOURCE_MENU_OPTION[MenuOption.ADD_ROW]),
        new Option(MenuOption.ADD_COLUMN, RESOURCE_MENU_OPTION[MenuOption.ADD_COLUMN]),
        new Option(MenuOption.DELETE_ROW, RESOURCE_MENU_OPTION[MenuOption.DELETE_ROW], rows === 1),
        new Option(MenuOption.DELETE_COLUMN, RESOURCE_MENU_OPTION[MenuOption.DELETE_COLUMN], columns === 1)
      ],
      context,
      this.onContextMenuSelection
    )
  }

  /**
   * Table cell mouse up event handler.
   * @param {fabric.IEvent} - opts fabric event options
   */
  onCellMouseUp = (opts) => {
    if (opts.button !== MouseButton.RIGHT) {
      return
    }

    this.openContextMenu(opts.e, opts.target)
  }

  /**
   * Ungroups table cells into individual rectangles and removes the group from the canvas.
   * Does this without notifying that selection was cleared if group was selected.
   * Adds individuals rectangles to the canvas.
   * @param {FabricTable} table that should be ungrouped.
   */
  ungroupTable = (table) => {
    const group = this.getRenderedGroup(table)
    if (!group) {
      return
    }

    const rectangles = group.ungroupOnCanvas().getObjects()
    withSuppressedSelectionEvents(this.canvas, () => {
      this.canvas.remove(group)
    })

    this.canvas.add(...rectangles)
  }

  /**
   * Groups rendered rectangles into the group or returns already existing group.
   * @param {Table} table that should be grouped.
   * @returns {FabricTable} fabric object that represents group (table) on the canvas.
   */
  groupTable = (table) => {
    const alreadyExists = this.getRenderedGroup(table)
    if (alreadyExists) {
      return alreadyExists
    }

    const rectangles = this.getRenderedRectangles(table)
    const group = new FabricTable(rectangles, {
      canvas: this.canvas
    })

    disableRotationControls(group)

    group.set({
      data: table,
      selectable: this.props.selectable
    })

    group.on('mouseover', this.onTableMouseOver)
    group.on('mouseup', this.onTableMouseUp)

    withSuppressedSelectionEvents(this.canvas, () => {
      this.canvas.remove(...rectangles)
    })

    this.canvas.add(group)

    return group
  }

  /**
   * Returns rectangles that are rendered on the canvas.
   * @param {Table} table - table, rendered rectangles of which we're interested in.
   * @returns {Array<FabricCell>} array of the fabric objects that represent table on the canvas.
   */
  getRenderedRectangles = (table) => {
    const group = this.getRenderedGroup(table)
    if (group) {
      return group.getObjects()
    }

    return this.props.canvas.getObjects().filter((obj) => (
      obj.data &&
      obj.data.typeName === CELL_TYPE_NAME &&
      obj.data.table.uid === table.uid
    ))
  }

  /**
   * Clears canvas selection in the redux store.
   */
  clearSelection = () => {
    this.canvas.fire('selection:cleared')
  }

  /**
   * When cell is being scaled:
   * - sets flag if alternative table scaling hotkey is pressed.
   * - locks change of the width/height of the cell if alternative scaling is used.
   * - picks proper method to update other table cells position/size based on the scaling type (regular/alternative).
   * - re-renders table when scaling is done.
   * @param {fabric.IEvent} opts fabric event options.
   */
  onCellScaling = (opts) => {
    if (this.altResizing == null) {
      this.altResizing = opts.e.shiftKey
    }

    const before = getPositionAndSizeBeforeScaling(opts)
    const target = applyScale(opts.transform.target)
    if (this.altResizing) {
      this.lockResize(target, before)
    }

    const cellAfterResize = {
      ...target.data,
      ...Rectangle.fromFabric(target)
    }

    const xDiff = Cell.xDiff(target.data, cellAfterResize)
    const yDiff = Cell.yDiff(target.data, cellAfterResize)
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)

    this.updatedTable = this.altResizing
      ? Table.toRelative(Table.resizeColumnOrRow(absolutePropsTable, xDiff, yDiff), this.props.scale, this.props.image)
      : Table.toRelative(Table.moveBorder(absolutePropsTable, xDiff, yDiff), this.props.scale, this.props.image)

    this.reRenderTable(this.props.table, this.updatedTable)
  }

  /**
   * When cell scaling is finished, clears the flag that indicates scaling with performed with hotkey pressed and pushes latest table to redux store.
   * Scaling in terms of the fabric means resizing, so we also need to auto merge the table if some rows/columns were collapsed.
   */
  onCellScaled = () => {
    this.altResizing = null

    const absolutePrevTable = Table.toAbsolute(this.updatedTable, this.props.scale, this.props.image)
    const autoMergedTable = Table.autoMerge(absolutePrevTable)
    this.updatedTable = Table.toRelative(autoMergedTable, this.props.scale, this.props.image)
    this.props.onUpdate(this.updatedTable)
    this.updatedTable = null
  }

  /**
   * Recalculates position of the table cells when one cell is being moved and then re-renders the table.
   * As alternative to this approach, we can group cells into the table, to improve performance, but not currently required.
   * @param {fabric.IEvent} opts fabric event options.
   */
  onCellMoving = (opts) => {
    const before = getPositionAndSizeBeforeScaling(opts)
    const deltaX = opts.transform.target.left - before.x
    const deltaY = opts.transform.target.top - before.y
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    const movedTable = Table.move(absolutePropsTable, deltaX, deltaY)
    this.updatedTable = Table.toRelative(movedTable, this.props.scale, this.props.image)
    this.reRenderTable(this.props.table, this.updatedTable)
  }

  /**
   * Pushes currently rendered table to the redux store.
   */
  onCellMoved = () => {
    this.props.onUpdate(this.updatedTable)
    this.updatedTable = null
  }

  /**
   * Groups rectangles into the table and set table as selected object.
   * @param {fabric.IEvent} opts fabric event options.
   */
  onCellMouseDblClick = (opts) => {
    const { backgroundColor } = this.getTableColor()

    this.getRenderedRectangles(this.props.table).forEach((cell) => {
      cell.fill = backgroundColor
    })

    const group = this.groupTable(this.props.table)
    this.props.canvas.setActiveObject(group)
  }

  /**
   * Renders FabricCell (fabric.Rect essentially with hardcoded parameters for the table) on the canvas and registers event handlers.
   * @param {Cell} cell object representing table cell
   */
  renderRectangle = (cell) => {
    const { borderColor, backgroundColor } = this.getTableColor()

    const rectangle = new FabricCell(cell, {
      borderColor,
      backgroundColor
    })

    disableRotationControls(rectangle)

    rectangle.on('scaling', this.onCellScaling)
    rectangle.on('scaled', this.onCellScaled)
    rectangle.on('moving', this.onCellMoving)
    rectangle.on('moved', this.onCellMoved)
    rectangle.on('mouseout', this.onCellMouseOut)
    rectangle.on('mouseover', this.onCellMouseOver)
    rectangle.on('mousedown', this.onCellMouseDown)
    rectangle.on('mousedblclick', this.onCellMouseDblClick)
    rectangle.on('mouseup', this.onCellMouseUp)

    this.props.canvas.add(rectangle)
  }

  /**
   * Renders all the table cells on the canvas.
   * @param {Table} table - table to render.
   */
  renderTable = (table) => {
    const absoluteTable = Table.toAbsolute(table, this.props.scale, this.props.image)
    return Table.getCells(absoluteTable).forEach(this.renderRectangle)
  }

  /**
   * Removes tables from the canvas, no matter if its grouped or not.
   * @param {Table} table - table to remove.
   */
  removeTable = (table) => {
    const group = this.getRenderedGroup(table)
    group && withSuppressedSelectionEvents(this.canvas, () => {
      this.canvas.remove(group)
    })

    const rectangles = this.getRenderedRectangles(table)
    rectangles && withSuppressedSelectionEvents(this.canvas, () => {
      this.canvas.remove(...rectangles)
      // TODO: #4414
      rectangles.forEach((key) => key.set('canvas', this.canvas))
    })
  }

  /**
   * Preserves selection/grouping during table re-rendering.
   * If table was grouped before, ensures that it will be grouped after re-rendering.
   * If table was selected before the re-rendering, ensures that it will be selected after re-rendering.
   * If table cell was selected before the re-rendering, ensures that it will selected after re-rendering.
   * Problem emerges because we remove selected objects and render new versions of them.
   * Essentially cannot be used without reRenderTable method and separated only for code splitting.
   * @param {Table} toRemove - table that will be removed
   * @param {Table} toRender - table that will be rendered
   * @param {Function} callback that actually performs that re-rendering
   */
  withPreservedSelectionDuringReRender = (toRemove, toRender, callback) => {
    const groupedBefore = !!this.getRenderedGroup(toRemove)
    const tableSelectedBefore = this.getSelectedTable(toRemove)
    const cellSelectedBefore = this.getSelectedCell(toRemove)

    callback()

    const group = groupedBefore && this.groupTable(toRender)
    if (tableSelectedBefore) {
      group && this.canvas.setActiveObject(group)
      return
    }

    if (!cellSelectedBefore) {
      return
    }

    const cellToSelect = this.canvas.getObjects().find((o) => o.data && o.data.uid === cellSelectedBefore.uid)
    if (cellToSelect) {
      this.canvas.setActiveObject(cellToSelect)
    } else {
      this.groupTable(toRender)
    }
  }

  /**
   * Removes old table, renders a new one, ensures that selection/grouping stays unchanged.
   * @param {Table} toRemove - table that will be removed
   * @param {Table} toRender - table to render
   */
  reRenderTable = (toRemove, toRender) => {
    this.withPreservedSelectionDuringReRender(toRemove, toRender, () => {
      this.removeTable(toRemove)
      this.renderTable(toRender)
    })
  }

  onMoveOrScale = () => {
    const activeObjects = this.canvas.getActiveObjects()
    const renderedTable = activeObjects.find((ao) => ao.data.uid === this.props.table.uid)

    if (!renderedTable) {
      return
    }

    const { table } = this.props

    const { x, y } = getAbsoluteCanvasPosition(renderedTable, this.canvas)
    const position = Table.getPosition(Table.toAbsolute(table, this.props.scale, this.props.image))

    const deltaX = x - position.x
    const deltaY = y - position.y
    const absolutePropsTable = Table.toAbsolute(table, this.props.scale, this.props.image)

    this.props.onUpdate(
      Table.toRelative(
        Table.move(
          absolutePropsTable,
          deltaX,
          deltaY
        ),
        this.props.scale,
        this.props.image
      )
    )
  }

  on = () => {
    this.canvas.on('object:moved', this.onMoveOrScale)
    this.canvas.on('object:scaled', this.onMoveOrScale)
  }

  off = () => {
    this.canvas.off('object:moved', this.onMoveOrScale)
    this.canvas.off('object:scaled', this.onMoveOrScale)
  }

  componentWillUnmount = () => {
    this.canvas = this.props.canvas
    this.removeTable(this.props.table)
    this.off()
  }

  componentDidUpdate = (prevProps) => {
    this.canvas = this.props.canvas
    this.reRenderTable(prevProps.table, this.props.table)
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.renderTable(this.props.table)
    this.groupTable(this.props.table)
    this.on()
  }

  render = () => null
}

export {
  CanvasTableDefault
}
