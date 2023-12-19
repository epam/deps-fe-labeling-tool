const setMarkupObjectsFilter = jest.fn((filter) => ({
  type: 'MOCK_MARKUP_OBJECTS_FILTER_ACTION',
  payload: filter
}))

const setAssignToFieldsFilter = jest.fn((filter) => ({
  type: 'MOCK_ASSIGN_TO_FIELDS_FILTER_ACTION',
  payload: filter
}))

const setExpandedListKeys = jest.fn((key) => ({
  type: 'MOCK_SET_EXPANDED_LIST_KEYS_ACTION',
  payload: key
}))

const toggleExpandedListKey = jest.fn((key) => ({
  type: 'MOCK_TOGGLE_EXPANDED_LIST_KEY_ACTION',
  payload: key
}))

const addTemporaryFieldIndex = jest.fn((key) => ({
  type: 'MOCK_ADD_TEMPORARY_FIELD_INDEX',
  payload: key
}))

const deleteTemporaryFieldIndex = jest.fn((key) => ({
  type: 'MOCK_DELETE_TEMPORARY_FIELD_INDEX',
  payload: key
}))

const resetDefault = jest.fn(() => ({
  type: 'MOCK_RESET_DEFAULT'
}))

const setActiveSidebar = jest.fn(() => ({
  type: 'MOCK_SET_ACTIVE_SIDEBAR'
}))

const mockUiActions = {
  setExpandedListKeys,
  toggleExpandedListKey,
  setMarkupObjectsFilter,
  setAssignToFieldsFilter,
  addTemporaryFieldIndex,
  deleteTemporaryFieldIndex,
  resetDefault,
  setActiveSidebar
}

export {
  mockUiActions
}
