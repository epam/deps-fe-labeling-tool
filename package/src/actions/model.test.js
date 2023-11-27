import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import {
  enableDeleteFieldsMode,
  resetDefault,
  storeFields,
  storeInitialFields,
  updateFieldsToDelete,
  updateInitialFields,
  confirmFieldsDeletion,
  cancelDeleteFieldsMode
} from '@/actions/model'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LabelType } from '@/models/Label'
import { Markup } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { fieldsSelector, fieldsToDeleteSelector } from '@/selectors/model'
import {
  updateLabelsWithSettings,
  updateTablesWithSettings
} from './markup'

jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)

const MOCK_FIELDS = 'MOCK_FIELDS'

describe('Actions: model', () => {
  it('should create storeFields action with correct type and payload', () => {
    const action = storeFields(MOCK_FIELDS)

    expect(action).toEqual({
      type: storeFields.toString(),
      payload: MOCK_FIELDS
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create enableDeleteFieldsMode action with correct type', () => {
    const action = enableDeleteFieldsMode()
    expect(action).toEqual({
      type: enableDeleteFieldsMode.toString()
    })
  })

  it('should create storeInitialFields action with correct type', () => {
    const action = storeInitialFields()
    expect(action).toEqual({
      type: storeInitialFields.toString()
    })
  })

  it('should create updateFieldsToDelete action with correct type', () => {
    const action = updateFieldsToDelete()
    expect(action).toEqual({
      type: updateFieldsToDelete.toString()
    })
  })

  it('should create updateInitialFields action with correct type', () => {
    const action = updateInitialFields()
    expect(action).toEqual({
      type: updateInitialFields.toString()
    })
  })

  it('should create cancelDeleteFieldsMode action with correct type', () => {
    const action = cancelDeleteFieldsMode()
    expect(action).toEqual({
      type: cancelDeleteFieldsMode.toString()
    })
  })

  describe('confirmFieldsDeletion', () => {
    let dispatch
    let getState

    const MOCK_STATE = 'MOCK_STATE'

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn(() => MOCK_STATE)
    })

    it('should call getState and markupSelector once', () => {
      confirmFieldsDeletion()(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
      expect(markupSelector).toHaveBeenCalledWith(MOCK_STATE)
    })

    it('should call fieldsSelector once', () => {
      confirmFieldsDeletion()(dispatch, getState)

      expect(fieldsSelector).toHaveBeenCalledWith(MOCK_STATE)
    })

    it('should call fieldsToDeleteSelector once', () => {
      confirmFieldsDeletion()(dispatch, getState)

      expect(fieldsToDeleteSelector).toHaveBeenCalledWith(MOCK_STATE)
    })

    it('should call updateLabelsWithSettings for each deleted label', () => {
      jest.clearAllMocks()

      fieldsToDeleteSelector.mockReturnValueOnce([
        new Field('MOCK_FIELD_1', 'StringField', FieldType.STRING)
      ])

      confirmFieldsDeletion()(dispatch, getState)

      const markup = markupSelector()
      const fields = fieldsToDeleteSelector()
      const assignedObjects = (
        Markup
          .getAllObjects(markup)
          .filter((markupObject) => (
            fields.find((field) => field.code === markupObject.fieldCode)
          ))
      )

      const labels = assignedObjects.filter((field) => field.fieldType === FieldType.STRING)

      labels.forEach((label, index) => {
        expect(dispatch).nthCalledWith(index)
        expect(updateLabelsWithSettings).nthCalledWith(
          index,
          {
            ...label,
            fieldCode: '',
            type: LabelType.UNASSIGNED,
            index: undefined
          }
        )
      })
    })

    it('should call updateTablesWithSettings for each deleted table', () => {
      jest.clearAllMocks()

      fieldsToDeleteSelector.mockReturnValueOnce([
        new Field('MOCK_FIELD_4', 'TableField', FieldType.TABLE)
      ])

      confirmFieldsDeletion()(dispatch, getState)

      const markup = markupSelector()
      const fields = fieldsToDeleteSelector()
      const assignedObjects = (
        Markup
          .getAllObjects(markup)
          .filter((markupObject) => (
            fields.find((field) => field.code === markupObject.fieldCode)
          ))
      )

      const tables = assignedObjects.filter((field) => field.fieldType === FieldType.TABLE)

      tables.forEach((table, index) => {
        expect(dispatch).nthCalledWith(index)
        expect(updateTablesWithSettings).nthCalledWith(
          index,
          {
            ...table,
            fieldCode: '',
            index: undefined
          }
        )
      })
    })

    it('should call storeFields and cancelDeleteFieldsMode once', () => {
      const fields = fieldsSelector()
      const fieldsToDelete = fieldsToDeleteSelector()
      const newFields = fields.filter((field) => fieldsToDelete.every((f) => f.code !== field.code))

      confirmFieldsDeletion()(dispatch, getState)

      expect(dispatch).nthCalledWith(1, storeFields(newFields))
      expect(dispatch).nthCalledWith(2, cancelDeleteFieldsMode())
    })
  })
})
