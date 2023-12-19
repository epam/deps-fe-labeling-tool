import { Line } from '@/models/Line'

const BORDER_TYPE_NAME = 'border'

class Border extends Line {
  typeName = BORDER_TYPE_NAME

  constructor (table, p1, p2, cells = [], mergeable = false) {
    super(p1, p2)
    this.table = table
    this.cells = cells
    this.mergeable = mergeable
  }
}

export {
  BORDER_TYPE_NAME,
  Border
}
