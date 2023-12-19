import { CellsMerge } from '@/models/Table/CellsMerge'
import { getIntersectingMerges } from '@/models/Table/getIntersectingMerges'
import { merge } from '@/models/Table/merge'
import { move } from '@/models/Table/move'
import { normalize } from '@/models/Table/normalize'
import { split } from '@/models/Table/split'
import { Table } from '@/models/Table/Table'

const NEW_COLUMN_WIDTH = 25

const addColumn = (table, guideline) => {
  const [left, right] = split(table, guideline)

  const rightMoved = right && move(right, NEW_COLUMN_WIDTH)
  const intersectingMerges = getIntersectingMerges(table, guideline)
  const stretchedIntersectingMerges = intersectingMerges.map((m) => CellsMerge.expand(m, 1))

  const columnXGuidelines = [guideline, guideline + NEW_COLUMN_WIDTH]
  const columnYGuidelines = [...table.yGuidelines]
  const column = Table.clone(table)
  column.xGuidelines = columnXGuidelines
  column.yGuidelines = columnYGuidelines
  column.merges = []
  column.values = []

  const leftAndColumn = merge(left, column, stretchedIntersectingMerges)

  if (!rightMoved) {
    return leftAndColumn
  }

  return normalize(
    merge(leftAndColumn, rightMoved, stretchedIntersectingMerges)
  )
}

export {
  addColumn
}
