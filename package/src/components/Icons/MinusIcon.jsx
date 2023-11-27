import React from 'react'
import { MinusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const MinusIcon = (props) => (
  <MinusOutlined className={props.className} />
)

MinusIcon.propTypes = {
  className: PropTypes.string
}

export {
  MinusIcon
}
