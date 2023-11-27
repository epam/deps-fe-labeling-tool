import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleExpandedListKey } from '@/actions/ui'
import { FieldType } from '@/enums/FieldType'
import { fieldShape } from '@/models/Field'
import { labelShape, Label } from '@/models/Label'
import { tableShape } from '@/models/Table'
import { expandedListKeysSelector } from '@/selectors/ui'
import { replaceAll } from '@/utils/string'
import { ListContentWrapper, ListName, Collapse } from './ListOfMarkupObjects.styles'

const RESOURCE_LIST_NAME = 'List of {0}s'

const getUniqueSets = (markupObjects) => {
  const uniqueSets = []

  markupObjects.forEach((currentLabel) => {
    const hasDuplicate = uniqueSets.some((set) => set.includes(currentLabel))
    if (hasDuplicate) {
      return
    }

    const sameLabels = Label.getSameLabels(currentLabel, markupObjects)
    uniqueSets.push(sameLabels)
  })

  return uniqueSets
}

const ListOfMarkupObjects = ({
  markupObjects,
  field,
  renderMapper,
  expandedListKeys,
  toggleExpandedListKey
}) => {
  const renderer = renderMapper[field.fieldMeta.baseType]

  const onChangeHandler = useCallback(() => {
    toggleExpandedListKey(field.code)
  }, [field.code, toggleExpandedListKey])

  const setsOfLabels = getUniqueSets(markupObjects)

  return (
    <Collapse
      activeKey={expandedListKeys.find((key) => key === field.code)}
      onChange={onChangeHandler}
      header={
        <ListName>
          {replaceAll(RESOURCE_LIST_NAME, field.name)}
        </ListName>
      }
      collapseId={field.code}
    >
      <ListContentWrapper>
        {
          field.fieldMeta.baseType === FieldType.PAIR
            ? renderer(markupObjects, field)
            : setsOfLabels.map((labels, i) => renderer(labels, field, i))
        }
      </ListContentWrapper>
    </Collapse>
  )
}

ListOfMarkupObjects.propTypes = {
  markupObjects: PropTypes.arrayOf(
    PropTypes.oneOfType([
      labelShape,
      tableShape
    ])
  ),
  field: fieldShape,
  toggleExpandedListKey: PropTypes.func.isRequired,
  renderMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }).isRequired,
  expandedListKeys: PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProps = (state) => ({
  expandedListKeys: expandedListKeysSelector(state)
})

const mapDispatchToProps = {
  toggleExpandedListKey
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ListOfMarkupObjects)

export {
  ConnectedComponent as ListOfMarkupObjects
}
