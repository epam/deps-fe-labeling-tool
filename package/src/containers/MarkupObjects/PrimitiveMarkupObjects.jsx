import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Collapse } from '@/components/Collapse'
import { CollapseUpArrowsIcon } from '@/components/Icons/CollapseUpArrowsIcon'
import { fieldShape } from '@/models/Field'
import { labelShape } from '@/models/Label'
import { Markup, markupShape } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { replaceAll } from '@/utils/string'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { MARKUP_OBJECT_TYPE_TO_ICON } from './MarkupObjectToIcon'
import { PrimitiveMarkupObject } from './PrimitiveMarkupObject'
import {
  Badge,
  IconWrapper
} from './PrimitiveMarkupObjects.styles'

const RESOURCE_PAGE_1 = 'page {0}'
const RESOURCE_PAGES = 'several pages'

const PrimitiveMarkupObjects = ({
  field,
  markup,
  markupObjects
}) => {
  const [expandedKeys, setExpandedKeys] = useState([])

  const [firstLabel] = markupObjects

  const onChangeHandler = useCallback(() => {
    const key = expandedKeys.find((k) => k === firstLabel.uid)

    if (key) {
      return setExpandedKeys([])
    }

    return setExpandedKeys([firstLabel.uid])
  }, [expandedKeys, firstLabel.uid])

  const pagesTitle = useMemo(() => {
    const pages = [
      ...new Set(markupObjects.map((label) => Markup.getPageByObjectUid(markup, label.uid)))
    ]

    if (pages.length > 1) {
      return RESOURCE_PAGES
    }

    return replaceAll(RESOURCE_PAGE_1, pages[0])
  }, [markup, markupObjects])

  if (markupObjects.length === 1) {
    return (
      <PrimitiveMarkupObject
        field={field}
        label={markupObjects[0]}
      />
    )
  }

  return (
    <Collapse
      activeKey={expandedKeys}
      onChange={onChangeHandler}
      header={
        <MarkupObjectHeader
          badge={<Badge>{markupObjects.length}</Badge>}
          collapseIcon={
            !!expandedKeys.length && (
              <IconWrapper>
                <CollapseUpArrowsIcon />
              </IconWrapper>
            )
          }
          icon={MARKUP_OBJECT_TYPE_TO_ICON[firstLabel.type]}
          pagesTitle={pagesTitle}
          type={firstLabel.type}
          name={`${field.name} ${firstLabel?.index ?? ''}`}
        />
      }
      collapseId={firstLabel.uid}
      expandIcon={() => null}
    >
      {
        markupObjects.map((label, i) => (
          <PrimitiveMarkupObject
            key={label.uid}
            getIcon={() => null}
            field={field}
            label={label}
            subIndex={i + 1}
          />
        ))
      }
    </Collapse>
  )
}

PrimitiveMarkupObjects.propTypes = {
  field: fieldShape,
  markup: markupShape.isRequired,
  markupObjects: PropTypes.arrayOf(labelShape)
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state)
})

const ConnectedComponents = connect(mapStateToProps)(PrimitiveMarkupObjects)

export {
  ConnectedComponents as PrimitiveMarkupObjects
}
