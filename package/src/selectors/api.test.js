import { save, ocrText } from '@/actions/api'
import { isSavingSelector, isOcrInProgressSelector } from '@/selectors/api'

describe('Selectors: api', () => {
  let defaultState

  beforeEach(() => {
    defaultState = {
      api: {
        pending: [save.toString(), ocrText.toString()],
        errors: []
      }
    }
  })

  it('should get correct value from state when using isSavingSelector', () => {
    expect(isSavingSelector(defaultState)).toEqual(true)
  })

  it('should get correct value from state when using isOcrInProgressSelector', () => {
    expect(isOcrInProgressSelector(defaultState)).toEqual(true)
  })
})
