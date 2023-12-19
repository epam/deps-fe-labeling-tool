
import styled from 'styled-components'
import { Button } from '@/components/Button'

const TextButton = styled(Button)`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  box-shadow: none;
  text-align: left;

  &:hover,
  &:active,
  &:focus {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  &:after {
    display: none;
  }
`

export {
  TextButton
}
