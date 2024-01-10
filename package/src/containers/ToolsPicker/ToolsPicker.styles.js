import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { COLORS } from '@/theme/theme.default'

const ButtonIcon = styled(Button.Icon)`
  ${(props) => props.$active && css`
    border: 1px solid ${COLORS.PRIMARY_2};
    &:focus, &:active {
      outline: none;
      background-color: ${COLORS.PRIMARY_3};
      border: 1px solid ${COLORS.PRIMARY_2};
    }
  `}
`

export {
  ButtonIcon
}
