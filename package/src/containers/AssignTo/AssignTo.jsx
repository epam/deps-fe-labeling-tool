import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAssignToFieldsFilter } from '@/actions/ui'
import { NothingFound } from '@/components/NothingFound'
import { AddFieldDrawer } from '@/containers/AddFieldDrawer'
import { FieldsDeleteModeManager } from '@/containers/FieldsDeleteModeManager'
import { FieldsToAssign } from '@/containers/FieldsToAssign'
import { FieldsViewSwitcher, Group } from '@/containers/FieldsViewSwitcher'
import { SearchInput } from '@/containers/SearchInput'
import { Feature } from '@/enums/Feature'
import { fieldShape } from '@/models/Field'
import { Settings, settingsShape } from '@/models/Settings'
import { fieldsSelector, fieldsToDeleteSelector } from '@/selectors/model'
import { settingsSelector } from '@/selectors/settings'
import { assignToFieldsFilterSelector } from '@/selectors/ui'
import {
  ContentWrapper,
  FiltersWrapper,
  FieldsManagingWrapper
} from './AssignTo.styles'

const GROUPING_TYPE = {
  ALL: 'View All',
  FIELD_TYPE: 'View according to field type',
  REQUIRED_FIRST: 'View required fields first'
}

const FIELDS_GROUPS = [
  new Group(GROUPING_TYPE.ALL, GROUPING_TYPE.ALL),
  new Group(GROUPING_TYPE.REQUIRED_FIRST, GROUPING_TYPE.REQUIRED_FIRST),
  new Group(GROUPING_TYPE.FIELD_TYPE, GROUPING_TYPE.FIELD_TYPE)
]

const AssignTo = ({
  fields,
  filter,
  setAssignToFieldsFilter,
  settings,
  fieldsToDelete
}) => {
  const [fieldsGrouping, setFieldsGrouping] = useState(GROUPING_TYPE.ALL)

  const onChangeFilter = useCallback(
    (value) => {
      setAssignToFieldsFilter(value)
    }, [setAssignToFieldsFilter]
  )

  const filteredFields = useMemo(
    () => fields.filter(
      (f) => f.name.toLowerCase().includes(filter.toLowerCase())
    ), [filter, fields]
  )

  const isNothingFound = useMemo(
    () => (
      !filteredFields.length && !!filter
    ), [filter, filteredFields]
  )

  return (
    <ContentWrapper>
      <FiltersWrapper>
        <SearchInput
          value={filter}
          onChange={onChangeFilter}
        />
        <FieldsViewSwitcher
          groups={Object.values(FIELDS_GROUPS)}
          setFieldsGrouping={setFieldsGrouping}
        />
      </FiltersWrapper>
      <FieldsManagingWrapper>
        {
          Settings.has(settings, Feature.MANAGE_FIELDS) &&
          <FieldsDeleteModeManager fieldsToDelete={fieldsToDelete} />
        }
        {
          Settings.has(settings, Feature.MANAGE_FIELDS) &&
          !fieldsToDelete &&
          <AddFieldDrawer />
        }
      </FieldsManagingWrapper>
      {
        isNothingFound
          ? (
            <NothingFound
              resetFilter={
                () => setAssignToFieldsFilter('')
              }
            />
          )
          : (
            <FieldsToAssign
              fields={filteredFields}
              fieldsGrouping={fieldsGrouping}
            />
          )
      }
    </ContentWrapper>
  )
}

AssignTo.propTypes = {
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  fieldsToDelete: PropTypes.arrayOf(fieldShape),
  filter: PropTypes.string.isRequired,
  setAssignToFieldsFilter: PropTypes.func.isRequired,
  settings: settingsShape.isRequired
}

const mapStateToProps = (state) => ({
  fields: fieldsSelector(state),
  fieldsToDelete: fieldsToDeleteSelector(state),
  filter: assignToFieldsFilterSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  setAssignToFieldsFilter
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignTo)

export {
  ConnectedComponent as AssignTo,
  GROUPING_TYPE
}
