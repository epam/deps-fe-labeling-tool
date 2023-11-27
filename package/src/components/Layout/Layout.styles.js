import { Layout as AntdLayout } from 'antd'
import 'antd/lib/layout/style/index.less'
import styled from 'styled-components'

const Layout = styled(AntdLayout)`
  ${({ height }) => `
    height: ${height / 10}rem;
  `}
`

export {
  Layout
}
