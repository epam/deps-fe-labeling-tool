import styled from 'styled-components'
import { Button } from '@/components/Button'

const SymbolsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.4em;
`

const SymbolButton = styled(Button)`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0 0.4rem;
`

const TogglerButton = styled(Button)`
  text-align: left;
`

export {
  SymbolButton,
  SymbolsContainer,
  TogglerButton
}
