import styled from 'styled-components'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/theme.default'

const StyledNumericInput = styled(Input.Numeric)`
  flex: 0 1 6.4rem;
  background-color: ${COLORS.PRIMARY_3};

  & input {
    padding: 0 0.8rem;
  }

  & input:disabled{
    background-color: ${COLORS.PRIMARY_3};
  }
`

export {
  StyledNumericInput as NumericInput
}
