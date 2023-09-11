
import PropTypes from 'prop-types'
import { FieldType } from '@/enums/FieldType'

class PairFieldMeta {
  constructor (keyType = FieldType.STRING, valueType = FieldType.STRING) {
    this.keyType = keyType
    this.valueType = valueType
  }
}

const pairFieldMetaShape = PropTypes.shape({
  keyType: PropTypes.oneOf(Object.values(FieldType)).isRequired,
  valueType: PropTypes.oneOf(Object.values(FieldType)).isRequired
})

class ListFieldMeta {
  constructor (baseType, baseTypeMeta) {
    this.baseType = baseType
    baseTypeMeta && (this.baseTypeMeta = baseTypeMeta)
  }
}

const listFieldMetaShape = PropTypes.shape({
  baseType: PropTypes.oneOf(Object.values(FieldType)).isRequired,
  baseTypeMeta: PropTypes.oneOfType([pairFieldMetaShape])
})

class EnumFieldMeta {
  constructor (options) {
    this.options = options
  }
}

const enumFieldMetaShape = PropTypes.shape({
  options: PropTypes.arrayOf(PropTypes.string)
})

export {
  listFieldMetaShape,
  ListFieldMeta,
  pairFieldMetaShape,
  PairFieldMeta,
  EnumFieldMeta,
  enumFieldMetaShape
}
