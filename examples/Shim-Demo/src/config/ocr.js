import { KnownLanguage } from 'labeling-tool/lib/enums/KnownLanguage'
import { OcrEngine } from 'labeling-tool/lib/models/OcrEngine'
import { OcrLanguage } from 'labeling-tool/lib/models/OcrLanguage'

const ocrLanguages = [
  new OcrLanguage(KnownLanguage.ENGLISH, 'English'),
  new OcrLanguage(KnownLanguage.RUSSIAN, 'Russian')
]

const ocrEngines = [
  new OcrEngine('TESSERACT', 'Tesseract'),
  new OcrEngine('ABBYY', 'Abbyy'),
  new OcrEngine('GCP_VISION', 'GCP Vision')
]

const ocr = {
  engines: ocrEngines,
  languages: ocrLanguages
}
export {
  ocr
}
