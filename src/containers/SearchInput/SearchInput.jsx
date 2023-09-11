import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from '@/hocs/debounce'
import {
  Input, SearchIcon
} from './SearchInput.styles.js'

const RESOURCE_SEARCH_INPUT_PLACEHOLDER = 'Search'

const DebouncedSearchInput = debounce({
  getValue: (e) => e.target.value
})(Input)

const SearchInput = ({
  value = '',
  onChange
}) => {
  return (
    <DebouncedSearchInput
      placeholder={RESOURCE_SEARCH_INPUT_PLACEHOLDER}
      onChange={onChange}
      value={value}
      suffix={<SearchIcon />}
    />
  )
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export {
  SearchInput
}
