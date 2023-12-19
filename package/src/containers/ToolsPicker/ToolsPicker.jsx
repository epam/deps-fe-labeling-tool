import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeTool } from '@/actions/tools'
import { HotKeyEvent, HotKeyModifier } from '@/constants/hotKeys'
import { ToolsPickerDropdown } from '@/containers/ToolsPicker/ToolsPickerDropdown'
import { ToolsPickerItem } from '@/containers/ToolsPicker/ToolsPickerItem'
import { Tool } from '@/enums/Tool'
import { withHotKeys } from '@/hocs/withHotKeys'
import { Settings, settingsShape } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'

const GENERAL_TOOLS = [
  Tool.POINTER,
  Tool.GRABBING
]

const PRIMARY_TOOLS = [
  Tool.LABEL,
  Tool.TABLE,
  Tool.DETECT_TABLES
]

const TOOL_TO_HOTKEY = {
  [Tool.POINTER]: HotKeyEvent.SELECT_TOOL_POINTER,
  [Tool.DETECT_TABLES]: HotKeyEvent.SELECT_TOOL_DETECT_TABLES,
  [Tool.LABEL]: HotKeyEvent.SELECT_TOOL_LABEL,
  [Tool.TABLE]: HotKeyEvent.SELECT_TOOL_TABLE,
  [Tool.MERGE]: HotKeyEvent.SELECT_TOOL_TABLE_MERGE,
  [Tool.SPLIT]: HotKeyEvent.SELECT_TOOL_TABLE_SPLIT
}

const TOOL_TO_MODIFIER = {
  [Tool.SPLIT]: HotKeyModifier.SPLIT_ALL
}

class ToolsPicker extends PureComponent {
  static propTypes = {
    settings: settingsShape,
    selectedTool: PropTypes.oneOf(
      Object.values(Tool)
    ).isRequired,
    changeTool: PropTypes.func.isRequired,
    registerHandlers: PropTypes.func.isRequired,
    registerModifiers: PropTypes.func.isRequired
  }

  componentDidMount = () => {
    const hotKeyHandlers = this.props.settings.tools.reduce((acc, t) => {
      const tool = t.code ?? t

      if (TOOL_TO_MODIFIER[tool]) {
        this.props.registerModifiers(
          [TOOL_TO_MODIFIER[tool].name]
        )
      }

      if (TOOL_TO_HOTKEY[tool]) {
        return {
          ...acc,
          [TOOL_TO_HOTKEY[tool]]: () => this.props.changeTool(tool)
        }
      }

      return acc
    }, {})

    this.props.registerHandlers(hotKeyHandlers)
  }

  getPrimaryTools = () => (
    PRIMARY_TOOLS.filter((t) => Settings.has(this.props.settings, t))
  )

  renderToolsDropdown = () => {
    const enabledPrimaryTools = this.getPrimaryTools()
    return !!enabledPrimaryTools.length && (
      <ToolsPickerDropdown
        tools={enabledPrimaryTools}
        selectedTool={this.props.selectedTool}
        onSelection={this.props.changeTool}
      />
    )
  }

  renderToolsPickerItem = (tool) => Settings.has(this.props.settings, tool) && (
    <ToolsPickerItem
      key={tool}
      tool={tool}
      selectedTool={this.props.selectedTool}
      onClick={this.props.changeTool}
    />
  )

  render = () => (
    <>
      {
        GENERAL_TOOLS.map(this.renderToolsPickerItem)
      }
      {
        this.renderToolsDropdown()
      }
    </>
  )
}

const mapStateToProps = (state) => ({
  settings: settingsSelector(state),
  selectedTool: selectedToolSelector(state)
})

const mapDispatchToProps = {
  changeTool
}

const ConnectedComponent = withHotKeys(
  connect(mapStateToProps, mapDispatchToProps)(ToolsPicker)
)

const isToolsPickerEmpty = (settings) => {
  if (!settings?.tools) {
    return true
  }

  const generalTool = GENERAL_TOOLS.find((t) => settings.tools.includes(t))
  const primaryTool = PRIMARY_TOOLS.find((t) => settings.tools.includes(t))
  return !generalTool && !primaryTool
}

export {
  ConnectedComponent as ToolsPicker,
  isToolsPickerEmpty
}
