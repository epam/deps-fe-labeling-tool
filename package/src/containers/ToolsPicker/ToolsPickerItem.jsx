import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { IconSize32 } from '@/components/IconSize'
import { Tooltip } from '@/components/Tooltip'
import { RESOURCE_TOOL_TOOLTIP, TOOL_TO_ICON, Tool } from '@/enums/Tool'
import { ButtonIcon } from './ToolsPicker.styles'

const ToolsPickerItem = ({
  tool,
  selectedTool,
  onClick
}) => {
  const onItemClick = useCallback(
    () => {
      onClick(tool)
    },
    [
      tool,
      onClick
    ]
  )

  const ToolIcon = TOOL_TO_ICON[tool]
  return (
    <Tooltip
      title={RESOURCE_TOOL_TOOLTIP[tool]}
    >
      <ButtonIcon
        icon={
          <IconSize32>
            <ToolIcon />
          </IconSize32>
        }
        onClick={onItemClick}
        $active={selectedTool === tool}
      />
    </Tooltip>
  )
}

ToolsPickerItem.propTypes = {
  tool: PropTypes.oneOf(
    Object.values(Tool)
  ).isRequired,
  selectedTool: PropTypes.oneOf(
    Object.values(Tool)
  ).isRequired,
  onClick: PropTypes.func.isRequired
}

export {
  ToolsPickerItem
}
