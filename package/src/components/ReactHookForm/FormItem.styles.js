import styled, { css } from 'styled-components'
import { FieldLabel } from '@/components/FieldLabel'
import { COLORS } from '@/theme/theme.default'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => props.hasError && css`
      .ant-select,
      .ant-input {
        border-color: ${COLORS.ERROR};

        &:focus {
          box-shadow: 0 0 0 2px rgb(255 77 79 / 20%);
          outline: 0;
        }
      }
    `}
`

const StyledFieldLabel = styled(FieldLabel)`
  font-size: 1.6rem;
  line-height: 3.2rem;
  padding: 0;

  span > span > span {
    font-size: 1.6rem;
  }
`

const ErrorMessage = styled.div`
  font-size: 1.4rem;
  min-height: 2.4rem;
  color: ${COLORS.ERROR};
`

export {
  Wrapper,
  StyledFieldLabel as FieldLabel,
  ErrorMessage
}
