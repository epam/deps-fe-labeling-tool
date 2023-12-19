import PropTypes from 'prop-types'
import { Direction } from '@/enums/Rotation'

class CellsMerge {
  constructor (row, column, colspan = 1, rowspan = 1) {
    this.row = row
    this.column = column
    this.rowspan = rowspan
    this.colspan = colspan
  }

  static split = (cm, row) => {
    const merge1 = new CellsMerge(
      cm.row,
      cm.column,
      cm.colspan,
      row - cm.row
    )

    const merge2 = new CellsMerge(
      cm.row + merge1.rowspan,
      cm.column,
      cm.colspan,
      cm.rowspan - merge1.rowspan
    )

    return [
      merge1,
      merge2
    ]
  }

  static move = (cm, rowsDelta = 0, columnsDelta = 0) => new CellsMerge(
    cm.row + rowsDelta,
    cm.column + columnsDelta,
    cm.colspan,
    cm.rowspan
  )

  static transpose = (cm) => new CellsMerge(
    cm.column,
    cm.row,
    cm.rowspan,
    cm.colspan
  )

  static isValid = (cm) => (
    cm.rowspan > 1 ||
    cm.colspan > 1
  )

  static expand = (cm, colspanDelta = 0, rowspanDelta = 0) => {
    const colspan = cm.colspan + colspanDelta
    const rowspan = cm.rowspan + rowspanDelta
    return {
      ...cm,
      colspan: colspan < 1 ? 1 : colspan,
      rowspan: rowspan < 1 ? 1 : rowspan
    }
  }

  static includes = (cm, row, column) => (
    CellsMerge.includesRow(cm, row) &&
    CellsMerge.includesColumn(cm, column)
  )

  static includesRow = (cm, row) => (
    cm.row <= row && row < cm.row + cm.rowspan
  )

  static includesColumn = (cm, column) => (
    cm.column <= column && column < cm.column + cm.colspan
  )

  static rotate = (cm, direction, columns, rows) => {
    const row = direction === Direction.CLOCKWISE ? cm.column : columns - cm.column - cm.colspan
    const column = direction === Direction.CLOCKWISE ? rows - cm.row - cm.rowspan : cm.row

    return new CellsMerge(
      row,
      column,
      cm.rowspan,
      cm.colspan
    )
  }
}

const cellsMergeShape = PropTypes.shape({
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  rowspan: PropTypes.number.isRequired,
  colspan: PropTypes.number.isRequired
})

export {
  cellsMergeShape,
  CellsMerge
}
