
import { createSelectorCreator, defaultMemoize } from 'reselect'
import { isEqual } from './isEqual'

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, {
  resultEqualityCheck: isEqual
})

export { createDeepEqualSelector }
