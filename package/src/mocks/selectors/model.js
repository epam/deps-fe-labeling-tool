const { FieldType } = require('@/enums/FieldType')
const { Field } = require('@/models/Field')
const { ListFieldMeta, EnumFieldMeta } = require('@/models/FieldMeta')

const mockFields = [
  new Field('123', 'TestField', FieldType.STRING),
  new Field('enum', 'TestField', FieldType.ENUM, { options: ['test', 'test1'] }),
  new Field(
    'enumList',
    'EnumerationList',
    FieldType.LIST,
    new ListFieldMeta(
      FieldType.ENUM,
      new EnumFieldMeta(['test', 'test1'])
    )
  )
]

const mockListField = [
  new Field('456', 'TestListField', FieldType.LIST)
]

const fieldsSelector = jest.fn(() => mockFields)

const initialFieldsSelector = jest.fn(() => mockFields)

const listFieldsSelector = jest.fn(() => mockListField)

const fieldsToDeleteSelector = jest.fn(() => [mockFields[0]])

const mockModelSelectors = {
  fieldsSelector,
  initialFieldsSelector,
  listFieldsSelector,
  fieldsToDeleteSelector
}

export {
  mockModelSelectors
}
