
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { AutoComplete as AntdAutocomplete } from 'antd'
import 'antd/lib/auto-complete/style/index.less'
import lodashDebounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { optionShape } from '@/models/Option'

const DEBOUNCE_TIME = 250

const RESOURCE_NOT_FOUND_CONTENT = 'Not found any matches'

const Autocomplete = ({
  options,
  onChange,
  notFoundContent,
  value,
  onFocus,
  width,
  disabled,
  allowClear
}) => {
  const [optionsForRender, setOptions] = useState(options)
  const [autocompleteValue, setAutocompleteValue] = useState()

  useEffect(() => {
    setAutocompleteValue(value)
  }, [value])

  const onSearch = (searchText) => {
    if (!searchText) {
      setOptions(options)
      return
    }

    setOptions(options.filter((o) => o.value.toLowerCase().includes(searchText.toLowerCase())))
  }

  const debouncedOnChange = useMemo(
    () => lodashDebounce(
      (val) => onChange(val),
      DEBOUNCE_TIME
    ),
    [onChange]
  )

  const onChangeAutocomplete = useCallback(
    (value) => {
      setAutocompleteValue(value)
      debouncedOnChange(value)
    },
    [debouncedOnChange]
  )

  return (
    <AntdAutocomplete
      allowClear={allowClear}
      defaultValue={value}
      disabled={disabled}
      notFoundContent={notFoundContent}
      onChange={onChangeAutocomplete}
      onFocus={onFocus}
      onSearch={onSearch}
      options={optionsForRender}
      style={
        {
          width: width
        }
      }
      value={autocompleteValue}
    />
  )
}

Autocomplete.defaultProps = {
  notFoundContent: RESOURCE_NOT_FOUND_CONTENT,
  width: '100%'
}

Autocomplete.propTypes = {
  notFoundContent: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(optionShape).isRequired,
  value: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  disabled: PropTypes.bool,
  allowClear: PropTypes.bool
}

export {
  Autocomplete
}
