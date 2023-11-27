import React from 'react'
import PropTypes from 'prop-types'
import { Placement } from '@/enums/Placement'
import { Label, StyledTooltip } from './FieldLabel.styles'

const RESOURCE_REQUIRED_FIELD = 'Required Field'

const renderLabelContent = (name, required) => {
  if (required) {
    return (
      <StyledTooltip
        placement={Placement.LEFT}
        title={RESOURCE_REQUIRED_FIELD}
        required={required}
      >
        {name}
      </StyledTooltip>
    )
  }

  return (
    <span>{name}</span>
  )
}

const FieldLabel = ({
  active,
  clickable,
  name,
  required,
  className
}) => (
  <Label
    active={active}
    clickable={clickable}
    className={className}
  >
    {renderLabelContent(name, required)}
  </Label>
)

FieldLabel.propTypes = {
  active: PropTypes.bool,
  clickable: PropTypes.bool,
  name: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element
  ]),
  required: PropTypes.bool,
  className: PropTypes.string
}

export { FieldLabel }
