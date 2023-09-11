import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels } from '@/actions/markup'
import { Autocomplete } from '@/components/Autocomplete'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { FieldType } from '@/enums/FieldType'
import { fieldShape } from '@/models/Field'
import { labelShape } from '@/models/Label'
import { Option } from '@/models/Option'
import { fieldsSelector } from '@/selectors/model'
import { currentPageSelector } from '@/selectors/pagination'

const ContentEnum = ({
  currentPage,
  label,
  updateLabels,
  fields
}) => {
  const onContentChange = useCallback(
    (value) => {
      updateLabels(currentPage, [{
        ...label,
        content: value,
        confidence: CONFIDENCE_ON_MANUAL_CHANGE
      }])
    },
    [
      currentPage,
      label,
      updateLabels
    ])

  const enumOptions = useMemo(() => {
    const { fieldType, fieldMeta } = fields.find((field) => field.code === label.fieldCode)
    const { options } = fieldType === FieldType.LIST ? fieldMeta.baseTypeMeta : fieldMeta

    return options.map((value) => new Option(value))
  }, [fields, label.fieldCode])

  return (
    <Autocomplete
      onChange={onContentChange}
      value={label.content}
      options={enumOptions}
    />
  )
}

ContentEnum.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  updateLabels: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(fieldShape.isRequired)
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  fields: fieldsSelector(state)
})

const mapDispatchToProps = {
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContentEnum)

export {
  ConnectedComponent as ContentEnum
}
