import React, { PureComponent } from 'react'
import { Dropdown, Menu } from 'antd'
import 'antd/lib/dropdown/style/index.less'
import 'antd/lib/menu/style/index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DropdownIcon } from '@/components/Icons/DropdownIcon'
import { IconSize32 } from '@/components/IconSize'
import { Tooltip } from '@/components/Tooltip'
import { ToolsPickerItem } from '@/containers/ToolsPicker/ToolsPickerItem'
import { MenuTrigger } from '@/enums/MenuTrigger'
import { Placement } from '@/enums/Placement'
import { Tool, TOOL_TO_ICON, RESOURCE_TOOL, RESOURCE_TOOL_TOOLTIP } from '@/enums/Tool'
import { Settings, settingsShape } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { ButtonIcon } from './ToolsPicker.styles'
import { ActionMenu, Item, DropdownTools, ItemText } from './ToolsPickerDropdown.styles'

const PRIMARY_TO_SECONDARY_TOOLS = {
  [Tool.TABLE]: [
    Tool.MERGE,
    Tool.SPLIT
  ]
}

const TOOLTIP_ZINDEX = 0

class ToolsPickerDropdown extends PureComponent {
  static propTypes = {
    tools: PropTypes.arrayOf(
      PropTypes.oneOf(
        Object.values(Tool)
      )
    ).isRequired,
    selectedTool: PropTypes.oneOf(
      Object.values(Tool)
    ).isRequired,
    settings: settingsShape.isRequired,
    onSelection: PropTypes.func.isRequired
  }

  state = {
    visibleTool: undefined
  }

  static getDerivedStateFromProps = (props, state) => {
    if (
      props.tools.includes(props.selectedTool) &&
      state.visibleTool !== props.selectedTool
    ) {
      return {
        visibleTool: props.selectedTool
      }
    }

    if (!state.visibleTool) {
      return {
        visibleTool: props.tools[0]
      }
    }

    return state
  }

  getDropdownTools = () => {
    return this.props.tools.filter((t) => t !== this.state.visibleTool)
  }

  renderDropdownItem = (tool) => {
    const ToolIcon = TOOL_TO_ICON[tool]
    return (
      <Menu.Item
        key={tool}
      >
        {
          <Tooltip title={RESOURCE_TOOL_TOOLTIP[tool]}>
            <Item>
              {<IconSize32><ToolIcon /></IconSize32>}
              <ItemText>
                {RESOURCE_TOOL[tool]}
              </ItemText>
            </Item>
          </Tooltip>
        }
      </Menu.Item>
    )
  }

  renderToolsDropdown = () => {
    const dropdownTools = this.getDropdownTools()
    const overlay = (
      <ActionMenu
        onClick={(item) => this.props.onSelection(item.key)}
      >
        {
          dropdownTools.map(this.renderDropdownItem)
        }
      </ActionMenu>
    )

    return !!dropdownTools.length && (
      <Dropdown
        overlay={overlay}
        placement={Placement.BOTTOM_CENTER}
        trigger={MenuTrigger.CLICK}
      >
        <DropdownIcon />
      </Dropdown>
    )
  }

  renderVisibleTool = () => {
    const VisibleToolIcon = TOOL_TO_ICON[this.state.visibleTool]
    return (
      <Tooltip title={RESOURCE_TOOL_TOOLTIP[this.state.visibleTool]}>
        <IconSize32>
          <VisibleToolIcon onClick={() => this.props.onSelection(this.state.visibleTool)} />
        </IconSize32>
      </Tooltip>
    )
  }

  renderSecondaryTools = () => {
    const secondaryTools = PRIMARY_TO_SECONDARY_TOOLS[this.state.visibleTool] || []
    return secondaryTools
      .filter((tool) => Settings.has(this.props.settings, tool))
      .map((tool) => (
        <ToolsPickerItem
          key={tool}
          tool={tool}
          selectedTool={this.props.selectedTool}
          onClick={this.props.onSelection}
        />
      ))
  }

  render = () => (
    <>
      <Tooltip title={RESOURCE_TOOL_TOOLTIP[this.state.visibleTool]} zIndex={TOOLTIP_ZINDEX}>
        <ButtonIcon
          icon={
            <DropdownTools>
              {this.renderVisibleTool()}
              {this.renderToolsDropdown()}
            </DropdownTools>
          }
          $active={this.state.visibleTool === this.props.selectedTool}
        />
      </Tooltip>
      {this.renderSecondaryTools()}
    </>
  )
}

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
})

const ConnectedComponent = connect(mapStateToProps)(ToolsPickerDropdown)

export {
  ConnectedComponent as ToolsPickerDropdown
}
