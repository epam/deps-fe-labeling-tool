import { Cell } from '@/models/Table/Cell'
import { CellsMerge } from './CellsMerge'

const getValue = (table, row, column) => {
  const value = table.values.find((cv) => (
    cv.row === row && cv.column === column
  ))

  return {
    ...value
  }
}

const getCells = (table) => {
  const { xGuidelines, yGuidelines } = table

  const cells = []
  for (let row = 0; row < yGuidelines.length - 1; row++) {
    for (let column = 0; column < xGuidelines.length - 1; column++) {
      const merge = table.merges.find((merge) => CellsMerge.includes(merge, row, column))
      const exists = !merge || (merge.row === row && merge.column === column)

      if (exists) {
        const { colspan = 1, rowspan = 1 } = merge || {}
        const x = xGuidelines[column]
        const w = xGuidelines[column + colspan] - x
        const y = yGuidelines[row]
        const h = yGuidelines[row + rowspan] - y
        const value = getValue(table, row, column)
        const uid = `${table.uid}~${cells.length}`
        const cell = new Cell(
          uid,
          table,
          x,
          y,
          w,
          h,
          row,
          column,
          value.value ? value.value : '',
          value.confidence
        )

        cells.push(cell)
      }
    }
  }

  return cells
}

export {
  getCells
}
