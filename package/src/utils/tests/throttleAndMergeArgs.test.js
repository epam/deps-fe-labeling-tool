import { throttleAndMergeArgs } from '@/utils/throttleAndMergeArgs'

describe('util: throttleAndMergeArgs', () => {
  let delayedFunc, timeToDelay, mergeArgsRuleFunc, initialValue

  beforeEach(() => {
    delayedFunc = jest.fn()
    timeToDelay = 5000
    mergeArgsRuleFunc = jest.fn((a, b) => a + b[0])
    initialValue = 2
  })

  it('should call delayedFunc only once after 5000 ms with correct merged arguments', () => {
    jest.useFakeTimers()

    const next = throttleAndMergeArgs(delayedFunc, timeToDelay, mergeArgsRuleFunc, initialValue)

    next(2)
    expect(delayedFunc).not.toBeCalled()
    jest.advanceTimersByTime(1000)
    expect(delayedFunc).not.toBeCalled()
    next(2)
    next(2)
    jest.advanceTimersByTime(1000)
    expect(delayedFunc).not.toBeCalled()
    next(1)
    next(1)
    next(2)
    next(2)
    next(1)
    next(2)
    next(2)
    jest.advanceTimersByTime(1000)
    expect(delayedFunc).not.toBeCalled()
    jest.advanceTimersByTime(2000)
    expect(mergeArgsRuleFunc).toHaveBeenCalledTimes(10)
    expect(delayedFunc).toHaveBeenCalledTimes(1)
    expect(delayedFunc).toHaveBeenCalledWith(19)

    jest.clearAllTimers()
  })
})
