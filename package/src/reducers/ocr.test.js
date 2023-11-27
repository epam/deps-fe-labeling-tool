import { mockAction } from '@/mocks/mockAction'
import { resetDefault, storeOcr, setPrimaryEngine, setPrimaryLanguage } from '@/actions/ocr'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { OcrEngine } from '@/models/OcrEngine'
import { OcrLanguage } from '@/models/OcrLanguage'
import { ocrReducer } from '@/reducers/ocr'

const mockOcrEngine = new OcrEngine('ocrCode', 'ocr Name')

const mockOcrLanguage = new OcrLanguage(KnownLanguage.ENGLISH, 'English')

const mockOcr = {
  engines: [mockOcrEngine],
  languages: [mockOcrLanguage]
}

describe('Reducer: ocr', () => {
  let defaultState

  beforeEach(() => {
    defaultState = ocrReducer(undefined, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(ocrReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({
      primaryEngine: null,
      ocrEngines: null,
      ocrLanguages: null,
      primaryLanguage: null
    })
  })

  it('should handle storeOcr action correctly', () => {
    const action = storeOcr(mockOcr)

    expect(ocrReducer(defaultState, action)).toEqual({
      ...defaultState,
      ocrEngines: [mockOcrEngine],
      primaryEngine: mockOcrEngine.code,
      ocrLanguages: [mockOcrLanguage]
    })
  })

  it('should handle setPrimaryEngine action correctly', () => {
    const action = setPrimaryEngine(mockOcrEngine)

    expect(ocrReducer(defaultState, action)).toEqual({
      ...defaultState,
      primaryEngine: mockOcrEngine
    })
  })

  it('should handle setPrimaryLanguage action correctly', () => {
    const action = setPrimaryLanguage(mockOcrLanguage.code)

    expect(ocrReducer(defaultState, action)).toEqual({
      ...defaultState,
      primaryLanguage: mockOcrLanguage.code
    })
  })
})
