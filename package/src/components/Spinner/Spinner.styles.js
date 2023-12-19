import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

export const Center = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 10rem;
  color: ${COLORS.SECONDARY_DARK};
`
