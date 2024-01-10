
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@/components/Button'
import { Dropdown } from '@/components/Dropdown'
import { ViewOfDataIcon } from '@/components/Icons/ViewOfDataIcon'
import { Menu, MenuTrigger } from '@/components/Menu'
import { Placement } from '@/enums/Placement'

const RESOURCE_CHANGE_VIEW = 'CHANGE_VIEW'

class Group {
  constructor (code, name) {
    this.code = code
    this.name = name
  }
}

const groupShape = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
})

const CHANGE_VIEW_TOOLTIP = {
  placement: Placement.TOP_RIGHT,
  title: RESOURCE_CHANGE_VIEW
}

const FieldsViewSwitcher = ({ groups, setFieldsGrouping }) => {
  const changeView = useCallback(
    (item) => {
      setFieldsGrouping(item.key)
    },
    [setFieldsGrouping]
  )

  const renderMenu = useCallback(
    () => (
      <Menu
        onClick={changeView}
        trigger={MenuTrigger.CLICK}
      >
        {
          groups.map((group) => (
            <Menu.Item
              key={group.code}
              id={group.code}
            >
              {group.name}
            </Menu.Item>
          ))
        }
      </Menu>
    ),
    [changeView, groups]
  )

  return (
    <Dropdown
      overlay={renderMenu()}
    >
      <Button.Icon
        icon={<ViewOfDataIcon />}
        tooltip={CHANGE_VIEW_TOOLTIP}
      />
    </Dropdown>
  )
}

FieldsViewSwitcher.propTypes = {
  groups: PropTypes.arrayOf(groupShape).isRequired,
  setFieldsGrouping: PropTypes.func.isRequired
}

export {
  Group,
  FieldsViewSwitcher
}
