import { mockAction } from '@/mocks/mockAction'
import { resetDefault, storeDocument } from '@/actions/document'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { Document } from '@/models/Document'
import { documentReducer } from '@/reducers/document'

const documentForLabeling = new Document(
  ['page1', 'page2'],
  KnownLanguage.ENGLISH,
  'testName',
  'Tesseract',
  'extraName'
)

describe('Reducer: document', () => {
  let defaultState

  beforeEach(() => {
    defaultState = documentReducer(defaultState, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(documentReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({
      pages: [],
      language: null,
      name: '',
      engine: '',
      extraName: ''
    })
  })

  it('should handle storeDocument action correctly', () => {
    const action = storeDocument(documentForLabeling)

    expect(documentReducer(defaultState, action)).toEqual({
      ...defaultState,
      pages: documentForLabeling.pages,
      language: documentForLabeling.language,
      name: documentForLabeling.name,
      extraName: documentForLabeling.extraName,
      engine: documentForLabeling.engine
    })
  })
})
