
import styled, { css } from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const TextWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  position: relative;
  padding: 0.8rem 1.6rem;
  border: 1px solid ${COLORS.GRAYSCALE_1};
  border-radius: 0.4rem;
  ${(props) => props.$unassigned && css`
      background: ${COLORS.GRAYSCALE_1};
    `}
`

const TitleWithIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;
`

const NameSpan = styled.span`
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 600;
  color: ${COLORS.PRIMARY_4};
`

const PageSpan = styled.span`
  margin-left: auto;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${COLORS.GRAYSCALE_8};
`

export {
  TextWrapper,
  TitleWithIconWrapper,
  NameSpan,
  PageSpan
}
