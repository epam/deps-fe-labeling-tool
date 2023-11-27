import { mockAction } from '@/mocks/mockAction'
import {
  resetDefault,
  storeFields,
  cancelDeleteFieldsMode,
  enableDeleteFieldsMode,
  storeInitialFields,
  updateInitialFields,
  updateFieldsToDelete
} from '@/actions/model'
import { modelReducer } from '@/reducers/model'

describe('Reducer: model', () => {
  let defaultState

  beforeEach(() => {
    defaultState = modelReducer(undefined, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(modelReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({ fieldsToDelete: undefined })
  })

  it('should update fields value when handling storeFields', () => {
    const MOCK_FIELDS = 'MOCK_FIELDS'

    expect(modelReducer(defaultState, storeFields(MOCK_FIELDS))).toEqual({
      ...defaultState,
      fields: MOCK_FIELDS
    })
  })

  it('should handle cancelDeleteFieldsMode action correctly', () => {
    const action = cancelDeleteFieldsMode()
    expect(modelReducer({}, action)).toEqual({ ...defaultState, fieldsToDelete: undefined })
  })

  it('should handle enableDeleteFieldsMode action correctly', () => {
    const action = enableDeleteFieldsMode()
    expect(modelReducer({}, action)).toEqual({ ...defaultState, fieldsToDelete: [] })
  })

  it('should handle storeInitialFields action correctly', () => {
    const MOCK_FIELDS = 'MOCK_FIELDS'
    const action = storeInitialFields(MOCK_FIELDS)
    expect(modelReducer({}, action)).toEqual({ ...defaultState, initialFields: MOCK_FIELDS })
  })

  it('should handle updateInitialFields action correctly', () => {
    const action = updateInitialFields()
    const defaultState = {
      fields: [{}]
    }
    expect(modelReducer(defaultState, action)).toEqual({ ...defaultState, initialFields: [...defaultState.fields] })
  })

  it('should handle updateFieldsToDelete action correctly', () => {
    const MOCK_FIELD = 'MOCK_FIELD'
    const action = updateFieldsToDelete(MOCK_FIELD)
    const defaultState = {
      fieldsToDelete: []
    }
    expect(modelReducer(defaultState, action)).toEqual({ ...defaultState, fieldsToDelete: [...defaultState.fieldsToDelete, MOCK_FIELD] })
  })
})
