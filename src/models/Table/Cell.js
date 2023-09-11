import { Rectangle } from '@/models/Rectangle'
import { Border } from '@/models/Table/Border'
import { toFixedNumber } from '@/utils/number'

const CELL_TYPE_NAME = 'cell'

class Cell extends Rectangle {
  typeName = CELL_TYPE_NAME

  constructor (uid, table, x, y, w, h, row = 0, column = 0, content = '', confidence) {
    super(x, y, w, h)
    this.uid = uid
    this.table = table
    this.row = row
    this.column = column
    this.content = content
    this.confidence = confidence
  }

  static clone = (c) => new Cell(
    c.uid,
    c.table,
    c.x,
    c.y,
    c.w,
    c.h,
    c.row,
    c.column,
    c.content,
    c.confidence
  )

  static transpose = (cell) => ({
    ...cell,
    ...Rectangle.transpose(cell),
    row: cell.column,
    column: cell.row
  })

  static xDiff = (left, right) => (
    toFixedNumber(left.x) === toFixedNumber(right.x)
      ? [left.x + left.w, left.x + right.w]
      : [left.x, right.x]
  )

  static yDiff = (left, right) => Cell.xDiff(
    Cell.transpose(left),
    Cell.transpose(right)
  )

  static getBorders = (cell) => Rectangle.getLines(cell).map((line) => new Border(
    cell.table,
    line.p1,
    line.p2,
    [cell]
  ))
}

export {
  CELL_TYPE_NAME,
  Cell
}
