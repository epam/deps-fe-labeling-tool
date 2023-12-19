import { FABRIC_MIN_SIZE } from '@/utils/fabric'

const moveGuideline = (guidelines, bounds, prevPos, newPos) => {
  if (prevPos === newPos) {
    return [...guidelines]
  }

  const guidelineIndex = guidelines.indexOf(prevPos)
  if (guidelineIndex < 0) {
    return [...guidelines]
  }

  const [leftBound, rightBound] = bounds
  const leftOverflow = leftBound && newPos < leftBound
  const rightOverflow = rightBound && newPos > rightBound
  let newPosInBounds = newPos

  if (leftOverflow) {
    newPosInBounds = leftBound + FABRIC_MIN_SIZE
  }

  if (rightOverflow) {
    newPosInBounds = rightBound - FABRIC_MIN_SIZE
  }

  const updatedGuidelines = [...guidelines]
  updatedGuidelines.splice(guidelineIndex, 1, newPosInBounds)
  return updatedGuidelines
}

export {
  moveGuideline
}
