import React, { useMemo } from 'react'
import { capitalize } from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, ListItem } from '@/components/List'
import { TabsSize } from '@/components/Tabs'
import { HotKeyEvent, HotKeyModifier } from '@/constants/hotKeys'
import { Placement } from '@/enums/Placement'
import { hotKeysSelector } from '@/selectors/hotkeys'
import {
  Tag,
  Row,
  Col,
  Tabs,
  Drawer
} from './HotKeysDrawer.styles'

const { TabPane } = Tabs

const DRAWER_HEIGHT = 350
const RESOURCE_HOTKEYS_INFO_TAB_KEY = 'info'
const RESOURCE_HOTKEYS_INFO_TAB_TITLE = 'Hot keys info'
const KEY_SEQUENCE_SEPARATOR = '+'
const WORDS_TO_DELETE_REGEXP = new RegExp('Key|Arrow', 'g')
const DRAWER_STYLE_PROPERTIES = {
  BODY: {
    paddingTop: 0
  },
  HEADER: {
    justifyContent: 'flex-end'
  }
}

const getUserFriendlyShortcuts = (shortcuts) => (
  shortcuts.map((shortcut) =>
    shortcut
      .replaceAll(WORDS_TO_DELETE_REGEXP, '')
      .split('+')
      .map(capitalize)
  )
)

const renderHotKeyElement = (key, index, array) => (
  <React.Fragment key={key}>
    <Tag>{key}</Tag>
    {index !== array.length - 1 && KEY_SEQUENCE_SEPARATOR}
  </React.Fragment>
)

const renderHotKey = (hotKey) => (
  <ListItem key={hotKey.description}>
    <Row>
      <Col span={8}>{hotKey.description}</Col>
      <Col span={16}>
        {
          getUserFriendlyShortcuts(hotKey.getShortcutsArray())
            .map((shortcut) => shortcut.map(renderHotKeyElement))
        }
        {hotKey.note && hotKey.note}
      </Col>
    </Row>
  </ListItem>
)

const HotKeysDrawer = ({ visible, toggleHotKeysInfo, hotKeyEvents }) => {
  const hotKeysInfo = useMemo(
    () => (
      hotKeyEvents
        .map((hotKeyEvent) => HotKeyEvent[hotKeyEvent] || HotKeyModifier[hotKeyEvent])
        .filter((hotKeyEvent) => !!hotKeyEvent.description)
    ),
    [hotKeyEvents]
  )
  return (
    <Drawer
      bodyStyle={DRAWER_STYLE_PROPERTIES.BODY}
      closable={false}
      headerStyle={DRAWER_STYLE_PROPERTIES.HEADER}
      height={DRAWER_HEIGHT}
      onClose={toggleHotKeysInfo}
      placement={Placement.BOTTOM}
      visible={visible}
    >
      <Tabs
        defaultActiveKey={RESOURCE_HOTKEYS_INFO_TAB_KEY}
        centered
        size={TabsSize.SMALL}
      >
        <TabPane
          tab={RESOURCE_HOTKEYS_INFO_TAB_TITLE}
          key={RESOURCE_HOTKEYS_INFO_TAB_KEY}
        >
          {
            hotKeysInfo.length && (
              <List
                grid={{ gutter: 18, column: 3 }}
                split={false}
                dataSource={hotKeysInfo}
                renderItem={renderHotKey}
              />
            )
          }
        </TabPane>
      </Tabs>
    </Drawer>
  )
}

HotKeysDrawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggleHotKeysInfo: PropTypes.func.isRequired,
  hotKeyEvents: PropTypes.arrayOf(PropTypes.string).isRequired
}

const mapStateToProps = (state) => ({
  hotKeyEvents: hotKeysSelector(state)
})

const ConnectedComponent = connect(mapStateToProps)(HotKeysDrawer)

export { ConnectedComponent as HotKeysDrawer }
