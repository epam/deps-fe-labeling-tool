import styled from 'styled-components'
import { Select } from '@/components/Select'
import { COLORS } from '@/theme/theme.default'

const StyledSelect = styled(Select)`
  font-size: 1.6rem;
  line-height: 2.2rem;
  color: ${COLORS.PRIMARY_4_TRANSPARENT};
`

export {
  StyledSelect as Select
}
