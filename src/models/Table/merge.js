import { getDimensions } from '@/models/Table/getDimensions'
import { getPosition } from '@/models/Table/getPosition'
import { getSize } from '@/models/Table/getSize'
import { move } from '@/models/Table/move'
import { overrideMerges } from '@/models/Table/overrideMerges'
import { Table } from '@/models/Table/Table'
import { CellsMerge } from './CellsMerge'

const mergeGuidelines = (leftGuidelines, rightGuidelines) => {
  const guidelines = [...leftGuidelines]

  rightGuidelines.forEach((g) => {
    !guidelines.includes(g) && guidelines.push(g)
  })

  return guidelines.sort((a, b) => a - b)
}

const moveMergesOrValues = (mergesOrValues, columnShift) => [
  ...mergesOrValues.map((mov) => ({
    ...mov,
    column: mov.column + columnShift
  }))
]

const combineMerges = (left, right, mergeOverrides) => (
  overrideMerges([...left, ...right], mergeOverrides)
)

const combineValues = (left, right, mergeOverrides) => {
  const notMergedRight = right.filter((value) => {
    const merge = mergeOverrides.find((mo) => CellsMerge.includes(mo, value.row, value.column))
    return !merge
  })

  return [
    ...left,
    ...notMergedRight
  ]
}

const merge = (left, right, mergeOverrides = []) => {
  const leftPos = getPosition(left)
  const leftSize = getSize(left)
  const leftDimensions = getDimensions(left)
  const rightPos = getPosition(right)
  const gluedRight = move(right, leftPos.x + leftSize.w - rightPos.x)
  const xGuidelines = mergeGuidelines(left.xGuidelines, gluedRight.xGuidelines)
  const yGuidelines = mergeGuidelines(left.yGuidelines, gluedRight.yGuidelines)
  const movedRightMerges = moveMergesOrValues(right.merges, leftDimensions.columns)
  const movedRightValues = moveMergesOrValues(right.values, leftDimensions.columns)
  const meta = left.meta ?? right.meta ?? {}
  const fieldCode = left.fieldCode ?? right.fieldCode ?? ''
  const index = left.index ?? right.index
  const table = new Table(
    xGuidelines,
    yGuidelines,
    combineMerges(left.merges, movedRightMerges, mergeOverrides),
    combineValues(left.values, movedRightValues, mergeOverrides),
    meta,
    fieldCode,
    index
  )

  table.uid = left.uid

  return table
}

export {
  merge
}
