import React from 'react'
import PropTypes from 'prop-types'
import { childrenShape } from '@/utils/propTypes'
import { IconButton as Button } from './IconButton.styles'

const IconButton = React.forwardRef(
  ({ icon, onClick, className, disabled, ...restProps }, ref) =>
    <Button
      className={className}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      {...restProps}
    >
      {icon}
    </Button>
)

IconButton.propTypes = {
  icon: childrenShape.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

IconButton.displayName = 'IconButton'

export {
  IconButton
}
