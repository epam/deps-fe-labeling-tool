import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CanvasMouseSelection } from '@/components/CanvasMouseSelection'
import { canvasShape } from '@/models/Canvas'
import { Rectangle } from '@/models/Rectangle'
import * as Table from '@/models/Table'
import { BORDER_TYPE_NAME } from '@/models/Table/Border'
import { COLORS } from '@/theme/theme.default'
import { FabricBorder } from './FabricBorder'
import { FabricMergeProjection } from './FabricMergeProjection'

const { tableShape } = Table

class CanvasTableMerge extends PureComponent {
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

  getRenderedBorders = (table) => {
    return this.props.canvas.getObjects().filter((o) => (
      o.data &&
      o.data.typeName === BORDER_TYPE_NAME &&
      o.data.table.uid === table.uid
    ))
  }

  getCellsToMerge = (table, selection) => (
    this.getRenderedBorders(table)
      .filter((o) => (
        o.data.mergeable &&
        Rectangle.intersecting(selection, o.data)
      ))
      .map((o) => o.data.cells)
      .flat()
  )

  throttleCellsToMergeSelection = (callback) => {
    let prevCells = []
    return (selection) => {
      const cells = this.getCellsToMerge(this.props.table, selection)
      if (prevCells.length !== cells.length) {
        prevCells = cells
        callback(cells)
      }
    }
  }

  removeBorders = (table) => {
    const borders = this.getRenderedBorders(Table.toAbsolute(table, this.props.scale, this.props.image))
    this.props.canvas.remove(...borders)
  }

  renderBorders = (table) => {
    const absolutePropsTable = Table.toAbsolute(table, this.props.scale, this.props.image)
    const borders = Table.getBorders(absolutePropsTable).map((b) => (
      new FabricBorder(b, b.mergeable ? COLORS.PRIMARY_EMPHASIS : COLORS.TABLE_BORDER)
    ))
    this.props.canvas.add(...borders)
  }

  reRenderTable = (toRemove, toRender) => {
    toRemove && this.removeBorders(toRemove)
    toRender && this.renderBorders(toRender)
  }

  removeMergeProjection = () => {
    if (!this.mergeProjection) {
      return
    }

    this.props.canvas.remove(this.mergeProjection)
  }

  renderMergeProjection = (rectangle) => {
    this.mergeProjection = new FabricMergeProjection(rectangle)
    this.props.canvas.add(this.mergeProjection)
  }

  onSelectionUpdate = this.throttleCellsToMergeSelection((cellsToMerge) => {
    this.removeMergeProjection()
    if (!cellsToMerge.length) {
      return
    }
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    const mergeProjection = Table.getMergeProjection(absolutePropsTable, cellsToMerge)
    mergeProjection && this.renderMergeProjection(mergeProjection)
  })

  onSelectionEnd = (selection) => {
    this.removeMergeProjection()
    const absolutePropsTable = Table.toAbsolute(this.props.table, this.props.scale, this.props.image)
    const cellsToMerge = this.getCellsToMerge(absolutePropsTable, selection)
    if (!cellsToMerge.length) {
      return
    }
    const table = Table.mergeCells(absolutePropsTable, cellsToMerge)
    this.props.onUpdate(Table.toRelative(table, this.props.scale, this.props.image))
  }

  componentWillUnmount = () => {
    this.reRenderTable(this.props.table)
  }

  componentDidUpdate = (prevProps) => {
    this.reRenderTable(prevProps.table, this.props.table)
  }

  componentDidMount = () => {
    this.reRenderTable(undefined, this.props.table)
  }

  render = () => (
    <CanvasMouseSelection
      canvas={this.props.canvas}
      onSelectionEnd={this.onSelectionEnd}
      onSelectionUpdate={this.onSelectionUpdate}
    />
  )
}

export {
  CanvasTableMerge
}
