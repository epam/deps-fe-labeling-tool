import React from 'react'
import PropTypes from 'prop-types'
import LeftOutlined from '@/assets/icons/ic-16-arrow-left.svg'

const LeftIcon = (props) => (
  <LeftOutlined className={props.className} />
)

LeftIcon.propTypes = {
  className: PropTypes.string
}

export {
  LeftIcon
}
