
import { Dropdown as AntdDropdown } from 'antd'
import 'antd/lib/dropdown/style/index.less'
import styled from 'styled-components'

const StyledDropdown = styled(AntdDropdown)`
  .ant-dropdown-menu-item {
    padding: 0;
  }
`

export {
  StyledDropdown
}
