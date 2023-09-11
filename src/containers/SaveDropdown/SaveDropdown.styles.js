import styled from 'styled-components'
import { Menu } from '@/components/Menu'
import { COLORS } from '@/theme/theme.default'

const StyledMenu = styled(Menu)`
  min-width: 21rem;

  & > li {
    border: 0.3rem solid transparent;
  }

  & > li:hover {
    border-left: 0.3rem solid ${COLORS.PRIMARY_1_DARKER};
    font-weight: 600;
  }
`

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export {
  Wrapper,
  StyledMenu as Menu
}
