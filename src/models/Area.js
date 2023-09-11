import { Validator } from 'jsonschema'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Direction } from '@/enums/Rotation'
import { Rectangle } from './Rectangle'

const AREA_ERROR_MESSAGE = 'Area is invalid'

const AREA_TYPE_NAME = 'area'

const AREA_SHIFT_COEFFICIENT = 1.01

class Area {
  typeName = AREA_TYPE_NAME

  constructor (x, y, w, h, meta = {}) {
    this.uid = uuidv4()
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.meta = meta
  }

  static isValid = (area) => {
    try {
      const validator = new Validator()
      const { valid } = validator.validate(area, areaSchema)
      if (!valid) {
        throw new Error(AREA_ERROR_MESSAGE)
      }
      return true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return false
    }
  }

  static fromRectangle = (rectangle) => (
    new Area(
      rectangle.x,
      rectangle.y,
      rectangle.w,
      rectangle.h
    )
  )

  static toRectangle = (area) => (
    new Rectangle(
      area.x,
      area.y,
      area.w,
      area.h
    )
  )

  static scale = (area, scale) => ({
    ...area,
    ...Rectangle.scale(area, scale)
  })

  static duplicate = (area) => new Area(
    area.x,
    area.y,
    area.w,
    area.h,
    { ...area.meta }
  )

  static shift = (area) => ({
    ...area,
    x: area.x * AREA_SHIFT_COEFFICIENT,
    y: area.y * AREA_SHIFT_COEFFICIENT
  })

  static rotate = (area, direction) => {
    const x = direction === Direction.CLOCKWISE ? 1 - (area.y + area.h) : area.y
    const y = direction === Direction.CLOCKWISE ? area.x : 1 - (area.x + area.w)
    return ({
      ...area,
      x,
      y,
      w: area.h,
      h: area.w
    })
  }
}

const areaShape = PropTypes.shape({
  typeName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  meta: PropTypes.objectOf(PropTypes.any)
})

const areaSchema = {
  type: 'object',
  required: ['x', 'y', 'w', 'h'],
  properties: {
    h: { type: 'number' },
    meta: { type: 'object' },
    typeName: { enum: ['area'] },
    uid: { type: 'string' },
    w: { type: 'number' },
    x: { type: 'number' },
    y: { type: 'number' }
  },
  additionalProperties: false
}

export {
  AREA_TYPE_NAME,
  areaShape,
  areaSchema,
  Area
}
