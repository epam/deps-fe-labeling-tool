const storeDocument = jest.fn((document) => ({
  type: 'MOCK_STORE_DOCUMENT_ACTION',
  payload: document
}))

const mockDocumentActions = {
  storeDocument
}

export {
  mockDocumentActions
}
