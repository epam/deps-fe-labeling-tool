import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'

const PropertiesContainer = styled.div`
  padding: 1rem 1.5rem;
`

const StyledDivider = styled(Divider)`
  margin: 0 !important;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
`

const StyledButton = styled(Button)`
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 600;
`

export {
  Grid,
  PropertiesContainer,
  StyledDivider as Divider,
  StyledButton as Button
}
