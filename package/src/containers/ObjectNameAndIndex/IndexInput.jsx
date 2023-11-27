import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTemporaryFieldIndex } from '@/actions/ui'
import { labelShape } from '@/models/Label'
import { tableShape } from '@/models/Table'
import { NumericInput } from './IndexInput.styles'

const INDEX_MIN_VALUE = 1

const IndexInput = ({
  onChange,
  object,
  className,
  deleteTemporaryFieldIndex
}) => {
  const onIndexChange = useCallback(
    (value) => {
      if (object.index === value) {
        return
      }

      deleteTemporaryFieldIndex({
        code: object.fieldCode,
        index: value
      })

      onChange(
        {
          ...object,
          index: value
        }
      )
    },
    [
      object,
      onChange,
      deleteTemporaryFieldIndex
    ]
  )

  return (
    <NumericInput
      className={className}
      min={INDEX_MIN_VALUE}
      value={object.index}
      onChange={onIndexChange}
    />
  )
}

IndexInput.propTypes = {
  className: PropTypes.string,
  deleteTemporaryFieldIndex: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  object: PropTypes.oneOfType([
    labelShape,
    tableShape
  ]).isRequired
}

const mapDispatchToProps = {
  deleteTemporaryFieldIndex
}

const ConnectedComponent = connect(null, mapDispatchToProps)(IndexInput)

export {
  ConnectedComponent as IndexInput
}
