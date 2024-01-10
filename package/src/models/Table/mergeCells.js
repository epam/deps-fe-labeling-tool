import { Point } from '@/models/Point'
import { Rectangle } from '@/models/Rectangle'
import { Cell } from '@/models/Table/Cell'
import { CellsMerge } from '@/models/Table/CellsMerge'
import { CellValue } from '@/models/Table/CellValue'
import { getCells } from '@/models/Table/getCells'
import { normalize } from '@/models/Table/normalize'
import { overrideMerges } from '@/models/Table/overrideMerges'
import { toFixedNumber } from '@/utils/number'

const COLUMNS_SEPARATOR = ' '
const ROWS_SEPARATOR = '\n'

const indexOf = (guidelines, guideline) => {
  return guidelines.findIndex((g) => toFixedNumber(g) === toFixedNumber(guideline))
}

const getSurroundingRectangle = (cells) => {
  if (!cells || !cells.length) {
    return
  }

  const surroundingPoints = cells.reduce((acc, cell) => {
    const [p1, p2] = acc
    const [p3, p4] = Cell.getPoints(cell)
    return [
      new Point(
        Math.min(p1.x, p3.x, p4.x),
        Math.min(p1.y, p3.y, p4.y)
      ),
      new Point(
        Math.max(p2.x, p3.x, p4.x),
        Math.max(p2.y, p3.y, p4.y)
      )
    ]
  }, [
    new Point(Infinity, Infinity),
    new Point(-Infinity, -Infinity)
  ])

  const [p1, p2] = surroundingPoints
  return new Rectangle(
    p1.x,
    p1.y,
    p2.x - p1.x,
    p2.y - p1.y
  )
}

const getCellsInsideRectangle = (cells, mergeRectangle) => (
  cells.filter((cell) => {
    const [p1, p2, p3, p4] = Rectangle.getCorners(mergeRectangle)
    const [q1, q2, q3, q4] = Cell.getCorners(cell)
    return (
      (
        p1.x <= q1.x && q1.x < p4.x &&
        p1.y <= q1.y && q1.y < p4.y
      ) || (
        p3.x < q2.x && q2.x <= p2.x &&
        p3.y > q2.y && q2.y >= p2.y
      ) || (
        p2.x > q3.x & q3.x >= p3.x &&
        p2.y < q3.y & q3.y <= p3.y
      ) || (
        p1.x < q4.x && q4.x <= p4.x &&
        p1.y < q4.y && q4.y <= p4.y
      )
    )
  })
)

const mergeValue = (cells, mergeProjection) => {
  const cellsToMerge = getCellsInsideRectangle(cells, mergeProjection)

  let row = cellsToMerge[0].row
  return cellsToMerge.reduce((acc, cell) => {
    const separator = row === cell.row ? COLUMNS_SEPARATOR : ROWS_SEPARATOR
    const content = cell.content
    row = cell.row
    return content ? `${acc}${separator}${content}` : acc
  }, '')
}

const merge = (table, cells, mergeProjection) => {
  const { xGuidelines, yGuidelines } = table

  const [p1, p2] = Rectangle.getPoints(mergeProjection)

  const columnFrom = indexOf(xGuidelines, p1.x)
  const columnTo = indexOf(xGuidelines, p2.x) - 1
  const rowFrom = indexOf(yGuidelines, p1.y)
  const rowTo = indexOf(yGuidelines, p2.y) - 1

  const cm = new CellsMerge(rowFrom, columnFrom, columnTo - columnFrom + 1, rowTo - rowFrom + 1)
  const merges = overrideMerges(table.merges, [cm])

  const values = table.values.filter((value) => (
    value.row < rowFrom ||
    value.row > rowTo ||
    value.column < columnFrom ||
    value.column > columnTo
  ))

  values.push(
    new CellValue(rowFrom, columnFrom, mergeValue(cells, mergeProjection))
  )

  return {
    ...table,
    merges,
    values
  }
}

const getMergeProjection = (cells, cellsToMerge) => {
  let projectionPrev
  let projectionCurr = getSurroundingRectangle(cellsToMerge)

  while (projectionCurr && !Rectangle.equal(projectionPrev, projectionCurr)) {
    const cellsInMergeRectangle = getCellsInsideRectangle(cells, projectionCurr)
    projectionPrev = projectionCurr
    projectionCurr = getSurroundingRectangle(cellsInMergeRectangle)
  }

  return projectionCurr
}

const getProjection = (table, cellsToMerge) => {
  if (!cellsToMerge || !cellsToMerge.length) {
    return
  }

  const cells = getCells(table)
  return getMergeProjection(cells, cellsToMerge)
}

const mergeCells = (table, cellsToMerge) => {
  if (!cellsToMerge || !cellsToMerge.length) {
    return table
  }

  const cells = getCells(table)
  const mergeProjection = getMergeProjection(cells, cellsToMerge)
  return normalize(
    merge(table, cells, mergeProjection)
  )
}

export {
  getProjection as getMergeProjection,
  mergeCells
}
