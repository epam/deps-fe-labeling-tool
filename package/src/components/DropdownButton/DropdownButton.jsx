import React from 'react'
import { Dropdown as AntdDropdown } from 'antd'
import 'antd/lib/dropdown/style/index.less'

const DropdownButton = (props) => (
  <AntdDropdown.Button { ...props } />
)

export {
  DropdownButton
}
