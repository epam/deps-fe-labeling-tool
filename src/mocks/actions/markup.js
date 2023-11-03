const addLabels = jest.fn((labels) => ({
  type: 'MOCK_ADD_LABELS_ACTION',
  payload: labels
}))

const addTables = jest.fn((tables) => ({
  type: 'MOCK_ADD_TABLES_ACTION',
  payload: tables
}))

const removeLabels = jest.fn((labels) => ({
  type: 'MOCK_REMOVE_LABELS_ACTION',
  payload: labels
}))

const updateLabels = jest.fn((labels) => ({
  type: 'MOCK_UPDATE_LABELS_ACTION',
  payload: labels
}))

const updateAllLabels = jest.fn((labels) => ({
  type: 'MOCK_UPDATE_ALL_LABELS_ACTION',
  payload: labels
}))

const updateTables = jest.fn((tables) => ({
  type: 'MOCK_UPDATE_TABLES_ACTION',
  payload: tables
}))

const updateAllTables = jest.fn((tables) => ({
  type: 'MOCK_UPDATE_ALL_TABLES_ACTION',
  payload: tables
}))

const selectLabels = jest.fn((labels) => ({
  type: 'MOCK_SELECT_LABELS_ACTION',
  payload: labels
}))

const selectTables = jest.fn((tables) => ({
  type: 'MOCK_SELECT_TABLES_ACTION',
  payload: tables
}))

const clearSelection = jest.fn(() => ({
  type: 'MOCK_CLEAR_SELECTION_ACTION'
}))

const removeTables = jest.fn((tables) => ({
  type: 'MOCK_REMOVE_TABLES_ACTION',
  payload: tables
}))

const importMarkup = jest.fn(() => ({
  type: 'MOCK_IMPORT_MARKUP'
}))

const exportMarkup = jest.fn(() => ({
  type: 'MOCK_EXPORT_MARKUP'
}))

const undo = jest.fn(() => ({
  type: 'MOCK_UNDO_ACTION'
}))

const redo = jest.fn(() => ({
  type: 'MOCK_REDO_ACTION'
}))

const updateInitialMarkup = jest.fn(() => ({
  type: 'MOCK_UPDATE_INITIAL_MARKUP_ACTION'
}))

const storeMarkup = jest.fn((markup) => ({
  type: 'MOCK_STORE_MARKUP_ACTION',
  payload: markup
}))

const storeAssignedMarkup = jest.fn((markup) => ({
  type: 'MOCK_UPDATE_MARKUP_ACTION',
  payload: markup
}))

const updatePageMarkup = jest.fn(() => ({
  type: 'UPDATE_PAGE_MARKUP'
}))

const reset = jest.fn(() => ({
  type: 'RESET_MARKUP_ACTION'
}))

const copyMarkup = jest.fn(() => ({
  type: 'COPY_MARKUP_ACTION'
}))

const pasteMarkup = jest.fn(() => ({
  type: 'PASTE_MARKUP_ACTION'
}))

const updateLabelsWithSettings = jest.fn(() => ({
  type: 'UPDATE_LABELS_WITH_SETTINGS'
}))

const updateTablesWithSettings = jest.fn(() => ({
  type: 'UPDATE_TABLES_WITH_SETTINGS'
}))

const mockMarkupActions = {
  addLabels,
  addTables,
  copyMarkup,
  pasteMarkup,
  removeLabels,
  reset,
  updateLabels,
  updateAllLabels,
  updateTables,
  updateAllTables,
  selectLabels,
  selectTables,
  clearSelection,
  removeTables,
  importMarkup,
  exportMarkup,
  undo,
  updateInitialMarkup,
  storeMarkup,
  storeAssignedMarkup,
  updatePageMarkup,
  redo,
  updateLabelsWithSettings,
  updateTablesWithSettings
}

export {
  mockMarkupActions
}
