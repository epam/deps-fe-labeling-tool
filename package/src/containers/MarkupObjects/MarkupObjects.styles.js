
import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const GroupTitle = styled.div`
  margin: 0.5rem 0;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.2rem;
  color: ${COLORS.GRAYSCALE_5};
`

const GapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export {
  GapWrapper,
  GroupTitle
}
