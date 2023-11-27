import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { COLORS } from '@/theme/theme.default'

export const Switcher = styled.div`
  display: inline-flex;
  align-items: center;

  .ant-btn-circle {
    border: none;
  }

  .ant-input-number {
    width: 8rem;
  }

  .ant-input-number-handler-wrap {
    display: none;
  }
`

export const Splitter = styled.span`
  padding: 0 1rem 0.2rem;
  font-size: 1.75rem;

  ${(props) => props.disabled && css`
    color: ${COLORS.SECONDARY};
    cursor: default;
  `}
`

export const PagesQuantity = styled.span`
  font-size: 1.75rem;

  ${(props) => props.disabled && css`
    color: ${COLORS.SECONDARY};
    cursor: default;
  `}
`

export const PaginationButton = styled(Button.Icon)`
  font-size: 0;
 
  :disabled {
    opacity: 0;
    overflow: hidden;
  }
`
