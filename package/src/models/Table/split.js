import { flip } from '@/models/Table/flip'
import { slice } from '@/models/Table/slice'

const split = (table, guideline) => {
  const left = slice(table, guideline)
  const flipped = flip(table, guideline)
  const rightFlipped = slice(flipped, guideline)
  const right = rightFlipped && flip(rightFlipped, guideline)
  return [
    left,
    right
  ]
}

export {
  split
}
