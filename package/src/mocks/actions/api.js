import { mockMarkupSelectors } from '@/mocks/selectors/markup'

const omrArea = jest.fn(() => Promise.resolve({
  content: false,
  confidence: 0.77
}))

const ocrTable = jest.fn(() => Promise.resolve({ type: 'MOCK_OCR_TABLE' }))

const ocrText = jest.fn(() => Promise.resolve({
  content: 'MOCK_OCR_TEXT',
  confidence: 0.98
}))

const save = jest.fn(() => Promise.resolve(mockMarkupSelectors.markupSelector()))

const saveMarkup = jest.fn(() => Promise.resolve({ type: 'MOCK_SAVE_MARKUP' }))

const detectTables = jest.fn((url, coords) => Promise.resolve(['markupTable']))

const mockApiActions = {
  detectTables,
  omrArea,
  ocrTable,
  ocrText,
  save,
  saveMarkup
}

export {
  mockApiActions
}
