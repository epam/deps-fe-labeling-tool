import React from 'react'
import PropTypes from 'prop-types'
import RotateRight from '@/assets/icons/ic-32-rotation-right.svg'

const RotateRightIcon = (props) => (
  <RotateRight className={props.className} />
)

RotateRightIcon.propTypes = {
  className: PropTypes.string
}

export {
  RotateRightIcon
}
