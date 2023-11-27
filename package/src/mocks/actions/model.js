const storeFields = jest.fn((fields) => ({
  type: 'MOCK_STORE_FIELDS_ACTION',
  payload: fields
}))

const updateFieldsToDelete = jest.fn((fields) => ({
  type: 'MOCK_UPDATE_FIELDS_TO_DELETE_ACTION',
  payload: fields
}))

const storeInitialFields = jest.fn((fields) => ({
  type: 'MOCK_STORE_INITIAL_FIELDS_ACTION',
  payload: fields
}))

const mockModelActions = {
  storeFields,
  storeInitialFields,
  updateFieldsToDelete
}

export {
  mockModelActions
}
