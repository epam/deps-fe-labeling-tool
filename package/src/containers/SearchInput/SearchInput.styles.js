import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/theme.default'

const StyledInput = styled(Input)`
  position: relative;
  flex: 1 1 auto;
  line-height: 2.2rem;
  padding: 0.5rem 1.2rem;
  margin-right: 0.5rem;

  &::-webkit-input-placeholder {
    color: ${COLORS.SHADOW_1};
  }
`

const StyledSearchIcon = styled(SearchOutlined)`
  color: ${COLORS.GRAYSCALE_4};
`

export {
  StyledInput as Input,
  StyledSearchIcon as SearchIcon
}
