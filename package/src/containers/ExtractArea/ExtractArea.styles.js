import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'

const StyledDivider = styled(Divider)`
  margin: 0 !important;
`

const StyledButton = styled(Button)`
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 600;
`

export {
  StyledDivider as Divider,
  StyledButton as Button
}
