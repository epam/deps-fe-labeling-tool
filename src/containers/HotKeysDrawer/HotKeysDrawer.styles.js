import styled from 'styled-components'
import { Column } from '@/components/Column'
import { Drawer } from '@/components/Drawer'
import { Row } from '@/components/Row'
import { Tabs } from '@/components/Tabs'
import { Tag } from '@/components/Tag'

const StyledTag = styled(Tag)`
  &.ant-tag {
    margin: 0.1rem 0.7rem;
  }
`
const StyledRow = styled(Row)`
  margin: 0.7rem;
`

const StyledCol = styled(Column)`
  margin: 0.3rem 0;
`

const StyledTab = styled(Tabs)`
  .ant-tabs-tab {
    cursor: default;
  }
`

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header-title {
    flex: initial;
  }
`

export {
  StyledDrawer as Drawer,
  StyledTag as Tag,
  StyledRow as Row,
  StyledCol as Col,
  StyledTab as Tabs
}
