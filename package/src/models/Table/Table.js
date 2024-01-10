import { Validator } from 'jsonschema'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { Direction } from '@/enums/Rotation'
import { CellsMerge, cellsMergeShape } from '@/models/Table/CellsMerge'
import { CellValue, cellValueShape } from '@/models/Table/CellValue'
import { tableSchema } from '@/models/Table/tableSchema'

const TABLE_ERROR_MESSAGE = 'Table is invalid'

const TABLE_TYPE_NAME = 'table'

const TABLE_SHIFT_COEFFICIENT = 1.01

class Table {
  typeName = TABLE_TYPE_NAME

  constructor (xGuidelines, yGuidelines, merges = [], values = [], meta = {}, fieldCode = '', index, uuid = uuidv4()) {
    this.uid = uuid
    this.xGuidelines = xGuidelines
    this.yGuidelines = yGuidelines
    this.merges = merges
    this.values = values
    this.meta = meta
    this.index = index
    this.fieldCode = fieldCode
  }

  static clone = (table) => (
    new Table(
      table.xGuidelines,
      table.yGuidelines,
      table.merges,
      table.values,
      table.meta,
      table.fieldCode,
      table.index
    )
  )

  static isValid = (table) => {
    try {
      const validator = new Validator()
      const { valid } = validator.validate(table, tableSchema)
      if (!valid) {
        throw new Error(TABLE_ERROR_MESSAGE)
      }
      return true
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
      return false
    }
  }

  static fromRectangle = (rectangle) => {
    const xGuidelines = [rectangle.x, rectangle.x + rectangle.w]
    const yGuidelines = [rectangle.y, rectangle.y + rectangle.h]
    return new Table(xGuidelines, yGuidelines)
  }

  static duplicate = (table) => new Table(
    [...table.xGuidelines],
    [...table.yGuidelines],
    [...table.merges],
    [...table.values],
    { ...table.meta }
  )

  static shift = (table) => ({
    ...table,
    xGuidelines: table.xGuidelines.map((xg) => xg * TABLE_SHIFT_COEFFICIENT),
    yGuidelines: table.yGuidelines.map((yg) => yg * TABLE_SHIFT_COEFFICIENT)
  })

  static getName = (table) => {
    const { fieldCode, index } = table
    const idx = index !== undefined ? `.${index}` : ''
    return fieldCode ? `${fieldCode}${idx}` : ''
  }

  static getSameTable = (table, allTables) => allTables.find(
    (t) => (t.fieldCode === table.fieldCode && t.index === table.index)
  )

  static getSameTablesByFieldCode = (allTables, fieldCode) => allTables.filter((t) => t.fieldCode === fieldCode)

  static rotate = (table, direction) => {
    const columns = table.xGuidelines.length - 1
    const rows = table.yGuidelines.length - 1

    const xGuidelines = direction === Direction.CLOCKWISE
      ? table.yGuidelines.map((item) => 1 - item).reverse()
      : table.yGuidelines

    const yGuidelines = direction === Direction.CLOCKWISE
      ? table.xGuidelines
      : table.xGuidelines.map((item) => 1 - item).reverse()

    return ({
      ...table,
      xGuidelines,
      yGuidelines,
      merges: table.merges.map((cm) => CellsMerge.rotate(cm, direction, columns, rows)),
      values: table.values.map((cv) => CellValue.rotate(cv, direction, columns, rows))
    })
  }
}

const tableShape = PropTypes.shape({
  typeName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  xGuidelines: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  yGuidelines: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  merges: PropTypes.arrayOf(
    cellsMergeShape
  ).isRequired,
  values: PropTypes.arrayOf(
    cellValueShape
  ).isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  fieldCode: PropTypes.string,
  index: PropTypes.number
})

export {
  TABLE_TYPE_NAME,
  tableShape,
  Table
}
