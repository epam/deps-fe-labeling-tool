import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectLabels, selectTables } from '@/actions/markup'
import { FieldType } from '@/enums/FieldType'
import { fieldShape } from '@/models/Field'
import { labelShape } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { tableShape } from '@/models/Table'
import { markupSelector } from '@/selectors/markup'
import { MarkupObjectHeader } from './MarkupObjectHeader'

const UnassignedMarkupObject = ({
  markupObjects,
  field,
  markup,
  selectLabels,
  selectTables
}) => {
  const getObjectPage = (markup, uid) => Markup.getPageByObjectUid(markup, uid)

  const onHeaderClick = useCallback((object) => {
    const objectPage = getObjectPage(markup, object.uid)

    object.typeName === FieldType.TABLE
      ? selectTables(objectPage, [object])
      : selectLabels(objectPage, [object])
  }, [markup, selectLabels, selectTables])

  return markupObjects.map((markupObject, index) => (
    <MarkupObjectHeader
      key={markupObject.uid}
      page={getObjectPage(markup, markupObject.uid)}
      name={`${field.name} ${index + 1}`}
      onHeaderClick={() => onHeaderClick(markupObject)}
      unassigned
    />
  ))
}

UnassignedMarkupObject.propTypes = {
  markup: markupShape,
  markupObjects: PropTypes.arrayOf(
    PropTypes.oneOfType([
      labelShape,
      tableShape
    ])
  ),
  field: fieldShape,
  selectLabels: PropTypes.func.isRequired,
  selectTables: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state)
})

const mapDispatchToProps = {
  selectLabels,
  selectTables
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(UnassignedMarkupObject)

export {
  ConnectedComponent as UnassignedMarkupObject
}
