
import React from 'react'
import styled from 'styled-components'
import { childrenShape } from '@/utils/propTypes'

const IconSize = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`

const IconSize32 = ({ children, ...rest }) => (
  <IconSize
    width={32}
    height={32}
    {...rest}
  >
    {children}
  </IconSize>
)

const IconSize23 = ({ children, ...rest }) => (
  <IconSize
    width={24}
    height={24}
    {...rest}
  >
    {children}
  </IconSize>
)

IconSize23.propTypes = {
  children: childrenShape.isRequired
}

IconSize32.propTypes = {
  children: childrenShape.isRequired
}

export {
  IconSize,
  IconSize23,
  IconSize32
}
