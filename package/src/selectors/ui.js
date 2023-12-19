import { createSelector } from 'reselect'

const rootSelector = (state) => state.ui

const markupObjectsFilterSelector = createSelector(
  [rootSelector],
  (uiState) => uiState.markupObjectsFilter
)

const assignToFieldsFilterSelector = createSelector(
  [rootSelector],
  (uiState) => uiState.assignToFieldsFilter
)

const expandedListKeysSelector = createSelector(
  [rootSelector],
  (uiState) => uiState.expandedListKeys
)

const activeSidebarSelector = createSelector(
  [rootSelector],
  (uiState) => uiState.activeSidebar
)

const temporaryFieldsIndexesSelector = createSelector(
  [rootSelector],
  (uiState) => uiState.temporaryFieldsIndexes
)

export {
  markupObjectsFilterSelector,
  expandedListKeysSelector,
  activeSidebarSelector,
  temporaryFieldsIndexesSelector,
  assignToFieldsFilterSelector
}
