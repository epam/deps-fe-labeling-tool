const throttleAndMergeArgs = (delayedFunc, timeToDelay, mergeArgsRuleFunc, initialValue) => {
  let timeout = 0
  let mergedArgs = initialValue

  return (...arg) => {
    mergedArgs = mergeArgsRuleFunc(mergedArgs, arg)
    if (timeout) {
      return
    }

    timeout = setTimeout(() => {
      delayedFunc(mergedArgs)
      timeout = 0
      mergedArgs = initialValue
    }, timeToDelay)
  }
}

export {
  throttleAndMergeArgs
}
