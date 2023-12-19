import React from 'react'
import { Tabs } from '@/components/Tabs'
import { AssignTo } from '@/containers/AssignTo'
import { ObjectProperties } from '@/containers/ObjectProperties'
import { TabsStyled } from './MarkupSidebar.styles'

const { TabPane } = Tabs

const RESOURCE_TAB = {
  PROPERTIES: 'Properties',
  ASSIGN: 'Assign to'
}

const tabsToRender = {
  [RESOURCE_TAB.PROPERTIES]: () => <ObjectProperties />,
  [RESOURCE_TAB.ASSIGN]: () => <AssignTo />
}

const MarkupSidebar = () => (
  <TabsStyled defaultActiveKey={RESOURCE_TAB.PROPERTIES} centered>
    {
      Object.entries(tabsToRender).map(([tabName, renderer]) => (
        <TabPane tab={tabName} key={tabName}>
          {renderer()}
        </TabPane>
      ))
    }
  </TabsStyled>
)

export {
  MarkupSidebar
}
