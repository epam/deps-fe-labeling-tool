import { deleteColumn } from '@/models/Table/deleteColumn'
import { normalize } from '@/models/Table/normalize'
import { transpose } from '@/models/Table/transpose'

const AUTO_MERGE_THRESHOLD_PX = 2

const autoMergeColumn = (table, guidelineToDelete) => {
  const gIndex = table.xGuidelines.indexOf(guidelineToDelete)
  const diff = table.xGuidelines[gIndex + 1] - table.xGuidelines[gIndex]
  const xGuidelines = [...table.xGuidelines].map((g, index) => {
    return index > gIndex + 1 ? g + diff : g
  })

  return deleteColumn(
    {
      ...table,
      xGuidelines
    },
    guidelineToDelete,
    xGuidelines[gIndex + 1]
  )
}

const autoMergeColumns = (table) => {
  const { xGuidelines } = table

  if (xGuidelines.length < 3) {
    return table
  }

  const guidelinesToDelete = xGuidelines.filter((guideline, gIndex) => (
    guideline[gIndex + 1] ||
    Math.abs(xGuidelines[gIndex] - xGuidelines[gIndex + 1]) <= AUTO_MERGE_THRESHOLD_PX
  ))

  return guidelinesToDelete.reduce(autoMergeColumn, { ...table })
}

const autoMergeRows = (table) => {
  return transpose(
    autoMergeColumns(
      transpose(table)
    )
  )
}

const autoMerge = (table) => {
  return normalize(
    autoMergeRows(
      autoMergeColumns(
        table
      )
    )
  )
}

export {
  autoMerge
}
