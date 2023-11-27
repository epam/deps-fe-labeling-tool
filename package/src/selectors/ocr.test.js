import { KnownLanguage } from '@/enums/KnownLanguage'
import { OcrEngine } from '@/models/OcrEngine'
import { OcrLanguage } from '@/models/OcrLanguage'
import { primaryEngineSelector, ocrEnginesSelector, primaryLanguageSelector, ocrLanguagesSelector } from '@/selectors/ocr'

const ocrLanguages = [
  new OcrLanguage(KnownLanguage.ENGLISH, 'English'),
  new OcrLanguage(KnownLanguage.RUSSIAN, 'Russian')
]

const ocrEngines = [
  new OcrEngine('TESSERACT', 'Tesseract'),
  new OcrEngine('ABBYY', 'Abbyy'),
  new OcrEngine('GCP_VISION', 'GCP Vision')
]

describe('Selectors: ocr', () => {
  const defaultState = {
    ocr: {
      primaryLanguage: ocrLanguages[0].code,
      ocrLanguages: ocrLanguages,
      ocrEngines: ocrEngines,
      primaryEngine: ocrEngines[1]
    }
  }

  it('should get ocrEngines from state when using ocrEnginesSelector', () => {
    expect(
      ocrEnginesSelector(defaultState)
    ).toEqual(
      ocrEngines
    )
  })

  it('should get primaryEngine from state when using primaryEngineSelector', () => {
    expect(
      primaryEngineSelector(defaultState)
    ).toEqual(
      ocrEngines[1]
    )
  })

  it('should get ocrLanguages from state when using ocrLanguagesSelector', () => {
    expect(
      ocrLanguagesSelector(defaultState)
    ).toEqual(
      ocrLanguages
    )
  })

  it('should get primaryLanguage from state when using primaryLanguageSelector', () => {
    expect(
      primaryLanguageSelector(defaultState)
    ).toEqual(
      ocrLanguages[0].code
    )
  })
})
