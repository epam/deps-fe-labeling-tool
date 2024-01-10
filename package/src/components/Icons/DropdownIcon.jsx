import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from '@/assets/icons/ic-16-dropdown.svg'

const DropdownIcon = (props) => (
  <Dropdown onClick={props.onClick} />
)

DropdownIcon.propTypes = {
  onClick: PropTypes.func
}

export {
  DropdownIcon
}
