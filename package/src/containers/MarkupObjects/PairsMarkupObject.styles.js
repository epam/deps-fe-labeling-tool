
import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const KeyValuePairWrapper = styled.div`
  display: flex;
`

const KeyValueItem = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const Circle = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  margin-bottom: 0.5rem;
  border-radius: 50%;
  border: 1px solid ${COLORS.GRAYSCALE_8};
  position: relative;
`

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${COLORS.GRAYSCALE_8};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Tail = styled.div`
  flex: 1;
  height: 100%;
  border-left: 1px solid ${COLORS.GRAYSCALE_8};
`

const IconWrapper = styled.div`
  width: 2.4rem;
  padding: 1.4rem 1.8rem 1.7rem 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export {
  Circle,
  Dot,
  IconWrapper,
  KeyValuePairWrapper,
  KeyValueItem,
  Tail
}
