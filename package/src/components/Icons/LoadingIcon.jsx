import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const LoadingIcon = (props) => (
  <LoadingOutlined {...props} />
)

LoadingIcon.propTypes = {
  className: PropTypes.string
}

export {
  LoadingIcon
}
