import React from 'react'
import { StyledButton } from './Button.styles'

const ButtonType = {
  DEFAULT: 'default',
  LINK: 'link',
  PRIMARY: 'primary'
}

const Button = React.forwardRef(
  (props, ref) =>
    <StyledButton
      ref={ref}
      {...props}
    />
)

Button.displayName = 'Button'

export {
  Button,
  ButtonType
}
