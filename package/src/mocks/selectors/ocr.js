import { KnownLanguage } from '@/enums/KnownLanguage'
import { OcrEngine } from '@/models/OcrEngine'
import { OcrLanguage } from '@/models/OcrLanguage'

const mockOcrEngine = new OcrEngine('ocrCode', 'ocr Name')

const mockOcrLanguage = new OcrLanguage(KnownLanguage.ENGLISH, 'English')

const primaryLanguageSelector = jest.fn(() => mockOcrLanguage.code)

const ocrLanguagesSelector = jest.fn(() => [mockOcrLanguage])

const primaryEngineSelector = jest.fn(() => mockOcrEngine.code)

const ocrEnginesSelector = jest.fn(() => [mockOcrEngine])

const mockOcrSelectors = {
  primaryEngineSelector,
  primaryLanguageSelector,
  ocrEnginesSelector,
  ocrLanguagesSelector
}

export {
  mockOcrSelectors,
  mockOcrEngine
}
