import { KnownLanguage } from '@/enums/KnownLanguage'
import { OcrEngine } from '@/models/OcrEngine'
import { OcrLanguage } from '@/models/OcrLanguage'
import { resetDefault, setPrimaryEngine, storeOcr, setPrimaryLanguage } from './ocr'

const mockOcrEngine = new OcrEngine('ocrCode', 'ocr Title')
const mockOcrLanguage = new OcrLanguage(KnownLanguage.ENGLISH, 'English')

const mockOcr = {
  engines: [mockOcrEngine],
  languages: [mockOcrLanguage]
}

describe('Actions: ocr', () => {
  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create storeOcr action with correct type and payload', () => {
    const action = storeOcr(mockOcr)

    expect(action).toEqual({
      type: storeOcr.toString(),
      payload: mockOcr
    })
  })

  it('should create setPrimaryEngine action with correct type and payload', () => {
    const action = setPrimaryEngine(mockOcrEngine.code)

    expect(action).toEqual({
      type: setPrimaryEngine.toString(),
      payload: mockOcrEngine.code
    })
  })

  it('should create setPrimaryLanguage action with correct type and payload', () => {
    const action = setPrimaryLanguage(mockOcrLanguage.code)

    expect(action).toEqual({
      type: setPrimaryLanguage.toString(),
      payload: mockOcrLanguage.code
    })
  })
})
