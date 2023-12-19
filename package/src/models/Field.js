import PropTypes from 'prop-types'
import { FieldType } from '@/enums/FieldType'
import {
  enumFieldMetaShape,
  listFieldMetaShape,
  pairFieldMetaShape
} from '@/models/FieldMeta'

const PRIMITIVE_FIELD_TYPES = [FieldType.STRING, FieldType.PAIR, FieldType.TABLE]

class Field {
  constructor (code, name, fieldType, fieldMeta, required = false) {
    this.code = code
    this.name = name
    this.fieldType = fieldType
    fieldMeta && (this.fieldMeta = fieldMeta)
    this.required = required
  }

  static hasPair = (fields, fieldCode) => {
    const field = fields.find((f) => f.code === fieldCode)

    if (field.fieldType === FieldType.LIST) {
      return field.fieldMeta.baseType === FieldType.PAIR
    }

    return field.fieldType === FieldType.PAIR
  }

  static isPrimitive = (fields, fieldCode) => {
    const { fieldType } = fields.find((f) => f.code === fieldCode)
    return PRIMITIVE_FIELD_TYPES.includes(fieldType)
  }
}

const fieldShape = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(Object.values(FieldType)).isRequired,
  fieldMeta: PropTypes.oneOfType([
    enumFieldMetaShape,
    listFieldMetaShape,
    pairFieldMetaShape
  ]),
  index: PropTypes.number,
  required: PropTypes.bool.isRequired
})

export {
  fieldShape,
  Field
}
