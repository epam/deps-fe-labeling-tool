import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabelsWithSettings, updateTablesWithSettings } from '@/actions/markup'
import { updateFieldsToDelete } from '@/actions/model'
import { deleteTemporaryFieldIndex } from '@/actions/ui'
import { Button, ButtonType } from '@/components/Button'
import { CheckmarkIcon } from '@/components/Icons/CheckmarkIcon'
import { DateFieldCalendarIcon } from '@/components/Icons/DateFieldCalendarIcon'
import { DownIcon } from '@/components/Icons/DownOutlined'
import { EnumIcon } from '@/components/Icons/EnumIcon'
import { FilledTrashIcon } from '@/components/Icons/FilledTrashIcon'
import { KeyValuePairIcon } from '@/components/Icons/KeyValuePairIcon'
import { StringIcon } from '@/components/Icons/StringIcon'
import { TableIcon } from '@/components/Icons/TableIcon'
import { TrashIcon } from '@/components/Icons/TrashIcon'
import { UpIcon } from '@/components/Icons/UpIcon'
import { IconSize32 } from '@/components/IconSize'
import { Tooltip } from '@/components/Tooltip'
import { GROUPING_TYPE } from '@/containers/AssignTo'
import { AssignToListItem } from '@/containers/AssignTo/AssignToListItem'
import { FieldType } from '@/enums/FieldType'
import { fieldShape, Field } from '@/models/Field'
import {
  Label,
  labelShape,
  LabelType,
  LABEL_TYPE_NAME
} from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { tableShape, TABLE_TYPE_NAME } from '@/models/Table'
import { markupSelector, pageSelectedMarkupObjectsSelector } from '@/selectors/markup'
import { fieldsToDeleteSelector } from '@/selectors/model'
import { assignToFieldsFilterSelector } from '@/selectors/ui'
import {
  PossibleNamesList,
  ListItemStyled,
  ListItemMetaStyled,
  StyledRequiredMark,
  HeaderStyled,
  CollapseStyled,
  LayoutStyled,
  TextHighlighter,
  DeleteFieldButton,
  DeleteListItemButton
} from './FieldsToAssign.styles'

const HEADER_HEIGHT = 20

const RESOURCE_KEY = 'Key'
const RESOURCE_VALUE = 'Value'
const RESOURCE_BOOLEAN = 'Boolean'
const RESOURCE_TABLE = 'Table'
const RESOURCE_TOOLTIP_REQUIRED_FIELD = 'Required field'

const FIELD_TYPE_TO_ICON = {
  [FieldType.CHECKMARK]: () => <IconSize32><CheckmarkIcon /></IconSize32>,
  [FieldType.STRING]: () => <IconSize32><StringIcon /></IconSize32>,
  [FieldType.PAIR]: () => <IconSize32><KeyValuePairIcon /></IconSize32>,
  [FieldType.TABLE]: () => <IconSize32><TableIcon /></IconSize32>,
  [FieldType.ENUM]: () => <IconSize32><EnumIcon /></IconSize32>,
  [FieldType.DATE]: () => <IconSize32><DateFieldCalendarIcon /></IconSize32>
}

const FIELD_TYPE_TO_COLLAPSE_NAME = {
  [FieldType.CHECKMARK]: 'CHECKBOXES',
  [FieldType.STRING]: 'STRINGS',
  [FieldType.PAIR]: 'KEY-VALUE PAIRS',
  [FieldType.TABLE]: 'TABLES',
  [FieldType.LIST]: 'LISTS',
  [FieldType.ENUM]: 'ENUMERATIONS',
  [FieldType.DATE]: 'DATES',
  ALL: 'ALL',
  REQUIRED: 'REQUIRED',
  OTHER: 'OTHER'
}

const ICON_POSITION = 'right'

const FieldsToAssign = ({
  fields,
  fieldsGrouping,
  filter,
  selectedMarkupObjects,
  updateLabelsWithSettings,
  updateTablesWithSettings,
  deleteTemporaryFieldIndex,
  updateFieldsToDelete,
  fieldsToDelete,
  markup
}) => {
  const [selectedObject] = selectedMarkupObjects

  const fieldsToDisplay = useMemo(() => {
    return fields.filter((field) => !fieldsToDelete?.includes(field))
  }, [fields, fieldsToDelete])

  const deleteTemporaryIndex = useCallback(
    (object) => (
      object.index !== undefined && deleteTemporaryFieldIndex(
        {
          code: object.fieldCode,
          index: object.index
        }
      )
    ), [deleteTemporaryFieldIndex]
  )

  const onLabelsChange = useCallback(
    (label) => {
      deleteTemporaryIndex(label)

      updateLabelsWithSettings(label)
    }, [deleteTemporaryIndex, updateLabelsWithSettings]
  )

  const onTablesChange = useCallback(
    (table) => {
      deleteTemporaryIndex(table)

      updateTablesWithSettings(table)
    }, [deleteTemporaryIndex, updateTablesWithSettings]
  )

  const isDisabled = useCallback(
    (type, fieldCode, index) => (
      !selectedObject ||
      selectedMarkupObjects.length > 1 ||
      selectedObject.typeName !== type ||
      (
        selectedObject.fieldCode === fieldCode &&
        selectedObject.index === index
      )
    ), [
      selectedMarkupObjects,
      selectedObject
    ]
  )

  const getLabelType = (fieldType) => {
    switch (fieldType) {
      case FieldType.CHECKMARK:
        return LabelType.CHECKMARK
      case FieldType.STRING:
        return LabelType.STRING
      case FieldType.PAIR:
        return LabelType.VALUE
      case FieldType.ENUM:
        return LabelType.ENUM
      case FieldType.DATE:
        return LabelType.DATE
      default:
        return LabelType.UNASSIGNED
    }
  }

  const onKeyClick = useCallback(
    (code, index) => {
      const content = Label.getStringContent(selectedObject)
      return (
        onLabelsChange(
          {
            ...selectedObject,
            content,
            fieldCode: code,
            type: LabelType.KEY,
            index
          }
        )
      )
    }, [onLabelsChange, selectedObject]
  )

  const onBoolClick = useCallback(
    (code, index) => {
      const content = (selectedObject.content === true || selectedObject.content === false) ? selectedObject.content : null
      return (
        onLabelsChange(
          {
            ...selectedObject,
            content,
            fieldCode: code,
            type: LabelType.CHECKMARK,
            index
          }
        )
      )
    },
    [
      onLabelsChange,
      selectedObject
    ]
  )

  const onValueClick = useCallback(
    (code, fieldType, index) => {
      const content = Label.getStringContent(selectedObject)
      return (
        onLabelsChange(
          {
            ...selectedObject,
            content,
            fieldCode: code,
            type: getLabelType(fieldType),
            index
          }
        )
      )
    }, [onLabelsChange, selectedObject]
  )

  const onTableClick = useCallback(
    (code, index) => (
      onTablesChange(
        {
          ...selectedObject,
          fieldCode: code,
          index
        }
      )
    ), [onTablesChange, selectedObject]
  )

  const deleteListItem = useCallback(
    (fieldCode, fieldType, index) => {
      const assignedObjects = markup
        ? Markup.getAllObjects(markup).filter((obj) =>
          obj.fieldCode === fieldCode &&
          obj.index === index
        )
        : []

      if (!assignedObjects.length) {
        return deleteTemporaryFieldIndex(
          {
            code: fieldCode,
            index: index
          }
        )
      }

      if (fieldType === TABLE_TYPE_NAME) {
        const [assignedTable] = assignedObjects

        return onTablesChange(
          {
            ...assignedTable,
            fieldCode: '',
            index: undefined
          }
        )
      }

      assignedObjects.forEach((label) => {
        onLabelsChange(
          {
            ...label,
            fieldCode: '',
            type: LabelType.UNASSIGNED,
            index: undefined
          }
        )
      })
    }, [
      deleteTemporaryFieldIndex,
      markup,
      onLabelsChange,
      onTablesChange
    ]
  )

  const renderDeleteListItemButton = useCallback(
    (fieldCode, fieldType, index) => (
      <DeleteListItemButton
        icon={<TrashIcon />}
        onClick={
          () => deleteListItem(fieldCode, fieldType, index)
        }
      />
    ), [deleteListItem]
  )

  const renderDeleteFieldButton = useCallback(
    (field) => (
      <DeleteFieldButton
        icon={<FilledTrashIcon />}
        onClick={() => updateFieldsToDelete(field)}
      />
    ), [updateFieldsToDelete])

  const renderKeyButton = useCallback(
    (code, index) => (
      <Button
        onClick={
          () => onKeyClick(code, index)
        }
        disabled={isDisabled(LABEL_TYPE_NAME, code, index)}
        type={ButtonType.LINK}
        key={RESOURCE_KEY}
      >
        {RESOURCE_KEY}
      </Button>
    ), [isDisabled, onKeyClick]
  )

  const renderValueButton = useCallback(
    (code, fieldType, index) => (
      <Button
        onClick={
          () => onValueClick(code, fieldType, index)
        }
        disabled={isDisabled(LABEL_TYPE_NAME, code, index)}
        type={ButtonType.LINK}
        key={RESOURCE_VALUE}
      >
        {RESOURCE_VALUE}
      </Button>
    ), [isDisabled, onValueClick]
  )

  const renderBoolButton = useCallback(
    (code, index) => (
      <Button
        onClick={
          () => onBoolClick(code, index)
        }
        disabled={isDisabled(LABEL_TYPE_NAME, code, index)}
        type={ButtonType.LINK}
        key={RESOURCE_BOOLEAN}
      >
        {RESOURCE_BOOLEAN}
      </Button>
    ), [
      isDisabled,
      onBoolClick
    ]
  )

  const renderTableButton = useCallback(
    (code, index) => (
      <Button
        onClick={
          () => onTableClick(code, index)
        }
        disabled={isDisabled(TABLE_TYPE_NAME, code, index)}
        type={ButtonType.LINK}
        key={RESOURCE_TABLE}
      >
        {RESOURCE_TABLE}
      </Button>
    ), [isDisabled, onTableClick]
  )

  const renderListItemButtons = useCallback(
    (code, fieldType, index) => {
      if (Field.hasPair(fields, code) && !fieldsToDelete) {
        return [
          renderKeyButton(code, index),
          renderValueButton(code, fieldType, index)
        ]
      }

      if (fieldType === TABLE_TYPE_NAME && !fieldsToDelete) {
        return [renderTableButton(code, index)]
      }

      if (fieldType === FieldType.CHECKMARK && !fieldsToDelete) {
        return [renderBoolButton(code, index)]
      }

      return !fieldsToDelete && [renderValueButton(code, fieldType, index)]
    }, [
      fields,
      renderBoolButton,
      renderKeyButton,
      renderTableButton,
      renderValueButton,
      fieldsToDelete
    ]
  )

  const requiredMark = useMemo(() => (
    <Tooltip title={RESOURCE_TOOLTIP_REQUIRED_FIELD}>
      <StyledRequiredMark>*</StyledRequiredMark>
    </Tooltip>
  ), [])

  const renderListItem = useCallback(
    (field) => {
      const listIcon = FIELD_TYPE_TO_ICON[field.fieldMeta.baseType]()

      return (
        <AssignToListItem
          field={field}
          listIcon={listIcon}
          renderActions={renderListItemButtons}
          requiredMark={requiredMark}
          renderDeleteButton={renderDeleteListItemButton}
        />
      )
    }, [
      renderDeleteListItemButton,
      renderListItemButtons,
      requiredMark
    ]
  )

  const renderItem = useCallback(
    (field) => (
      <ListItemStyled
        actions={renderListItemButtons?.(field.code, field.fieldType)}
      >
        {FIELD_TYPE_TO_ICON[field.fieldType]()}
        <ListItemMetaStyled
          title={
            <TextHighlighter
              searchTerm={filter}
              text={field.name}
            />
          }
          description={field.required && requiredMark}
        />
        {fieldsToDelete && renderDeleteFieldButton(field)}
      </ListItemStyled>
    ),
    [
      filter,
      renderListItemButtons,
      requiredMark,
      fieldsToDelete,
      renderDeleteFieldButton
    ]
  )

  const renderer = useCallback(
    (field) => (
      field.fieldType === FieldType.LIST ? renderListItem(field) : renderItem(field)
    ), [renderItem, renderListItem]
  )

  const GROUPING_TYPE_TO_RENDER = useMemo(() => ({
    [GROUPING_TYPE.ALL]: () => ({
      ALL: [...fieldsToDisplay]
    }),
    [GROUPING_TYPE.FIELD_TYPE]: () => (
      fieldsToDisplay.reduce((acc, field) => {
        if (!acc[field.fieldType]) {
          acc[field.fieldType] = []
        }
        field.required ? acc[field.fieldType].unshift(field) : acc[field.fieldType].push(field)
        return acc
      }, {})
    ),
    [GROUPING_TYPE.REQUIRED_FIRST]: () => (
      fieldsToDisplay.reduce((acc, field) => {
        field.required ? acc.REQUIRED.push(field) : acc.OTHER.push(field)
        return acc
      }, {
        REQUIRED: [],
        OTHER: []
      })
    )
  }), [fieldsToDisplay])

  return (
    <LayoutStyled height={HEADER_HEIGHT} >
      {
        Object.entries(GROUPING_TYPE_TO_RENDER[fieldsGrouping]()).map(([fieldType, fieldsToDisplay]) => (
          <CollapseStyled
            key={`${fieldsGrouping}.${fieldType}`}
            defaultActiveKey={Object.keys(FIELD_TYPE_TO_COLLAPSE_NAME)}
            header={
              <HeaderStyled>
                {FIELD_TYPE_TO_COLLAPSE_NAME[fieldType]}
              </HeaderStyled>
            }
            collapseId={fieldType}
            expandIconPosition={ICON_POSITION}
            expandIcon={({ isActive }) => isActive ? <DownIcon /> : <UpIcon />}
          >
            <PossibleNamesList
              dataSource={fieldsToDisplay}
              renderItem={renderer}
            />
          </CollapseStyled>
        )
        )
      }
    </LayoutStyled>
  )
}

FieldsToAssign.propTypes = {
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  fieldsGrouping: PropTypes.string,
  filter: PropTypes.string.isRequired,
  selectedMarkupObjects: PropTypes.arrayOf(
    PropTypes.oneOfType([
      labelShape, tableShape
    ])
  ),
  updateLabelsWithSettings: PropTypes.func.isRequired,
  updateTablesWithSettings: PropTypes.func.isRequired,
  deleteTemporaryFieldIndex: PropTypes.func.isRequired,
  updateFieldsToDelete: PropTypes.func.isRequired,
  markup: markupShape,
  fieldsToDelete: PropTypes.arrayOf(fieldShape)
}

const mapStateToProps = (state) => ({
  selectedMarkupObjects: pageSelectedMarkupObjectsSelector(state),
  filter: assignToFieldsFilterSelector(state),
  markup: markupSelector(state),
  fieldsToDelete: fieldsToDeleteSelector(state)
})

const mapDispatchToProps = {
  updateLabelsWithSettings,
  updateTablesWithSettings,
  deleteTemporaryFieldIndex,
  updateFieldsToDelete
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(FieldsToAssign)

export {
  ConnectedComponent as FieldsToAssign
}
