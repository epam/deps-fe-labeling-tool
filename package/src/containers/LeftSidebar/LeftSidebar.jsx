import React, { useState, useCallback, useRef, useEffect } from 'react'
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Tabs } from '@/components/Tabs'
import { PreviewJson } from '@/containers/PreviewJson'
import { AllMarkupObjects } from '../AllMarkupObjects'
import {
  Sider,
  Toggler,
  TabsStyled,
  TabContent
} from './LeftSidebar.styles'

const { TabPane } = Tabs

const RESOURCE_TAB_JSON_PREVIEW = 'JSON Preview'
const RESOURCE_TAB_ALL_OBJECTS = 'All Objects'

const RESOURCE_TAB_TO_RENDER_CONTENT = {
  [RESOURCE_TAB_ALL_OBJECTS]: () => <AllMarkupObjects />,
  [RESOURCE_TAB_JSON_PREVIEW]: () => <PreviewJson />
}

const DEFAULT_ACTIVE_PAGE = '1'

const WIDTH_LEFT_SIDER = 300
const ZERO_WIDTH = 0
const TOGGLER_HEIGHT = 48

const LeftSidebarToggler = ({ onClick, collapsed, height }) => (
  <Toggler
    onClick={onClick}
    collapsed={collapsed}
    height={height}
  >
    {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined /> }
  </Toggler>
)

const LeftSidebar = ({ height }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [contentHeight, setContentHeight] = useState(0)
  const contentWrapper = useRef()

  const onClick = useCallback(() => {
    setCollapsed((prevCollapsed) => !prevCollapsed)
  }, [])

  useEffect(() => {
    if (collapsed) {
      return
    }
    const tabsNavHeight = contentWrapper.current?.offsetTop ?? 0
    const tabContentHeight = height - tabsNavHeight - TOGGLER_HEIGHT
    setContentHeight(tabContentHeight)
  }, [height, collapsed])

  return (
    <Sider
      collapsed={collapsed}
      trigger={
        (
          <LeftSidebarToggler
            onClick={onClick}
            collapsed={collapsed}
            height={TOGGLER_HEIGHT}
          />
        )
      }
      collapsedWidth={ZERO_WIDTH}
      width={WIDTH_LEFT_SIDER}
      collapsible
    >
      <TabsStyled defaultActiveKey={DEFAULT_ACTIVE_PAGE} >
        {
          Object.keys(RESOURCE_TAB_TO_RENDER_CONTENT).map((item) => {
            return (
              <TabPane
                tab={item}
                key={item}
              >
                <TabContent
                  ref={contentWrapper}
                  height={contentHeight}
                >
                  {RESOURCE_TAB_TO_RENDER_CONTENT[item]()}
                </TabContent>
              </TabPane>
            )
          })
        }
      </TabsStyled>
    </Sider>
  )
}

LeftSidebarToggler.propTypes = {
  onClick: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  height: PropTypes.number
}

LeftSidebar.propTypes = {
  height: PropTypes.number
}

export {
  LeftSidebar
}
