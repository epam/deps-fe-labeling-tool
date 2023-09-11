import styled from 'styled-components'
import { Typography } from '@/components/Typography'
import { COLORS } from '@/theme/theme.default'

const { Paragraph } = Typography

const ObjectName = styled(Paragraph)`
  max-width: 190px;
  height: 2.4rem;
  font-size: 1.2rem;
  line-height: 1.6rem;
  color: ${COLORS.PRIMARY_4};
  padding: 0.4rem 0 0 0.6rem;
  margin-right: 1rem;
  border-left: 2px solid ${(props) => props.color};
`

const ObjectType = styled.span`
  font-size: 1rem;
  line-height: 1.2rem;
  color: ${COLORS.GRAYSCALE_5};
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.4rem;
`

export {
  ObjectName,
  ObjectType,
  Wrapper
}
