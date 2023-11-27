import { CellsMerge } from '@/models/Table/CellsMerge'
import { CellValue } from '@/models/Table/CellValue'
import { getDimensions } from '@/models/Table/getDimensions'
import { transpose } from '@/models/Table/transpose'
import { range } from '@/utils/array'

const shiftToTheLeft = (c, fromIndex, shift) => {
  return c.column < fromIndex + shift
    ? c
    : {
      ...c,
      column: c.column - shift
    }
}

const removeVerticalThroughoutMerge = (table, cm) => {
  const startIndex = cm.column + 1
  const numberToDelete = cm.colspan - 1
  if (!numberToDelete) {
    return {
      ...table
    }
  }

  const xGuidelines = [...table.xGuidelines]
  xGuidelines.splice(startIndex, numberToDelete)

  const merges = table.merges.map((merge) => shiftToTheLeft(merge, startIndex, numberToDelete))
  const mcIndex = merges.indexOf(cm)
  merges[mcIndex] = {
    ...merges[mcIndex],
    colspan: merges[mcIndex].colspan - numberToDelete
  }

  const values = table.values.map((value) => shiftToTheLeft(value, startIndex, numberToDelete))

  return {
    ...table,
    xGuidelines,
    merges,
    values
  }
}

const removeVerticalIntersectingMerges = (table) => {
  const { rows } = getDimensions(table)
  const throughoutMerges = table.merges.filter((cm) => (
    cm.rowspan === rows
  ))

  return throughoutMerges.reduce(removeVerticalThroughoutMerge, { ...table })
}

const removeIntersectingMerges = (table) => {
  return transpose(
    removeVerticalIntersectingMerges(
      transpose(
        removeVerticalIntersectingMerges(
          table
        )
      )
    )
  )
}

const removeInvalidMerges = (table) => ({
  ...table,
  merges: table.merges.filter(CellsMerge.isValid)
})

const removeUnnecessaryVerticalGuidelines = (table) => {
  const rowNumbers = range(0, table.yGuidelines.length - 2)

  const xGuidelines = [...table.xGuidelines]
  let merges = [...table.merges]
  let values = [...table.values]

  for (let column = 1; column < xGuidelines.length - 1; column++) {
    const unnecessary = rowNumbers.every((row) => {
      return merges.find((cm) => {
        return CellsMerge.includes(cm, row, column) && cm.column !== column
      })
    })

    if (unnecessary) {
      merges = merges.map((cm) => {
        if (cm.column >= column) {
          return CellsMerge.move(cm, 0, -1)
        }

        if (CellsMerge.includesColumn(cm, column)) {
          return CellsMerge.expand(cm, -1)
        }

        return cm
      })

      values = values.map((cv) => {
        if (cv.column >= column) {
          return CellValue.move(cv, 0, -1)
        }

        return cv
      })

      xGuidelines.splice(column, 1)
      column--
    }
  }

  return {
    ...table,
    xGuidelines,
    merges,
    values
  }
}

const removeUnnecessaryGuidelines = (table) => {
  return transpose(
    removeUnnecessaryVerticalGuidelines(
      transpose(
        removeUnnecessaryVerticalGuidelines(
          table
        )
      )
    )
  )
}

/**
 * Removes throughout and invalid merges.
 * Returns undefined if table has only one x or y guideline.
 */
const normalize = (table) => {
  const normalized = removeInvalidMerges(
    removeUnnecessaryGuidelines(
      removeIntersectingMerges(
        table
      )
    )
  )

  if (
    normalized.xGuidelines.length < 2 ||
    normalized.yGuidelines.length < 2
  ) {
    return undefined
  }

  return normalized
}

export {
  normalize
}
