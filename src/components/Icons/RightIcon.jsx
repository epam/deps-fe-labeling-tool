import React from 'react'
import PropTypes from 'prop-types'
import RightOutlined from '@/assets/icons/ic-16-arrow-right.svg'

const RightIcon = (props) => (
  <RightOutlined className={props.className} />
)

RightIcon.propTypes = {
  className: PropTypes.string
}

export {
  RightIcon
}
