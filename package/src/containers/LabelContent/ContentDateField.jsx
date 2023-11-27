import React, { useCallback } from 'react'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels } from '@/actions/markup'
import { CalendarIcon } from '@/components/Icons/CalendarIcon'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { debounce } from '@/hocs/debounce'
import { labelShape } from '@/models/Label'
import { currentPageSelector } from '@/selectors/pagination'
import {
  LOCALE_DATE_FORMAT,
  dayjsToString,
  stringToDayjs
} from '@/utils/dayjs'
import {
  InputWrapper,
  StyledDatePicker,
  StyledInput
} from './ContentDateField.styles'

const DebouncedInput = debounce({
  getValue: (e) => e.target.value
})(StyledInput)

const dateNow = dayjs()

const ContentDateField = ({
  currentPage,
  label,
  updateLabels
}) => {
  const handleLabelsUpdate = useCallback(
    (content) => {
      updateLabels(currentPage, [{
        ...label,
        content,
        confidence: CONFIDENCE_ON_MANUAL_CHANGE
      }])
    },
    [
      currentPage,
      label,
      updateLabels
    ])

  const handleDatePick = useCallback(
    (dayjsInstance) =>
      handleLabelsUpdate(dayjsToString(dayjsInstance, LOCALE_DATE_FORMAT)),
    [handleLabelsUpdate]
  )

  return (
    <>
      <InputWrapper>
        <DebouncedInput
          value={label.content}
          onChange={handleLabelsUpdate}
        />
        <StyledDatePicker
          allowClear={false}
          value={
            stringToDayjs(label.content) ||
            dateNow
          }
          onChange={handleDatePick}
          suffixIcon={<CalendarIcon />}
        />
      </InputWrapper>
    </>
  )
}

ContentDateField.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  updateLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state)
})

const mapDispatchToProps = {
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContentDateField)

export {
  ConnectedComponent as ContentDateField
}
