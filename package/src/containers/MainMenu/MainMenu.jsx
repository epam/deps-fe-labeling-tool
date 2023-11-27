import React, { useMemo } from 'react'
import { Dropdown, Menu } from 'antd'
import 'antd/lib/dropdown/style/index.less'
import 'antd/lib/modal/style/index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { importMarkup, exportMarkup } from '@/actions/markup'
import UserGuide from '@/assets/pdfs/Labeling_Tool_Guide.pdf'
import { Button } from '@/components/Button'
import { MenuIcon } from '@/components/Icons/MenuIcon'
import { Tooltip } from '@/components/Tooltip'
import { Feature } from '@/enums/Feature'
import { Placement } from '@/enums/Placement'
import { markupShape } from '@/models/Markup'
import { Settings, settingsShape } from '@/models/Settings'
import { markupSelector } from '@/selectors/markup'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'
import { ActionMenu } from './MainMenu.styles'

const RESOURCE_DOCUMENT_NAME = 'Labeling_Tool_Guide.pdf'

const RESOURCE_TOOLTIP_MAIN_MENU = 'Main menu'

const MenuTrigger = {
  CLICK: 'click'
}

const MenuItem = {
  IMPORT: 'import',
  EXPORT: 'export',
  HOT_KEYS: 'hotKeys',
  USER_GUIDE: 'userGuide'
}

const RESOURCE_MENU_ITEM = {
  [MenuItem.IMPORT]: 'Import markup',
  [MenuItem.EXPORT]: 'Export markup',
  [MenuItem.HOT_KEYS]: 'Hot keys info',
  [MenuItem.USER_GUIDE]: 'Download User Guide'
}

const MENU_ITEMS_TO_FEATURES = {
  [MenuItem.IMPORT]: [
    Feature.IMPORT,
    Feature.EXPORT
  ],
  [MenuItem.EXPORT]: [
    Feature.IMPORT,
    Feature.EXPORT
  ]
}

const isMenuItemAvailable = (settings, menuItem) => (
  MENU_ITEMS_TO_FEATURES[menuItem].every((f) => Settings.has(settings, f))
)

const getMenuItems = (settings) => {
  const items = []

  if (isMenuItemAvailable(settings, MenuItem.IMPORT)) {
    items.push(MenuItem.IMPORT)
  }

  if (isMenuItemAvailable(settings, MenuItem.EXPORT)) {
    items.push(MenuItem.EXPORT)
  }

  items.push(MenuItem.HOT_KEYS)

  items.push(MenuItem.USER_GUIDE)

  return items
}

const MainMenu = ({
  settings,
  importMarkup,
  exportMarkup,
  toggleHotKeysInfo,
  markup
}) => {
  const downloadUserGuide = async () => {
    const link = document.createElement('a')
    const pdfBase64 = await fetch(UserGuide)

    const blobPdf = await pdfBase64.blob()
    const href = URL.createObjectURL(blobPdf)

    link.href = href
    link.download = RESOURCE_DOCUMENT_NAME
    link.click()

    URL.revokeObjectURL(href)
    link.remove()
  }

  const menuItemToOnClick = useMemo(
    () => ({
      [MenuItem.IMPORT]: importMarkup,
      [MenuItem.EXPORT]: exportMarkup,
      [MenuItem.HOT_KEYS]: toggleHotKeysInfo,
      [MenuItem.USER_GUIDE]: downloadUserGuide
    }),
    [
      importMarkup,
      exportMarkup,
      toggleHotKeysInfo
    ]
  )

  const menuItemToIsDisabled = useMemo(
    () => ({
      [MenuItem.IMPORT]: () => false,
      [MenuItem.EXPORT]: () => !markup,
      [MenuItem.HOT_KEYS]: () => false,
      [MenuItem.USER_GUIDE]: () => false
    }),
    [markup]
  )

  const onMenuItemClick = (menuItem) => {
    const onClick = menuItemToOnClick[menuItem.key]
    onClick()
  }

  const renderMainMenuItem = (menuItem) => {
    const isDisabled = menuItemToIsDisabled[menuItem]
    return (
      <Menu.Item
        key={menuItem}
        disabled={isDisabled()}
      >
        {
          RESOURCE_MENU_ITEM[menuItem]
        }
      </Menu.Item>
    )
  }

  const menu = () => (
    <ActionMenu
      onClick={onMenuItemClick}
    >
      {
        getMenuItems(settings).map(renderMainMenuItem)
      }
    </ActionMenu>
  )

  return (
    <Dropdown
      overlay={menu}
      placement={Placement.BOTTOM_CENTER}
      trigger={MenuTrigger.CLICK}
    >
      <Tooltip title={RESOURCE_TOOLTIP_MAIN_MENU}>
        <Button.Icon icon={<MenuIcon />} />
      </Tooltip>
    </Dropdown>
  )
}

MainMenu.propTypes = {
  settings: settingsShape,
  importMarkup: PropTypes.func.isRequired,
  exportMarkup: PropTypes.func.isRequired,
  toggleHotKeysInfo: PropTypes.func.isRequired,
  markup: markupShape
}

const mapStateToProps = (state) => ({
  markup: markupSelector(state),
  selectedTool: selectedToolSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  importMarkup,
  exportMarkup
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MainMenu)

export {
  ConnectedComponent as MainMenu
}
