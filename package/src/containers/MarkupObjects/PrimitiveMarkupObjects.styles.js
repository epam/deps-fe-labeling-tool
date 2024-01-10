import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const Badge = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 700;
  color: ${COLORS.PRIMARY_2};

  &:hover {
    background: ${COLORS.PRIMARY_5_TRANSPARENT};
  }
`

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
  width: 2.4rem;
  height: 2.4rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: ${COLORS.PRIMARY_5_TRANSPARENT};
  }
`

export { Badge, IconWrapper }
