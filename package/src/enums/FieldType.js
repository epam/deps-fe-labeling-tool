const FieldType = {
  CHECKMARK: 'checkmark',
  ENUM: 'enum',
  LIST: 'list',
  PAIR: 'pair',
  STRING: 'string',
  TABLE: 'table',
  DATE: 'date'
}

const RESOURCE_FIELD_TYPE = {
  [FieldType.STRING]: 'String',
  [FieldType.ENUM]: 'Enumeration',
  [FieldType.CHECKMARK]: 'Checkbox',
  [FieldType.LIST]: 'List',
  [FieldType.PAIR]: 'Key Value Pair',
  [FieldType.TABLE]: 'Table',
  [FieldType.DATE]: 'Date'
}

export {
  FieldType,
  RESOURCE_FIELD_TYPE
}
