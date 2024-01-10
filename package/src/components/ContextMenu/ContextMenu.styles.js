import styled from 'styled-components'

const DropdownPosition = styled.div`
  ${({ x, y }) => `
    position: absolute;
    left: ${x / 10}rem;
    top: ${y / 10}rem;
  `}
`

export {
  DropdownPosition
}
