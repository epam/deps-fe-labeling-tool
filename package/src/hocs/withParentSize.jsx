
import React from 'react'
import { withSize } from 'react-sizeme'
import styled from 'styled-components'

const FullSize = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const withParentSize = (options) => (ConnectedComponent) => withSize(options)((props) => (
  <FullSize>
    <ConnectedComponent {...props} />
  </FullSize>
))

export {
  withParentSize
}
