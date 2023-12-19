import PropTypes from 'prop-types'
import { Direction } from '@/enums/Rotation'

class CellValue {
  constructor (row, column, value, confidence) {
    this.row = row
    this.column = column
    this.value = value
    this.confidence = confidence
  }

  static move = (cv, rowsDelta, columnsDelta) => new CellValue(
    cv.row + rowsDelta,
    cv.column + columnsDelta,
    cv.value,
    cv.confidence
  )

  static transpose = (cv) => new CellValue(
    cv.column,
    cv.row,
    cv.value,
    cv.confidence
  )

  static rotate = (cv, direction, columns, rows) => {
    const row = direction === Direction.CLOCKWISE ? cv.column : columns - cv.column - 1
    const column = direction === Direction.CLOCKWISE ? rows - cv.row - 1 : cv.row
    return new CellValue(
      row,
      column,
      cv.value,
      cv.confidence
    )
  }
}

const cellValueShape = PropTypes.shape({
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  confidence: PropTypes.number
})

export {
  cellValueShape,
  CellValue
}
