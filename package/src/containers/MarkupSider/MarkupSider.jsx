import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MarkupSidebar } from '@/components/MarkupSidebar'
import { HotKeyEvent } from '@/constants/hotKeys'
import { TableDataSidebar } from '@/containers/TableDataSidebar'
import { SidebarContent } from '@/enums/SidebarContent'
import { withHotKeys } from '@/hocs/withHotKeys'
import { activeSidebarSelector } from '@/selectors/ui'
import { MarkupSidebarSider } from './MarkupSider.styles'

const WIDTH_RIGHT_SIDER = 300
const ZERO_WIDTH = 0

const MarkupSider = ({ registerHandlers, setMarkupSiderWidth, width, activeSidebar }) => {
  const hotKeyHandlers = useMemo(() => ({
    [HotKeyEvent.COLLAPSE_EXPAND_SIDERS]: () => {
      if (width) {
        setMarkupSiderWidth(ZERO_WIDTH)
      } else {
        setMarkupSiderWidth(WIDTH_RIGHT_SIDER)
      }
    }

  }), [width, setMarkupSiderWidth])

  const Sidebar = useMemo(() => {
    switch (activeSidebar) {
      case SidebarContent.TABLE_DATA:
        return <TableDataSidebar />
      case SidebarContent.MARKUP:
        return <MarkupSidebar />
    }
  }, [activeSidebar])

  useEffect(() => {
    registerHandlers(hotKeyHandlers)
  }, [hotKeyHandlers, registerHandlers])

  if (!width) {
    return null
  }

  return (
    <MarkupSidebarSider
      width={WIDTH_RIGHT_SIDER}
    >
      {Sidebar}
    </MarkupSidebarSider>
  )
}

MarkupSider.propTypes = {
  registerHandlers: PropTypes.func.isRequired,
  activeSidebar: PropTypes.oneOf(Object.values(SidebarContent)).isRequired,
  setMarkupSiderWidth: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  activeSidebar: activeSidebarSelector(state)
})

const MarkupSiderWithHotKeys = withHotKeys(connect(mapStateToProps)(MarkupSider))

export {
  MarkupSiderWithHotKeys as MarkupSider,
  WIDTH_RIGHT_SIDER
}
