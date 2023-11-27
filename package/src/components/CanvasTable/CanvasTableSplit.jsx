import React, { PureComponent } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { CanvasMouse } from '@/components/CanvasMouse'
import { Cursor } from '@/enums/Cursor'
import { canvasShape } from '@/models/Canvas'
import { Point } from '@/models/Point'
import { Rectangle } from '@/models/Rectangle'
import * as Table from '@/models/Table'
import { BORDER_TYPE_NAME } from '@/models/Table/Border'
import { COLORS } from '@/theme/theme.default'
import { FabricBorder } from './FabricBorder'
import { FabricSplitProjection } from './FabricSplitProjection'

const { tableShape } = Table

const SIZE_PIVOT_POINT = 2
const THRESHOLD_SHOULD_SPLIT = 5

class CanvasTableSplit extends PureComponent {
  static propTypes = {
    canvas: canvasShape.isRequired,
    table: tableShape.isRequired,
    scale: PropTypes.number.isRequired,
    image: PropTypes.PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  shouldSplit = (prevCursor, currCursor) => (
    Math.abs(prevCursor.x - currCursor.x) > THRESHOLD_SHOULD_SPLIT ||
    Math.abs(prevCursor.y - currCursor.y) > THRESHOLD_SHOULD_SPLIT
  )

  removePivotPoint = () => {
    if (!this.pivotPoint) {
      return
    }

    this.props.canvas.remove(this.pivotPoint)
  }

  renderPivotPoint = (point) => {
    this.pivotPoint = new fabric.Circle({
      left: point.x - SIZE_PIVOT_POINT,
      top: point.y - SIZE_PIVOT_POINT,
      radius: SIZE_PIVOT_POINT,
      stroke: COLORS.PRIMARY_EMPHASIS,
      fill: COLORS.PRIMARY_EMPHASIS,
      selectable: false,
      hasControls: false,
      hoverCursor: Cursor.DEFAULT
    })

    this.props.canvas.add(this.pivotPoint)
  }

  removeSplitProjection = () => {
    if (!this.projection) {
      return
    }

    this.props.canvas.remove(this.projection)
    this.projection = undefined
  }

  renderSplitProjection = (p1, p2, throughout = false) => {
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    const splitProjection = Table.getSplitProjection(absolutePropsTable, p1, p2, throughout)
    this.projection = new FabricSplitProjection(splitProjection)
    this.props.canvas.add(this.projection)
  }

  onMouseDown = (opts) => {
    if (opts.e.altKey) {
      return
    }

    const onDownCursor = this.props.canvas.getPointer(opts.e)
    const point = new Point(onDownCursor.x, onDownCursor.y)
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    const { x, y } = Table.getPosition(absolutePropsTable)
    const { w, h } = Table.getSize(absolutePropsTable)
    const rectangle = new Rectangle(x, y, w, h)
    if (!Rectangle.inside(rectangle, point)) {
      return
    }

    this.renderPivotPoint(point)
    this.onDownCursor = onDownCursor
  }

  onMouseUp = (opts) => {
    if (!this.onDownCursor) {
      return
    }

    this.removePivotPoint()
    this.removeSplitProjection()
    const onUpCursor = this.props.canvas.getPointer(opts.e)
    const shouldSplit = this.shouldSplit(this.onDownCursor, onUpCursor)
    if (shouldSplit) {
      const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
      const table = Table.splitCells(absolutePropsTable, this.onDownCursor, onUpCursor, opts.e.shiftKey)
      this.props.onUpdate(Table.toRelative(table, this.props.scale, this.props.image))
    }

    this.onDownCursor = undefined
  }

  onMouseMove = (opts) => {
    if (!this.onDownCursor) {
      return
    }

    this.removeSplitProjection()
    const onMoveCursor = this.props.canvas.getPointer(opts.e)
    const shouldSplit = this.shouldSplit(this.onDownCursor, onMoveCursor)
    shouldSplit && this.renderSplitProjection(this.onDownCursor, onMoveCursor, opts.e.shiftKey)
  }

  getRenderedBorders = (table) => (
    this.props.canvas.getObjects().filter((o) => (
      o.data &&
      o.data.typeName === BORDER_TYPE_NAME &&
      o.data.table.uid === table.uid
    ))
  )

  removeBorders = (table) => {
    const borders = this.getRenderedBorders(table)
    this.props.canvas.remove(...borders)
  }

  renderBorders = (table) => {
    const borders = Table.getBorders(table).map((b) => (
      new FabricBorder(b)
    ))
    this.props.canvas.add(...borders)
  }

  reRenderTable = (toRemove, toRender) => {
    toRemove && this.removeBorders(toRemove)
    toRender && this.renderBorders(toRender)
  }

  componentWillUnmount = () => {
    this.reRenderTable(Table.toAbsolute(this.props.table, this.props.scale, this.props.image))
  }

  componentDidUpdate = (prevProps) => {
    const prevTable = Table.toAbsolute(prevProps.table, this.props.scale, this.props.image)
    const newTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    this.reRenderTable(prevTable, newTable)
  }

  componentDidMount = () => {
    this.reRenderTable(undefined, Table.toAbsolute(this.props.table, this.props.scale, this.props.image))
  }

  render = () => (
    <CanvasMouse
      canvas={this.props.canvas}
      onMouseDown={this.onMouseDown}
      onMouseMove={this.onMouseMove}
      onMouseUp={this.onMouseUp}
    />
  )
}

export {
  CanvasTableSplit
}
