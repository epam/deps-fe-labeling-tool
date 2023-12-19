import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import lodashDebounce from 'lodash/debounce'
import PropTypes from 'prop-types'

const DEFAULT_WAIT = 250
const DEFAULT_GET_VALUE = (value) => value

const debounce = ({
  wait = DEFAULT_WAIT,
  getValue = DEFAULT_GET_VALUE
} = {}) => (ConnectedComponent) => {
  const Debounce = ({ onChange, value, ...rest }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const mountedValue = useRef(value)

    useEffect(
      () => {
        if (value === mountedValue.current) {
          return
        }

        mountedValue.current = value
        setCurrentValue(value)
      },
      [value]
    )

    const debouncedOnChange = useMemo(
      () => lodashDebounce(
        (val) => onChange(val),
        wait
      ),
      [onChange]
    )

    const onChangeHandler = useCallback(
      (e) => {
        const value = getValue(e)
        setCurrentValue(value)
        debouncedOnChange(value)
      },
      [debouncedOnChange]
    )

    return (
      <ConnectedComponent
        {...rest}
        value={currentValue}
        onChange={onChangeHandler}
      />
    )
  }

  Debounce.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }

  return Debounce
}

export {
  debounce
}
