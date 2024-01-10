import lodashIsEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'

// to avoid types checks
const isEqual = (a, b) => {
  if (isObject(a) && isObject(b) && !Array.isArray(a) && !Array.isArray(b)) {
    return lodashIsEqual({ ...a }, { ...b })
  }

  return lodashIsEqual(a, b)
}

export { isEqual }
