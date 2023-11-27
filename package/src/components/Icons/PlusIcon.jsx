import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

const PlusIcon = (props) => (
  <PlusOutlined className={props.className} />
)

PlusIcon.propTypes = {
  className: PropTypes.string
}

export {
  PlusIcon
}
