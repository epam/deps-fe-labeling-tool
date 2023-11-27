const shallowComparator = (a, b) => a === b

const arraysEqual = (array1, array2, comparator = shallowComparator) => {
  if (!array1 || !array2) {
    return false
  }

  if (array1 === array2) {
    return true
  }

  if (array1.length !== array2.length) {
    return false
  }

  for (let i = 0; i < array1.length; i++) {
    if (!comparator(array1[i], array2[i])) {
      return false
    }
  }

  return true
}

const range = (from, to, step = 1) => {
  const result = []
  for (let i = from; i <= to; i += step) {
    result.push(i)
  }

  return result
}

export {
  arraysEqual,
  range
}
