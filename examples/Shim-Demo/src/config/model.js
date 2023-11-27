import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { PairFieldMeta, ListFieldMeta, EnumFieldMeta } from '@/models/FieldMeta'

const fields = [
  new Field(
    'dates',
    'Dates',
    FieldType.DATE
  ),
  new Field(
    'firstName',
    'First Name',
    FieldType.STRING
  ),
  new Field(
    'lastName',
    'Last Name',
    FieldType.STRING,
    undefined,
    true
  ),
  new Field(
    'companyName',
    'Company Name',
    FieldType.STRING,
    undefined,
    true
  ),
  new Field(
    'city',
    'City',
    FieldType.ENUM,
    new EnumFieldMeta([
      'Anytown',
      'Sometown',
      'San Diego',
      'Los Angeles'
    ]),
    true
  ),
  new Field(
    'countryStates',
    'Country States',
    FieldType.LIST,
    new ListFieldMeta(FieldType.STRING),
    true
  ),
  new Field(
    'dateMatching',
    'Date Matching',
    FieldType.LIST,
    new ListFieldMeta(FieldType.CHECKMARK),
    true
  ),
  new Field(
    'date',
    'Date',
    FieldType.PAIR,
    new PairFieldMeta(FieldType.STRING, FieldType.STRING)
  ),
  new Field(
    'zipCodes',
    'Zip Codes',
    FieldType.LIST,
    new ListFieldMeta(
      FieldType.PAIR,
      new PairFieldMeta(FieldType.STRING, FieldType.STRING)
    ),
    true
  ),
  new Field(
    'homeAddress',
    'Home Address',
    FieldType.STRING
  ),
  new Field(
    'businessAddress',
    'Business Address',
    FieldType.PAIR,
    new PairFieldMeta(FieldType.STRING, FieldType.STRING),
    true
  ),
  new Field(
    'taxpayerSpousesInfo',
    'Taxpayer Spouse\'s Info',
    FieldType.TABLE
  ),
  new Field(
    'taxpayerInfo',
    'Taxpayer Info',
    FieldType.TABLE,
    undefined,
    true
  ),
  new Field(
    'tables',
    'Tables',
    FieldType.LIST,
    new ListFieldMeta(FieldType.TABLE)
  ),
  new Field(
    'uniqueIdentifier',
    'Unique Identifier',
    FieldType.PAIR,
    new PairFieldMeta(FieldType.STRING, FieldType.STRING)
  ),
  new Field(
    'signatory',
    'Signatory',
    FieldType.CHECKMARK
  ),
  new Field(
    'returnTranscript',
    'Return Transcript',
    FieldType.CHECKMARK
  ),
  new Field(
    'formNumbers',
    'Form Numbers',
    FieldType.LIST,
    new ListFieldMeta(
      FieldType.ENUM,
      new EnumFieldMeta([
        '1098',
        '5498',
        '1040'
      ])
    )
  )
]

export {
  fields
}
