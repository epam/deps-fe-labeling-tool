
import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const RadioGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.8rem 0 1.2rem;
  border: 1px solid ${COLORS.GRAYSCALE_1};
  border-radius: 4px;
  height: 3.2rem;
  width: 100%;
  max-width: 100%;
  transition: all 0.3s;

  &:focus-within {
    border-color: ${COLORS.PRIMARY_2};
  }

`

export {
  RadioGroupWrapper
}
