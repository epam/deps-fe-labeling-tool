import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Tooltip } from '@/components/Tooltip'
import { FieldType } from '@/enums/FieldType'
import { fieldShape } from '@/models/Field'
import { labelShape, LabelType } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { tableShape, TABLE_TYPE_NAME } from '@/models/Table'
import { markupSelector } from '@/selectors/markup'
import { fieldsSelector } from '@/selectors/model'
import { COLORS } from '@/theme/theme.default'
import { IndexInput } from './IndexInput'
import {
  ObjectName,
  Wrapper,
  ObjectType
} from './ObjectNameAndIndex.styles'

const PAIR_NAME_SEPARATOR = '.'
const RESOURCE_UNASSIGNED = 'Unassigned'

const OBJECT_TYPE_TO_COLOR = {
  [LabelType.CHECKMARK]: COLORS.LABEL_CHECKMARK_BORDER,
  [LabelType.KEY]: COLORS.LABEL_KEY_BORDER,
  [LabelType.VALUE]: COLORS.LABEL_VALUE_BORDER,
  [LabelType.STRING]: COLORS.LABEL_STRING_BORDER,
  [LabelType.ENUM]: COLORS.LABEL_ENUM_BORDER,
  [LabelType.DATE]: COLORS.LABEL_DATE_BORDER,
  [TABLE_TYPE_NAME]: COLORS.TABLE_BORDER
}

const ObjectNameAndIndex = ({ object, onChange, fields, markup }) => {
  const indexAvailable = useMemo(
    () => {
      const { fieldType } = fields.find((f) => f.code === object.fieldCode) ?? {}
      return fieldType === FieldType.LIST
    },
    [object, fields]
  )

  const getKeyValuePairName = (name, type) => (
    <span>
      {`${name}${PAIR_NAME_SEPARATOR}`}
      <ObjectType>
        {type}
      </ObjectType>
    </span>
  )

  const getObjectColor = () => {
    if (!object.fieldCode) {
      return COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER
    }

    return OBJECT_TYPE_TO_COLOR[object.type ?? object.typeName]
  }

  const getUnassignedObjectName = () => {
    const allMarkupObjects = Markup.getAllObjects(markup)

    const filteredMarkupObjects = allMarkupObjects.filter((markupObject) => (
      !markupObject.fieldCode &&
      markupObject.typeName === object.typeName
    ))

    const objectIndex = filteredMarkupObjects.findIndex((markupObject) => (
      markupObject.uid === object.uid
    ))

    return `${RESOURCE_UNASSIGNED} ${object.typeName} ${objectIndex + 1}`
  }

  const getObjectName = () => {
    const objectName = fields.find((field) => field.code === object.fieldCode)?.name

    if (object.fieldCode === '') {
      return getUnassignedObjectName()
    }

    if (object.type === LabelType.KEY || object.type === LabelType.VALUE) {
      return getKeyValuePairName(objectName, object.type)
    }

    return objectName
  }

  return (
    <Wrapper>
      <ObjectName
        ellipsis={
          {
            tooltip: (
              <Tooltip
                title={object.typeName}
              >
                {getObjectName()}
              </Tooltip>
            )
          }
        }
        color={getObjectColor()}
      >
        {getObjectName()}
      </ObjectName>
      {
        indexAvailable &&
        (
          <IndexInput
            onChange={onChange}
            object={object}
            fields={fields}
          />
        )
      }
    </Wrapper>
  )
}

ObjectNameAndIndex.propTypes = {
  object: PropTypes.oneOfType([
    labelShape, tableShape
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  markup: markupShape.isRequired
}

const mapStateToProps = (state) => ({
  fields: fieldsSelector(state),
  markup: markupSelector(state)
})

const ConnectedComponent = connect(mapStateToProps)(ObjectNameAndIndex)

export {
  ConnectedComponent as ObjectNameAndIndex
}
