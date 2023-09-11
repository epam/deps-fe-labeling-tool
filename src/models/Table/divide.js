import { getPosition } from '@/models/Table/getPosition'
import { getSize } from '@/models/Table/getSize'
import { Table } from '@/models/Table/Table'

const divide = (table, targetRows, targetColumns) => {
  const { x, y } = getPosition(table)
  const { w, h } = getSize(table)

  const cellW = w / targetColumns
  const cellH = h / targetRows

  const xGuidelines = [x]
  const yGuidelines = [y]

  for (let columnIndex = 1; columnIndex <= targetColumns; columnIndex++) {
    xGuidelines.push(xGuidelines[columnIndex - 1] + cellW)
  }

  for (let rowIndex = 1; rowIndex <= targetRows; rowIndex++) {
    yGuidelines.push(yGuidelines[rowIndex - 1] + cellH)
  }

  const newTable = Table.clone(table)
  newTable.xGuidelines = xGuidelines
  newTable.yGuidelines = yGuidelines
  newTable.merges = []
  newTable.values = []
  newTable.uid = table.uid
  return newTable
}

export {
  divide
}
