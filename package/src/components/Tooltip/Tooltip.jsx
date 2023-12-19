import React from 'react'
import { Tooltip as AntdTooltip } from 'antd'
import 'antd/lib/tooltip/style/index.less'
import PropTypes from 'prop-types'
import { childrenShape } from '@/utils/propTypes'

const Tooltip = (props) => (
  <AntdTooltip
    {...props}
    mouseEnterDelay={1}
  >
    {props.children}
  </AntdTooltip>
)

Tooltip.propTypes = {
  children: childrenShape.isRequired,
  title: PropTypes.string.isRequired
}

export {
  Tooltip
}
