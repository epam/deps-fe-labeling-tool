import { KnownLanguage } from '@/enums/KnownLanguage'
import { Document } from '@/models/Document'

const mockDocument = new Document(
  [
    'page1',
    'page2'
  ],
  KnownLanguage.ENGLISH,
  'Mock Title',
  'MockEngine',
  'Mock Extra Name'
)

const documentSelector = jest.fn(() => mockDocument)

const documentNameSelector = jest.fn(() => mockDocument.name)

const extraNameSelector = jest.fn(() => mockDocument.extraName)

const mockPageImageUrl = 'mockPageImageUrl.pdf'

const pageImageUrlSelector = jest.fn(() => mockPageImageUrl)

const pagesQuantitySelector = jest.fn(() => 2)

const languageSelector = jest.fn(() => mockDocument.language)

const mockDocumentSelectors = {
  pageImageUrlSelector,
  documentSelector,
  documentNameSelector,
  extraNameSelector,
  pagesQuantitySelector,
  languageSelector
}

export {
  mockDocumentSelectors
}
