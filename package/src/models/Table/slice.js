import { getDimensions } from '@/models/Table/getDimensions'
import { getIntersectingMerges } from '@/models/Table/getIntersectingMerges'
import { Table } from '@/models/Table/Table'

const slice = (table, guideline) => {
  const gIndex = table.xGuidelines.indexOf(guideline)

  const xGuidelines = table.xGuidelines.slice(0, gIndex + 1)
  const yGuidelines = [...table.yGuidelines]
  const slice = Table.clone(table)
  slice.xGuidelines = xGuidelines
  slice.yGuidelines = yGuidelines
  slice.merges = []
  slice.values = []
  slice.uid = table.uid

  if (slice.xGuidelines.length < 2) {
    return
  }

  const { columns } = getDimensions(slice)

  const intersectingMerges = getIntersectingMerges(table, guideline)
  const shrunkIntersectingMerges = intersectingMerges.map((m) => ({
    ...m,
    colspan: columns - m.column
  }))

  const merges = [
    ...table.merges.filter((m) => m.column + m.colspan <= columns),
    ...shrunkIntersectingMerges
  ]

  const values = [
    ...table.values.filter((v) => v.column < columns)
  ]

  return {
    ...slice,
    merges,
    values
  }
}

export {
  slice
}
