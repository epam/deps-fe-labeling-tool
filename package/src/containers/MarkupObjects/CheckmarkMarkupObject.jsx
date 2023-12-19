import React, { useCallback, useMemo } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { selectLabels } from '@/actions/markup'
import { fieldShape } from '@/models/Field'
import { labelShape } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { MarkupObjectHeader } from './MarkupObjectHeader'

const CheckmarkMarkupObject = ({
  markup,
  label,
  field,
  selectLabels
}) => {
  const objectPage = useMemo(
    () => Markup.getPageByObjectUid(markup, label.uid),
    [label.uid, markup]
  )

  const onHeaderClick = useCallback(() => {
    selectLabels(objectPage, [label])
  }, [label, objectPage, selectLabels])

  return (
    <MarkupObjectHeader
      key={label.uid}
      page={objectPage}
      name={`${field.name} ${label?.index ?? ''}`}
      onHeaderClick={onHeaderClick}
    />
  )
}

CheckmarkMarkupObject.propTypes = {
  markup: markupShape,
  label: labelShape,
  field: fieldShape,
  selectLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state)
})

const mapDispatchToProps = {
  selectLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(CheckmarkMarkupObject)

export {
  ConnectedComponent as CheckmarkMarkupObject
}
