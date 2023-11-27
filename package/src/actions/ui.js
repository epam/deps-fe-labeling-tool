import { createAction } from 'redux-actions'

const FEATURE_NAME = 'UI'

const setMarkupObjectsFilter = createAction(
  `${FEATURE_NAME}/SET_MARKUP_OBJECTS_FILTER`
)

const setAssignToFieldsFilter = createAction(
  `${FEATURE_NAME}/SET_ASSIGN_TO_FIELDS_FILTER`
)

const setExpandedListKeys = createAction(`${FEATURE_NAME}/SET_KEYS`)

const toggleExpandedListKey = createAction(`${FEATURE_NAME}/TOGGLE_KEY`)
const setActiveSidebar = createAction(`${FEATURE_NAME}/SET_ACTIVE_SIDEBAR`)

const addTemporaryFieldIndex = createAction(`${FEATURE_NAME}/ADD_TEMPORARY_FIELD`)
const deleteTemporaryFieldIndex = createAction(`${FEATURE_NAME}/DELETE_TEMPORARY_FIELD_INDEX`)

const resetDefault = createAction(`${FEATURE_NAME}/RESET_DEFAULT`)

export {
  setMarkupObjectsFilter,
  setActiveSidebar,
  setExpandedListKeys,
  toggleExpandedListKey,
  addTemporaryFieldIndex,
  setAssignToFieldsFilter,
  deleteTemporaryFieldIndex,
  resetDefault
}
