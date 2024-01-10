import { CellsMerge } from '@/models/Table/CellsMerge'
import { getIntersectingMerges } from '@/models/Table/getIntersectingMerges'
import { merge } from '@/models/Table/merge'
import { normalize } from '@/models/Table/normalize'
import { split } from '@/models/Table/split'

const deleteColumn = (table, guideline1, guideline2) => {
  const [left] = split(table, guideline1)
  const [, right] = split(table, guideline2)
  const intersectingMerges = getIntersectingMerges(table, guideline1, guideline2)

  const g1Index = table.xGuidelines.indexOf(guideline1)
  const g2Index = table.xGuidelines.indexOf(guideline2)
  const guidelinesToDelete = Math.abs(g2Index - g1Index)
  const shrunkIntersectingMerges = intersectingMerges.map((m) => CellsMerge.expand(m, guidelinesToDelete * -1))

  if (!left) {
    return right
  }

  if (!right) {
    return left
  }

  return normalize(
    merge(left, right, shrunkIntersectingMerges)
  )
}

export {
  deleteColumn
}
