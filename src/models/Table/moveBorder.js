import { moveGuideline } from '@/models/Table/moveGuideline'
import { transpose } from '@/models/Table/transpose'

const createBidirectionalUpdater = (updateFn) => (table, xDiff, yDiff) => {
  const [xBefore, xAfter] = xDiff
  const updatedTable = updateFn(
    table,
    xBefore,
    xAfter
  )

  const [yBefore, yAfter] = yDiff
  return transpose(
    updateFn(
      transpose(updatedTable),
      yBefore,
      yAfter
    )
  )
}

const getBounds = (guidelines, guideline) => {
  const guidelineIndex = guidelines.indexOf(guideline)
  return [
    guidelines[guidelineIndex - 1],
    guidelines[guidelineIndex + 1]
  ]
}

const moveVerticalBorder = (table, from, to) => ({
  ...table,
  xGuidelines: moveGuideline(
    table.xGuidelines,
    getBounds(table.xGuidelines, from),
    from,
    to
  )
})

const moveBorder = createBidirectionalUpdater(moveVerticalBorder)

export {
  moveBorder,
  createBidirectionalUpdater
}
