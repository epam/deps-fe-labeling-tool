import { documentForLabeling } from '@/config/document'
import { resetDefault, storeDocument } from './document'

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
