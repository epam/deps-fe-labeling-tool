
import { batch } from 'react-redux'
import { createAction } from 'redux-actions'
import { LabelType, LABEL_TYPE_NAME } from '@/models/Label'
import { Markup } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { fieldsSelector, fieldsToDeleteSelector } from '@/selectors/model'
import {
  updateLabelsWithSettings,
  updateTablesWithSettings
} from './markup'

const FEATURE_NAME = 'MODEL'

const storeFields = createAction(
  `${FEATURE_NAME}/STORE`
)

const storeInitialFields = createAction(
  `${FEATURE_NAME}/STORE_INITIAL_FIELDS`
)

const updateInitialFields = createAction(
  `${FEATURE_NAME}/UPDATE_INITIAL_FIELDS`
)

const enableDeleteFieldsMode = createAction(
  `${FEATURE_NAME}/ENABLE_DELETE_FIELD_MODE`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

const updateFieldsToDelete = createAction(
  `${FEATURE_NAME}/UPDATE_FIELDS_TO_DELETE`
)

const cancelDeleteFieldsMode = createAction(
  `${FEATURE_NAME}/CANCEL_DELETE_FIELDS_MODE`
)

const confirmFieldsDeletion = () => (dispatch, getState) => {
  const state = getState()
  const markup = markupSelector(state)
  const fields = fieldsSelector(state)
  const fieldsToDelete = fieldsToDeleteSelector(state)
  const newFields = fields.filter((field) => fieldsToDelete.every((f) => f.code !== field.code))
  const assignedObjects = markup
    ? Markup.getAllObjects(markup).filter((markupObject) => fieldsToDelete.find((field) => field.code === markupObject.fieldCode))
    : []

  batch(() => {
    assignedObjects.forEach((markupObject) => {
      if (markupObject.typeName === LABEL_TYPE_NAME) {
        dispatch(updateLabelsWithSettings({
          ...markupObject,
          fieldCode: '',
          type: LabelType.UNASSIGNED,
          index: undefined
        }))
      } else {
        dispatch(updateTablesWithSettings({
          ...markupObject,
          fieldCode: '',
          index: undefined
        }))
      }
    })
    dispatch(storeFields(newFields))
    dispatch(cancelDeleteFieldsMode())
  })
}

export {
  enableDeleteFieldsMode,
  resetDefault,
  storeFields,
  storeInitialFields,
  updateFieldsToDelete,
  updateInitialFields,
  confirmFieldsDeletion,
  cancelDeleteFieldsMode
}
