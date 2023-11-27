import React, {
  useMemo,
  useCallback,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMarkupObjectsFilter, setExpandedListKeys } from '@/actions/ui'
import { CollapseIcon } from '@/components/Icons/CollapseIcon'
import { ExpandIcon } from '@/components/Icons/ExpandIcon'
import { Tooltip } from '@/components/Tooltip'
import {
  Group,
  FieldsViewSwitcher
} from '@/containers/FieldsViewSwitcher'
import { MarkupObjects } from '@/containers/MarkupObjects'
import { SearchInput } from '@/containers/SearchInput'
import { FieldType } from '@/enums/FieldType'
import { fieldShape } from '@/models/Field'
import { documentNameSelector, extraNameSelector } from '@/selectors/document'
import { fieldsSelector } from '@/selectors/model'
import { markupObjectsFilterSelector, expandedListKeysSelector } from '@/selectors/ui'
import {
  ButtonIcon,
  DocumentName,
  ExtraIcons,
  FiltersWrapper,
  Collapse
} from './AllMarkupObjects.styles'

const RESOURCE_EXPAND_ALL_BUTTON_TEXT = 'Expand all'
const RESOURCE_COLLAPSE_ALL_BUTTON_TEXT = 'Collapse all'
const RESOURCE_VIEW_ALL = 'View all'
const RESOURCE_FIELD_TYPE = 'View according to field type'

const GROUPING_TYPE = {
  VIEW_ALL: 'viewAll',
  FIELD_TYPE: 'fieldType'
}

const FIELDS_GROUPS = [
  new Group(GROUPING_TYPE.VIEW_ALL, RESOURCE_VIEW_ALL),
  new Group(GROUPING_TYPE.FIELD_TYPE, RESOURCE_FIELD_TYPE)
]

const AllMarkupObjects = ({
  documentName,
  extraName,
  fields,
  markupObjectsFilter,
  setMarkupObjectsFilter,
  expandedListKeys,
  setExpandedListKeys
}) => {
  const [fieldsGrouping, setFieldsGrouping] = useState(GROUPING_TYPE.VIEW_ALL)
  const [activeDocument, setActiveDocument] = useState(documentName)

  const onChangeFilter = useCallback(
    (value) => {
      setMarkupObjectsFilter(value)
    }, [setMarkupObjectsFilter]
  )

  const allListKeys = useMemo(() => fields
    .filter(({ fieldType }) => fieldType === FieldType.LIST)
    .map((field) => field.code)
  , [fields])

  const areAllListsExpanded = useMemo(() => {
    return (
      allListKeys.length === expandedListKeys.length &&
      allListKeys.every((key) => expandedListKeys.includes(key))
    )
  }, [expandedListKeys, allListKeys])

  const collapseAll = useCallback((e) => {
    e.stopPropagation()
    setExpandedListKeys([])
  }, [setExpandedListKeys])

  const expandAll = useCallback((e) => {
    e.stopPropagation()
    setExpandedListKeys(allListKeys)
  }, [allListKeys, setExpandedListKeys])

  const isExtraVisible = useMemo(() => (
    !!activeDocument && !!allListKeys.length
  ), [activeDocument, allListKeys])

  const toggleActiveDocument = useCallback((e) => {
    setActiveDocument((activeDocument) => activeDocument ? '' : documentName)
  }, [documentName])

  const renderExtra = useMemo(() => (
    isExtraVisible && (
      <ExtraIcons>
        <Tooltip title={RESOURCE_COLLAPSE_ALL_BUTTON_TEXT}>
          <ButtonIcon
            disabled={!expandedListKeys.length}
            onClick={collapseAll}
            icon={<CollapseIcon />}
          >
          </ButtonIcon>
        </Tooltip>
        <Tooltip title={RESOURCE_EXPAND_ALL_BUTTON_TEXT}>
          <ButtonIcon
            disabled={areAllListsExpanded}
            icon={<ExpandIcon />}
            onClick={expandAll}
          >
          </ButtonIcon>
        </Tooltip>
      </ExtraIcons>
    )
  ), [
    areAllListsExpanded,
    collapseAll,
    expandAll,
    expandedListKeys.length,
    isExtraVisible
  ])

  return (
    <Collapse
      activeKey={activeDocument}
      collapseId={documentName}
      onChange={toggleActiveDocument}
      header={
        <DocumentName>
          {`${extraName} | ${documentName}`}
        </DocumentName>
      }
      extra={renderExtra}
    >
      <FiltersWrapper>
        <SearchInput
          value={markupObjectsFilter}
          onChange={onChangeFilter}
        />
        <FieldsViewSwitcher
          groups={FIELDS_GROUPS}
          setFieldsGrouping={setFieldsGrouping}
        />
      </FiltersWrapper>
      <MarkupObjects
        fieldsGrouping={fieldsGrouping}
        setFilter={onChangeFilter}
      />
    </Collapse>
  )
}

AllMarkupObjects.propTypes = {
  documentName: PropTypes.string,
  extraName: PropTypes.string,
  fields: PropTypes.arrayOf(fieldShape),
  markupObjectsFilter: PropTypes.string.isRequired,
  setMarkupObjectsFilter: PropTypes.func.isRequired,
  expandedListKeys: PropTypes.arrayOf(PropTypes.string),
  setExpandedListKeys: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  documentName: documentNameSelector(state),
  extraName: extraNameSelector(state),
  fields: fieldsSelector(state),
  markupObjectsFilter: markupObjectsFilterSelector(state),
  expandedListKeys: expandedListKeysSelector(state)
})

const mapDispatchToProps = {
  setMarkupObjectsFilter,
  setExpandedListKeys
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AllMarkupObjects)

export {
  ConnectedComponent as AllMarkupObjects
}
