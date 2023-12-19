
import styled from 'styled-components'
import { Collapse } from '@/components/Collapse'
import { COLORS } from '@/theme/theme.default'

const NameSpan = styled.span`
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${COLORS.PRIMARY_4};
`

const ListName = styled(NameSpan)`
  align-items: center;
  font-size: 1.4rem;
  line-height: 2.2rem;
  font-weight: 600;
`

const ListContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-left: 0.8rem;
`

const MarkupCollapse = styled(Collapse)`
  align-items: center;
`

export {
  ListName,
  ListContentWrapper,
  MarkupCollapse as Collapse
}
