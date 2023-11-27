import { Validator } from 'jsonschema'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Direction } from '@/enums/Rotation'
import { Rectangle } from './Rectangle'

const LABEL_ERROR_MESSAGE = 'Label is invalid'

const LabelType = {
  CHECKMARK: 'checkmark',
  KEY: 'key',
  VALUE: 'value',
  STRING: 'string',
  ENUM: 'enum',
  DATE: 'date',
  UNASSIGNED: 'unassigned'
}

const LABEL_TYPE_NAME = 'label'

const LABEL_SHIFT_COEFFICIENT = 1.01

class Label {
  typeName = LABEL_TYPE_NAME

  constructor (x, y, w, h, fieldCode = '', index, type = LabelType.UNASSIGNED, content = null, meta = {}, confidence) {
    this.uid = uuidv4()
    this.x = +(x.toFixed(12))
    this.y = +(y.toFixed(12))
    this.w = +(w.toFixed(12))
    this.h = +(h.toFixed(12))
    this.fieldCode = fieldCode
    this.index = index
    this.type = type
    this.content = content
    this.meta = meta
    this.confidence = confidence
  }

  static isAssigned = (label) => !!label.fieldCode

  static isValid = (label) => {
    try {
      const validator = new Validator()
      const { valid } = validator.validate(label, labelSchema)
      if (!valid) {
        throw new Error(LABEL_ERROR_MESSAGE)
      }
      return true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return false
    }
  }

  static fromRectangle = (rectangle) => {
    const label = new Label(
      rectangle.x,
      rectangle.y,
      rectangle.w,
      rectangle.h
    )

    return label
  }

  static toRectangle = (label) => {
    return new Rectangle(
      label.x,
      label.y,
      label.w,
      label.h
    )
  }

  static getName = (label) => {
    const { fieldCode, index, type } = label
    const idx = index !== undefined ? `.${index}` : ''
    return fieldCode && type ? `${fieldCode}${idx}.${type}` : ''
  }

  static scale = (label, scale) => ({
    ...label,
    ...Rectangle.scale(label, scale)
  })

  static areSame = (label1, label2) => (
    label1.fieldCode === label2.fieldCode &&
    label1.type === label2.type &&
    label1.index === label2.index
  )

  static getSameLabel = (label, allLabels) => allLabels.find((l) => Label.areSame(l, label))

  static getSameLabels = (label, allLabels) => allLabels.filter((l) => Label.areSame(l, label))

  static getSameFieldCodeTypeLabels = (label, allLabels) => allLabels.filter(
    (l) => l.fieldCode === label.fieldCode && l.type === label.type
  )

  static duplicate = (label) => new Label(
    label.x,
    label.y,
    label.w,
    label.h,
    undefined,
    undefined,
    undefined,
    label.content,
    { ...label.meta },
    label.confidence
  )

  static shift = (label) => ({
    ...label,
    x: label.x * LABEL_SHIFT_COEFFICIENT,
    y: label.y * LABEL_SHIFT_COEFFICIENT
  })

  static rotate = (label, direction) => {
    const x = direction === Direction.CLOCKWISE ? 1 - (label.y + label.h) : label.y
    const y = direction === Direction.CLOCKWISE ? label.x : 1 - (label.x + label.w)

    return ({
      ...label,
      x,
      y,
      w: label.h,
      h: label.w
    })
  }

  static getStringContent = (label) => {
    if (label.content === null) {
      return ''
    }
    return label.content.toString()
  }
}

const labelShape = PropTypes.shape({
  typeName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  fieldCode: PropTypes.string.isRequired,
  index: PropTypes.number,
  type: PropTypes.oneOf(
    Object.values(LabelType)
  ).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  meta: PropTypes.objectOf(PropTypes.any),
  confidence: PropTypes.number
})

const labelSchema = {
  type: 'object',
  properties: {
    uid: { type: 'string' },
    x: { type: 'number' },
    y: { type: 'number' },
    w: { type: 'number' },
    h: { type: 'number' },
    fieldCode: { type: 'string' },
    index: { type: 'integer' },
    type: { enum: Object.values(LabelType) },
    content: {
      type: {
        oneOf: [
          {
            type: 'string'
          },
          {
            type: 'boolean'
          },
          {
            type: 'null'
          }
        ]
      }
    },
    confidence: {
      type: {
        oneOf: [
          {
            type: 'number'
          },
          {
            type: 'null'
          }
        ]
      }
    },
    meta: { type: 'object' },
    typeName: { enum: ['label'] }
  },
  additionalProperties: false,
  required: ['x', 'y', 'w', 'h']
}

export {
  LABEL_TYPE_NAME,
  LabelType,
  labelShape,
  labelSchema,
  Label
}
