import styled from 'styled-components'
import { Tabs } from '@/components/Tabs'

const TabsStyled = styled(Tabs)`
  padding-bottom: 5rem;

  .ant-tabs-tab {
    margin: 0.8rem 1.8rem;
  }

  .ant-tabs-tab:nth-child(2) {
    margin: 0 2rem;
  }
`

export {
  TabsStyled
}
