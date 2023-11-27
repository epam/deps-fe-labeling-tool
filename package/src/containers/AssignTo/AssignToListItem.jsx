import React, { useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFieldsToDelete } from '@/actions/model'
import { addTemporaryFieldIndex } from '@/actions/ui'
import { ButtonType } from '@/components/Button'
import { FilledTrashIcon } from '@/components/Icons/FilledTrashIcon'
import { List } from '@/components/List'
import {
  ListItemStyled,
  ListItemMetaStyled,
  TextHighlighter
} from '@/containers/FieldsToAssign/FieldsToAssign.styles'
import { fieldShape } from '@/models/Field'
import { Markup, markupShape } from '@/models/Markup'
import { markupSelector } from '@/selectors/markup'
import { fieldsToDeleteSelector } from '@/selectors/model'
import { assignToFieldsFilterSelector, temporaryFieldsIndexesSelector } from '@/selectors/ui'
import {
  ListItemWrapper,
  ListItemHeader,
  ListItemTitle,
  ListItemsLabels,
  Button,
  DeleteFieldButton
} from './AssignToListItem.styles'

const RESOURCE_ADD_NEW = '+ Add new'

const SCROLL_PARAM = {
  behavior: 'smooth',
  block: 'nearest',
  inline: 'nearest'
}

const AssignToListItem = ({
  listIcon,
  field,
  markup,
  renderActions,
  filter,
  temporaryFieldsIndexes,
  addTemporaryFieldIndex,
  renderDeleteButton,
  requiredMark,
  updateFieldsToDelete,
  fieldsToDelete
}) => {
  const filteredMarkupObjects = useMemo(
    () => {
      if (!markup) {
        return []
      }

      const allMarkupObjects = Markup.getAllObjects(markup)
      return allMarkupObjects.filter((object) => object.fieldCode === field.code)
    }, [field, markup]
  )

  const listItemsRef = useRef(null)

  const addFieldIndex = async () => {
    await addTemporaryFieldIndex(
      {
        code: field.code,
        index: listObjectsIndexes.at(-1) + 1 || 1
      }
    )

    listItemsRef.current.lastChild?.scrollIntoView(SCROLL_PARAM)
  }

  const listObjectsIndexes = useMemo(
    () => {
      const fieldsIndexes = filteredMarkupObjects.reduce((indexes, object) => {
        if (!indexes.includes(object.index)) {
          indexes.push(object.index)
        }

        return indexes
      }, [])

      temporaryFieldsIndexes[field.code] &&
      fieldsIndexes.push(...temporaryFieldsIndexes[field.code])

      return fieldsIndexes.sort((a, b) => a - b)
    }, [field, filteredMarkupObjects, temporaryFieldsIndexes]
  )

  const renderDeleteFieldButton = useCallback(
    (field) => (
      <DeleteFieldButton
        icon={<FilledTrashIcon />}
        onClick={() => updateFieldsToDelete(field)}
      />
    ), [updateFieldsToDelete])

  return (
    <ListItemWrapper>
      <ListItemHeader>
        {listIcon}
        <ListItemTitle>
          <TextHighlighter
            searchTerm={filter}
            text={field.name}
          />
        </ListItemTitle>
        {field.required && requiredMark}
        {
          fieldsToDelete
            ? renderDeleteFieldButton(field)
            : <Button
              onClick={addFieldIndex}
              type={ButtonType.LINK}
            >
              {RESOURCE_ADD_NEW}
            </Button>
        }
      </ListItemHeader>
      <List>
        <ListItemsLabels ref={listItemsRef}>
          {
            listObjectsIndexes.map((index) => (
              <ListItemStyled
                key={index}
                actions={
                  renderActions(field.code, field.fieldMeta.baseType, index)
                }
              >
                {renderDeleteButton(field.code, field.fieldMeta.baseType, index)}
                <ListItemMetaStyled
                  title={
                    <TextHighlighter
                      searchTerm={filter}
                      text={`${field.name} ${index}`}
                    />
                  }
                />
              </ListItemStyled>
            ))
          }
        </ListItemsLabels>
      </List>
    </ListItemWrapper>
  )
}

AssignToListItem.propTypes = {
  field: fieldShape.isRequired,
  markup: markupShape,
  listIcon: PropTypes.node.isRequired,
  renderActions: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  temporaryFieldsIndexes: PropTypes.shape({
    [PropTypes.string]: PropTypes.arrayOf(PropTypes.number)
  }),
  addTemporaryFieldIndex: PropTypes.func.isRequired,
  renderDeleteButton: PropTypes.func.isRequired,
  requiredMark: PropTypes.node.isRequired,
  updateFieldsToDelete: PropTypes.func,
  fieldsToDelete: PropTypes.arrayOf(fieldShape)
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state),
  temporaryFieldsIndexes: temporaryFieldsIndexesSelector(state),
  filter: assignToFieldsFilterSelector(state),
  fieldsToDelete: fieldsToDeleteSelector(state)
})

const mapDispatchToProps = {
  addTemporaryFieldIndex,
  updateFieldsToDelete
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AssignToListItem)

export {
  ConnectedComponent as AssignToListItem
}
