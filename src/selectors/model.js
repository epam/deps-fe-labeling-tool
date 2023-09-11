import { createSelector } from 'reselect'
import { FieldType } from '@/enums/FieldType'

const rootSelector = (state) => state.model

const fieldsSelector = createSelector(
  [rootSelector],
  (modelState) => modelState.fields
)

const initialFieldsSelector = createSelector(
  [rootSelector],
  (modelState) => modelState.initialFields
)

const listFieldsSelector = createSelector(
  [fieldsSelector],
  (fields) => fields.filter((field) => field.fieldType === FieldType.LIST)
)

const fieldsToDeleteSelector = createSelector(
  [rootSelector],
  (modelState) => modelState.fieldsToDelete
)

export {
  fieldsSelector,
  initialFieldsSelector,
  listFieldsSelector,
  fieldsToDeleteSelector
}
