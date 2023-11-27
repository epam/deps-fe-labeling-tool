import React, { useCallback } from 'react'
import { includes } from 'lodash' //
import PropTypes from 'prop-types'
import { fieldShape } from '@/models/Field'
import { labelShape, Label } from '@/models/Label'
import { getRelatedLabels } from '@/models/Relation'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import {
  Circle,
  Dot,
  IconWrapper,
  KeyValuePairWrapper,
  KeyValueItem,
  Tail
} from './PairsMarkupObject.styles'
import { PrimitiveMarkupObjects } from './PrimitiveMarkupObjects'

const RESOURCE_BLANK_PAIR = 'No items here'

const BlankPairItem = () => (
  <MarkupObjectHeader
    name={RESOURCE_BLANK_PAIR}
    unassigned
  />
)

const generateKeyValuePair = (markupObjects) => {
  return markupObjects.reduce((result, markupObject) => {
    if (result.some((item) => includes(item?.key, markupObject) || includes(item?.value, markupObject))) {
      return result
    }

    const relations = getRelatedLabels(markupObjects, markupObject)
    const sameLabels = Label.getSameLabels(markupObject, markupObjects)

    if (!relations?.length) {
      result.push({ [markupObject.type]: sameLabels })
    } else {
      result.push({
        [markupObject.type]: sameLabels,
        [relations[0].type]: relations
      })
    }

    return result
  }, [])
}

const PairsMarkupObject = ({
  markupObjects,
  field
}) => {
  const renderMarkupObject = useCallback((objects) => {
    if (!objects) {
      return <BlankPairItem />
    }

    return (
      <PrimitiveMarkupObjects
        markupObjects={objects}
        field={field}
      />
    )
  }, [field])

  return generateKeyValuePair(markupObjects).map((entity, i) => (
    <KeyValuePairWrapper key={i}>
      <IconWrapper>
        <Circle>
          <Dot />
        </Circle>
        <Tail />
      </IconWrapper>
      <KeyValueItem>
        {renderMarkupObject(entity.key)}
        {renderMarkupObject(entity.value)}
      </KeyValueItem>
    </KeyValuePairWrapper>
  ))
}

PairsMarkupObject.propTypes = {
  field: fieldShape.isRequired,
  markupObjects: PropTypes.arrayOf(labelShape).isRequired
}

export {
  PairsMarkupObject
}
