import { createBidirectionalUpdater } from '@/models/Table/moveBorder'
import { moveGuideline } from '@/models/Table/moveGuideline'

const getBounds = (guidelines, guideline) => {
  const guidelineIndex = guidelines.indexOf(guideline)
  return [
    guidelines[guidelineIndex - 1],
    undefined
  ]
}

const resizeColumn = (table, from, to) => {
  const { xGuidelines } = table
  const guidelineIndex = xGuidelines.indexOf(from)
  const guidelinesToMove = xGuidelines.slice(guidelineIndex)
  const deltaX = to - from
  return {
    ...table,
    xGuidelines: guidelinesToMove.reduce((guidelines, guideline) => moveGuideline(
      guidelines,
      getBounds(guidelines, guideline),
      guideline,
      guideline + deltaX
    ), xGuidelines)
  }
}

const resizeColumnOrRow = createBidirectionalUpdater(resizeColumn)

export {
  resizeColumnOrRow
}
