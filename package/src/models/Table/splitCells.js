import { Line } from '@/models/Line'
import { Point } from '@/models/Point'
import { CellsMerge } from '@/models/Table/CellsMerge'
import { CellValue } from '@/models/Table/CellValue'
import { getDimensions } from '@/models/Table/getDimensions'
import { normalize } from '@/models/Table/normalize'
import { overrideMerges } from '@/models/Table/overrideMerges'
import { transpose } from '@/models/Table/transpose'
import { range } from '@/utils/array'

const THRESHOLD_SAME_GUIDELINE = 3

const isHorizontal = (p1, p2) => {
  return Math.abs(p1.x - p2.x) > Math.abs(p1.y - p2.y)
}

const before = (target) => (curr, index, arr) => {
  const next = arr[index + 1]
  return next !== undefined && curr <= target && target < next
}

const after = (target) => (curr, index, arr) => {
  const prev = arr[index - 1]
  return prev !== undefined && prev <= target && target < curr
}

const getHorizontalProjection = (table, p1, p2, throughout) => {
  const { xGuidelines, yGuidelines, merges } = table
  const { y } = p1

  if (throughout) {
    return new Line(
      new Point(xGuidelines[0], y),
      new Point(xGuidelines[xGuidelines.length - 1], y)
    )
  }

  const from = Math.min(p1.x, p2.x)
  const to = Math.max(p1.x, p2.x)
  let xFrom = xGuidelines.find(before(from))
  let xTo = xGuidelines.find(after(to))
  xFrom = xFrom !== undefined ? xFrom : xGuidelines[0]
  xTo = xTo !== undefined ? xTo : xGuidelines[xGuidelines.length - 1]

  const row = yGuidelines.findIndex(before(y))
  const columnFrom = xGuidelines.indexOf(xFrom)
  const columnTo = xGuidelines.indexOf(xTo) - 1
  const mergeFrom = merges.find((m) => CellsMerge.includes(m, row, columnFrom))
  const mergeTo = merges.find((m) => CellsMerge.includes(m, row, columnTo))
  xFrom = !mergeFrom || mergeFrom.colspan === 1 ? xFrom : xGuidelines[mergeFrom.column]
  xTo = !mergeTo || mergeTo.colspan === 1 ? xTo : xGuidelines[mergeTo.column + mergeTo.colspan]

  return new Line(
    new Point(xFrom, y),
    new Point(xTo, y)
  )
}

const getSplitGuideline = (table, splitLine) => {
  const from = splitLine.p1.y - THRESHOLD_SAME_GUIDELINE
  const to = splitLine.p1.y + THRESHOLD_SAME_GUIDELINE
  const existingGuideline = table.yGuidelines.find((g) => (
    from <= g && g <= to
  ))

  return existingGuideline !== undefined ? existingGuideline : splitLine.p1.y
}

const splitMerges = (table, guideline, splitLine) => {
  const { xGuidelines, yGuidelines, merges } = table
  const slicedRow = yGuidelines.findIndex(before(guideline))
  const xFrom = Math.min(splitLine.p1.x, splitLine.p2.x)
  const xTo = Math.max(splitLine.p1.x, splitLine.p2.x)
  const columnFrom = xGuidelines.indexOf(xFrom)
  const columnTo = xGuidelines.indexOf(xTo) - 1
  const columnsToSplit = range(columnFrom, columnTo)

  const guidelineExists = table.yGuidelines.includes(guideline)
  if (guidelineExists) {
    return merges.map((cm) => {
      const mergeExists = columnsToSplit.find((column) => CellsMerge.includes(cm, slicedRow, column)) !== undefined
      return mergeExists ? CellsMerge.split(cm, slicedRow) : cm
    }).flat()
  }

  const { columns } = getDimensions(table)
  const columnsToPreserve = [
    ...range(0, columnFrom - 1),
    ...range(columnTo + 1, columns - 1)
  ]

  const updatedMerges = merges.map((cm) => {
    const mergeExists = columnsToSplit.find((column) => CellsMerge.includes(cm, slicedRow, column)) !== undefined
    if (mergeExists) {
      const expanded = CellsMerge.expand(cm, 0, 1)
      return CellsMerge.split(expanded, slicedRow + 1)
    }

    const notAffected = cm.row < slicedRow
    return notAffected ? cm : CellsMerge.move(cm, 1)
  }).flat()

  const newMerges = columnsToPreserve.map((column) => {
    const merge = table.merges.find((cm) => CellsMerge.includes(cm, slicedRow, column))
    return merge
      ? CellsMerge.expand(merge, 0, 1)
      : new CellsMerge(slicedRow, column, 1, 2)
  })

  return overrideMerges(updatedMerges, newMerges)
}

const splitValues = (table, guideline) => {
  const { yGuidelines } = table
  const splitRow = yGuidelines.findIndex(before(guideline))
  return table.values.map((cv) => (
    cv.row < splitRow ? cv : CellValue.move(cv, 1, 0)
  ))
}

const splitGuidelines = (table, guideline) => {
  const yGuidelines = [...table.yGuidelines]
  const exists = !table.yGuidelines.includes(guideline)
  if (exists) {
    const insertIndex = yGuidelines.findIndex(after(guideline))
    yGuidelines.splice(insertIndex, 0, guideline)
  }

  return yGuidelines
}

const splitCellsHorizontally = (table, splitLine) => {
  const guideline = getSplitGuideline(table, splitLine)
  return normalize({
    ...table,
    yGuidelines: splitGuidelines(table, guideline),
    merges: splitMerges(table, guideline, splitLine),
    values: splitValues(table, guideline)
  })
}

const getSplitProjection = (table, p1, p2, throughout = false) => {
  if (isHorizontal(p1, p2)) {
    return getHorizontalProjection(table, p1, p2, throughout)
  }

  return Line.transpose(
    getHorizontalProjection(
      transpose(table),
      Point.transpose(p1),
      Point.transpose(p2),
      throughout
    )
  )
}

const splitCells = (table, p1, p2, throughout = false) => {
  const splitLine = getSplitProjection(table, p1, p2, throughout)
  if (isHorizontal(p1, p2)) {
    return splitCellsHorizontally(table, splitLine)
  }

  return transpose(
    splitCellsHorizontally(
      transpose(table),
      Line.transpose(splitLine)
    )
  )
}

export {
  getSplitProjection,
  splitCells
}
