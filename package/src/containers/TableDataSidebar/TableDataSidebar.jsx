import React from 'react'
import { Tabs } from '@/components/Tabs'
import { TableData } from '@/containers/TableData'
import { SidebarContent, RESOURCE_SIDEBAR_TAB } from '@/enums/SidebarContent'
import { TabsStyled } from './TableDataSidebar.styles'

const { TabPane } = Tabs

const TableDataSidebar = () => (
  <TabsStyled defaultActiveKey={RESOURCE_SIDEBAR_TAB[SidebarContent.TABLE_DATA]}>
    <TabPane tab={RESOURCE_SIDEBAR_TAB[SidebarContent.TABLE_DATA]} key={RESOURCE_SIDEBAR_TAB[SidebarContent.TABLE_DATA]}>
      <TableData />
    </TabPane>
  </TabsStyled>
)

export {
  TableDataSidebar
}
