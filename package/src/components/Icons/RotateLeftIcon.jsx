import React from 'react'
import PropTypes from 'prop-types'
import RotateLeft from '@/assets/icons/ic-32-rotation-left.svg'

const RotateLeftIcon = (props) => (
  <RotateLeft className={props.className} />
)

RotateLeftIcon.propTypes = {
  className: PropTypes.string
}

export {
  RotateLeftIcon
}
