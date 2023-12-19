import React, { useCallback } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { selectTables } from '@/actions/markup'
import { fieldShape } from '@/models/Field'
import { Markup, markupShape } from '@/models/Markup'
import { tableShape } from '@/models/Table'
import { markupSelector } from '@/selectors/markup'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { MARKUP_OBJECT_TYPE_TO_ICON } from './MarkupObjectToIcon'

const TableMarkupObject = ({
  markup,
  table,
  field,
  selectTables
}) => {
  const objectPage = Markup.getPageByObjectUid(markup, table.uid)

  const onHeaderClick = useCallback(() => {
    selectTables(objectPage, [table])
  }, [objectPage, selectTables, table])

  return (
    <MarkupObjectHeader
      key={table.uid}
      page={objectPage}
      unassigned={table.fieldCode === ''}
      name={`${field.name} ${table?.index ?? ''}`}
      onHeaderClick={onHeaderClick}
      icon={MARKUP_OBJECT_TYPE_TO_ICON[table.typeName]}
    />
  )
}

TableMarkupObject.propTypes = {
  markup: markupShape,
  table: tableShape,
  field: fieldShape,
  selectTables: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state)
})

const mapDispatchToProps = {
  selectTables
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TableMarkupObject)

export {
  ConnectedComponent as TableMarkupObject
}
