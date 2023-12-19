import React, { useCallback, useMemo } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { selectLabels } from '@/actions/markup'
import { fieldShape } from '@/models/Field'
import { labelShape } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { MARKUP_OBJECT_TYPE_TO_ICON } from './MarkupObjectToIcon'

const PrimitiveMarkupObject = ({
  getIcon,
  markup,
  label,
  field,
  selectLabels,
  subIndex
}) => {
  const objectPage = Markup.getPageByObjectUid(markup, label.uid)

  const onHeaderClick = useCallback(() => {
    selectLabels(objectPage, [label])
  }, [label, objectPage, selectLabels])

  const getTitle = () => {
    if (label?.index && subIndex) {
      return `${field.name} ${label.index}.${subIndex}`
    }

    return `${field.name} ${subIndex ?? ''}`.trim()
  }

  const Icon = useMemo(() => {
    if (getIcon) {
      return getIcon()
    }
    return MARKUP_OBJECT_TYPE_TO_ICON[label.type]
  }, [getIcon, label.type])

  return (
    <MarkupObjectHeader
      key={label.uid}
      icon={Icon}
      page={objectPage}
      name={getTitle()}
      onHeaderClick={onHeaderClick}
    />
  )
}

PrimitiveMarkupObject.propTypes = {
  getIcon: PropTypes.func,
  markup: markupShape.isRequired,
  label: labelShape.isRequired,
  field: fieldShape.isRequired,
  selectLabels: PropTypes.func.isRequired,
  subIndex: PropTypes.number
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state)
})

const mapDispatchToProps = {
  selectLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(PrimitiveMarkupObject)

export {
  ConnectedComponent as PrimitiveMarkupObject
}
