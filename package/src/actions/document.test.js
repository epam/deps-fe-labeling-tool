import { KnownLanguage } from '@/enums/KnownLanguage'
import { resetDefault, storeDocument } from './document'

const documentForLabeling = new Document(
  [],
  KnownLanguage.ENGLISH,
  'Demo',
  'Tesseract'
)

describe('Actions: document', () => {
  it('should create storeDocument action with correct type and payload', () => {
    const action = storeDocument(documentForLabeling)

    expect(action).toEqual({
      type: storeDocument.toString(),
      payload: documentForLabeling
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })
})
