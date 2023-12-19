import React from 'react'
import { Divider as AntdDivider } from 'antd'
import 'antd/lib/divider/style/index.less'

const DividerOrientation = {
  LEFT: 'left',
  RIGHT: 'right'
}

const Divider = (props) => <AntdDivider {...props} />

export {
  DividerOrientation,
  Divider
}
