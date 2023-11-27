import { CellsMerge } from '@/models/Table/CellsMerge'
import { getDimensions } from '@/models/Table/getDimensions'

const flip = (table, guideline) => {
  const xGuidelines = [...table.xGuidelines].map((g) => 2 * guideline - g).sort((a, b) => a - b)

  const { columns } = getDimensions(table)
  const merges = [...table.merges].map((cm) => ({
    ...cm,
    column: columns - cm.colspan - cm.column
  }))

  const values = [...table.values].map((v) => {
    const merge = table.merges.find((m) => CellsMerge.includes(m, v.row, v.column))
    const colspan = merge ? merge.colspan : 1
    return {
      ...v,
      column: columns - colspan - v.column
    }
  })

  return {
    ...table,
    xGuidelines,
    merges,
    values
  }
}

export {
  flip
}
