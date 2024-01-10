
import { HTMerge } from '@/components/HandsonTable'

const getEmptyHTData = (table) => new Array(table.yGuidelines.length - 1).fill([]).map(() => new Array(table.xGuidelines.length - 1).fill(null))

const mapMarkupTableToHandsonDataStrings = (table) => {
  const mergeCells = table.merges?.map((cell) => new HTMerge(cell.row, cell.column, cell.rowspan, cell.colspan))

  const HTDataForRender = getEmptyHTData(table)

  table.values.forEach((cell) => {
    HTDataForRender[cell.row][cell.column] = cell.value
  })

  return {
    HTDataForRender,
    mergeCells
  }
}

export { mapMarkupTableToHandsonDataStrings }
