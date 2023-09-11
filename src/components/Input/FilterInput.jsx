import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Input } from '@/components/Input'
import {
  FilterInputWrapper,
  CloseOutlinedIcon
} from './FilterInput.styles.js'

const FilterInput = ({
  className,
  placeholder,
  value,
  onChange
}) => {
  const onInputChange = useCallback(
    (e) => onChange({
      ...e,
      value: e.target.value
    }),
    [onChange]
  )

  const onClose = useCallback(
    (e) => onChange({
      ...e,
      value: ''
    }),
    [onChange]
  )

  return (
    <FilterInputWrapper className={className}>
      <Input
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
      />
      {
        value && (
          <CloseOutlinedIcon
            onClick={onClose}
          />
        )
      }
    </FilterInputWrapper>
  )
}

FilterInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

FilterInput.defaultProps = {
  value: ''
}

export {
  FilterInput
}
