import { KnownLanguage } from '@/enums/KnownLanguage'
import { Document } from '@/models/Document'
import {
  documentNameSelector,
  documentSelector,
  pageImageUrlSelector,
  languageSelector,
  pagesQuantitySelector,
  extraNameSelector
} from '@/selectors/document'

describe('Selectors: document', () => {
  const defaultState = {
    pagination: { currentPage: 1 },
    document: new Document(
      ['0.pageImageUrl.pdf', '1.pageImageUrl.pdf'],
      KnownLanguage.ENGLISH,
      'Mock Title',
      'MockEngine',
      'Mock Template Title'
    )
  }

  it('should get labels from state when using labelsSelector', () => {
    expect(
      documentSelector(defaultState)
    ).toEqual(
      defaultState.document
    )
  })

  it('should get pageImageUrl from state when using pageImageUrlSelector', () => {
    expect(
      pageImageUrlSelector(defaultState)
    ).toEqual(
      defaultState.document.pages[0]
    )
  })

  it('should get document name from state when using documentNameSelector', () => {
    expect(
      documentNameSelector(defaultState)
    ).toEqual(
      defaultState.document.name
    )
  })

  it('should get language from state when using languageSelector', () => {
    expect(
      languageSelector(defaultState)
    ).toEqual(
      defaultState.document.language
    )
  })

  it('should get extraName from state when using extraNameSelector', () => {
    expect(
      extraNameSelector(defaultState)
    ).toEqual(
      defaultState.document.extraName
    )
  })

  it('should get pages length from state when using pagesQuantitySelector', () => {
    expect(
      pagesQuantitySelector(defaultState)
    ).toEqual(
      defaultState.document.pages.length
    )
  })
})
