import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NothingFound } from '@/components/NothingFound'
import { FieldType } from '@/enums/FieldType'
import { Field, fieldShape } from '@/models/Field'
import { LabelType, LABEL_TYPE_NAME } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { TABLE_TYPE_NAME } from '@/models/Table'
import { markupSelector } from '@/selectors/markup'
import { fieldsSelector } from '@/selectors/model'
import { markupObjectsFilterSelector } from '@/selectors/ui'
import { ListOfMarkupObjects } from './ListOfMarkupObjects'
import {
  GapWrapper,
  GroupTitle
} from './MarkupObjects.styles'
import { PairsMarkupObject } from './PairsMarkupObject'
import { PrimitiveMarkupObjects } from './PrimitiveMarkupObjects'
import { TableMarkupObject } from './TableMarkupObject'
import { UnassignedMarkupObject } from './UnassignedMarkupObject'

const RESOURCE_CHECKMARK_GROUP_NAME = 'CHECKBOXES'
const RESOURCE_LISTS_GROUP_NAME = 'LISTS'
const RESOURCE_TABLE_GROUP_NAME = 'TABLES'
const RESOURCE_PAIR_GROUP_NAME = 'KEY-VALUE PAIRS'
const RESOURCE_STRING_GROUP_NAME = 'STRINGS'
const RESOURCE_ENUM_GROUP_NAME = 'ENUMERATIONS'
const RESOURCE_DATE_GROUP_NAME = 'DATES'
const RESOURCE_UNASSIGNED_GROUP_NAME = 'UNASSIGNED'
const UNASSIGNED_GROUP_CODE = 'unassigned'

const FIELD_TYPE_TO_COMPONENT = {
  [FieldType.CHECKMARK]: (markup, field, index) => <PrimitiveMarkupObjects key={field.code + index} markupObjects={markup} field={field} />,
  [FieldType.LIST]: (markup, field, index) => <ListOfMarkupObjects key={field.code + index} markupObjects={markup} field={field} renderMapper={FIELD_TYPE_TO_COMPONENT} />,
  [FieldType.TABLE]: ([table], field, index) => <TableMarkupObject key={table.uid} table={table} field={field} />,
  [FieldType.PAIR]: (markup, field, index) => <PairsMarkupObject key={field.code + index} markupObjects={markup} field={field} />,
  [FieldType.STRING]: (markup, field, index) => <PrimitiveMarkupObjects key={field.code + index} markupObjects={markup} field={field} />,
  [FieldType.ENUM]: (markup, field, index) => <PrimitiveMarkupObjects key={field.code + index} markupObjects={markup} field={field} />,
  [FieldType.DATE]: (markup, field, index) => <PrimitiveMarkupObjects key={field.code + index} markupObjects={markup} field={field} />
}

const UNASSIGNED_TABLE = {
  NAME: `${LabelType.UNASSIGNED} ${TABLE_TYPE_NAME}`,
  CODE: '_unassigned_tables'
}

const UNASSIGNED_LABEL = {
  NAME: `${LabelType.UNASSIGNED} ${LABEL_TYPE_NAME}`,
  CODE: '_unassigned_labels'
}

const GROUPING_TYPE = {
  VIEW_ALL: 'viewAll',
  FIELD_TYPE: 'fieldType'
}

class SortGroup {
  constructor (code, name, elements) {
    this.code = code
    this.name = name
    this.elements = elements
  }
}

const FIELD_TYPE_TO_GROUP_TITLE = {
  [FieldType.CHECKMARK]: RESOURCE_CHECKMARK_GROUP_NAME,
  [FieldType.ENUM]: RESOURCE_ENUM_GROUP_NAME,
  [FieldType.LIST]: RESOURCE_LISTS_GROUP_NAME,
  [FieldType.TABLE]: RESOURCE_TABLE_GROUP_NAME,
  [FieldType.PAIR]: RESOURCE_PAIR_GROUP_NAME,
  [FieldType.STRING]: RESOURCE_STRING_GROUP_NAME,
  [FieldType.DATE]: RESOURCE_DATE_GROUP_NAME
}

const UNASSIGNED_FIELD_TABLE = new Field(UNASSIGNED_TABLE.CODE, UNASSIGNED_TABLE.NAME, FieldType.TABLE)
const UNASSIGNED_FIELD_LABEL = new Field(UNASSIGNED_LABEL.CODE, UNASSIGNED_LABEL.NAME, FieldType.STRING)

const DEFAULT_UNASSIGNED_COMPONENT = (markup, field) => (
  <UnassignedMarkupObject
    key={field.name}
    markupObjects={markup}
    field={field}
  />
)

const VIEW_GROUP_TO_TABS = {
  [GROUPING_TYPE.VIEW_ALL]: (toRender) => (
    <GapWrapper>
      {
        toRender.map(([config, markupObjects], i) => {
          const renderer = getRenderer(config)
          return renderer(markupObjects, config, i)
        })
      }
    </GapWrapper>
  ),
  [GROUPING_TYPE.FIELD_TYPE]: (toRender) => {
    const groupsToRender = toRender.reduce((acc, [config, markupObjects], i) => {
      const renderer = getRenderer(config)

      if (isUnassigned(config)) {
        const group = acc.find((g) => g.code === UNASSIGNED_GROUP_CODE)
        group
          ? group.elements = [...group.elements, renderer(markupObjects, config)]
          : acc = [
            ...acc,
            new SortGroup(
              UNASSIGNED_GROUP_CODE,
              RESOURCE_UNASSIGNED_GROUP_NAME,
              renderer(markupObjects, config, i)
            )
          ]
        return acc
      }

      const group = acc.find((g) => g.code === config.fieldType)
      group
        ? group.elements = [...group.elements, renderer(markupObjects, config)]
        : acc = [
          ...acc,
          new SortGroup(
            config.fieldType,
            FIELD_TYPE_TO_GROUP_TITLE[config.fieldType],
            [renderer(markupObjects, config, i)]
          )
        ]
      return acc
    }, [])

    return groupsToRender.map((group) => (
      <React.Fragment key={group.code}>
        <GroupTitle>
          {group.name}
        </GroupTitle>
        <GapWrapper>
          {group.elements}
        </GapWrapper>
      </React.Fragment>
    ))
  }
}

const isUnassigned = (field) => (
  field === UNASSIGNED_FIELD_TABLE ||
  field === UNASSIGNED_FIELD_LABEL
)

const getRenderer = (field) => {
  if (isUnassigned(field)) {
    return DEFAULT_UNASSIGNED_COMPONENT
  }

  return FIELD_TYPE_TO_COMPONENT[field.fieldType]
}

const getMarkupToRender = (markup, fields) => {
  const result = []

  fields.forEach((field) => {
    const markupToRender = markup.filter((markupObject) => (
      markupObject.fieldCode === field.code ||
      (
        field.code === UNASSIGNED_LABEL.CODE &&
        markupObject.fieldCode === '' &&
        markupObject.type === LabelType.UNASSIGNED
      ) ||
      (
        field.code === UNASSIGNED_TABLE.CODE &&
        markupObject.fieldCode === '' &&
        markupObject.typeName === TABLE_TYPE_NAME
      )
    ))

    if (markupToRender.length) {
      result.push([
        field,
        markupToRender
      ])
    }
  })

  return result
}

const MarkupObjects = ({
  fields,
  markupObjectsFilter,
  fieldsGrouping,
  markup,
  setFilter
}) => {
  const filteredFields = useMemo(
    () => {
      const allFields = [...fields, UNASSIGNED_FIELD_LABEL, UNASSIGNED_FIELD_TABLE]
      return allFields.filter((f) => f.name.toLowerCase().includes(markupObjectsFilter.toLowerCase()))
    },
    [fields, markupObjectsFilter]
  )

  const resetFilter = useCallback(() => {
    setFilter('')
  }, [setFilter])

  if (!markup) {
    return null
  }

  if (!filteredFields.length) {
    return <NothingFound resetFilter={resetFilter} />
  }

  const allMarkupObjects = Markup.getAllObjects(markup)
  const toRender = getMarkupToRender(allMarkupObjects, filteredFields)
  return VIEW_GROUP_TO_TABS[fieldsGrouping](toRender)
}

MarkupObjects.propTypes = {
  markup: markupShape,
  fields: PropTypes.arrayOf(fieldShape),
  markupObjectsFilter: PropTypes.string.isRequired,
  fieldsGrouping: PropTypes.string,
  setFilter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state),
  fields: fieldsSelector(state),
  markupObjectsFilter: markupObjectsFilterSelector(state)
})

const ConnectedComponent = connect(mapStateToProps)(MarkupObjects)

export {
  ConnectedComponent as MarkupObjects
}
