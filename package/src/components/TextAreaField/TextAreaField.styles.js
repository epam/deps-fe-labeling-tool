import styled, { css } from 'styled-components'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/theme.default'

export const StyledTextArea = styled(Input.TextArea)`
  width: 100%;

  &::placeholder {
    color: ${COLORS.GRAYSCALE_4};
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  ${({ resizable }) => !resizable && css`
    & .ant-input {
      resize: none;
    }
  `}

  ${({ showCount }) => showCount && css`
    &::after {
      float: none;
      font-size: 1rem;
      color: ${COLORS.GRAYSCALE_8};
    }
  `}
`
