import React from 'react'
import PropTypes from 'prop-types'
import {
  stringToDayjs,
  LOCALE_DATE_FORMAT,
  RECOGNIZABLE_DATE_FORMATS
} from '@/utils/dayjs'
import { StyledDatePicker } from './DatePicker.styles'

const dateJsShape = PropTypes.shape({
  $D: PropTypes.number,
  $H: PropTypes.number,
  $L: PropTypes.string,
  $M: PropTypes.number,
  $W: PropTypes.number,
  $y: PropTypes.number
})

const DatePicker = ({
  allowClear = true,
  value,
  disabled,
  getPopUpContainer,
  onChange,
  onFocus,
  placeholder,
  className,
  innerRef,
  suffixIcon
}) => {
  const getPopupContainer = () => document.body

  return (
    <StyledDatePicker
      ref={innerRef}
      allowClear={allowClear}
      className={className}
      disabled={disabled}
      format={[LOCALE_DATE_FORMAT, ...RECOGNIZABLE_DATE_FORMATS]}
      getPopupContainer={getPopUpContainer || getPopupContainer}
      onChange={onChange}
      onFocus={onFocus}
      placeholder={placeholder}
      suffixIcon={suffixIcon}
      value={stringToDayjs(value)}
    />
  )
}

DatePicker.RangePicker = StyledDatePicker.RangePicker

DatePicker.propTypes = {
  allowClear: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    dateJsShape
  ]),
  disabled: PropTypes.bool,
  getPopUpContainer: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })
  ]),
  suffixIcon: PropTypes.node
}

export { DatePicker }
