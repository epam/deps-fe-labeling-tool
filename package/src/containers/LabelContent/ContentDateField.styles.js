import styled from 'styled-components'
import { DatePicker } from '@/components/DatePicker'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/theme.default'

export const InputWrapper = styled.div`
  position: relative;
`

export const StyledInput = styled(Input)`
  padding: 0 3.2rem 0 1.2rem;
  height: 3.2rem;
  color: ${COLORS.GRAYSCALE_8};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem;
`

export const StyledDatePicker = styled(DatePicker)`
  padding: 0;
  position: absolute;
  top: 50%;
  right: 0.8rem;
  border: none;
  box-shadow: none;
  translate: 0 -50%;
  line-height: 0;

  & .ant-picker-suffix {
    margin: 0;
  }

  & .ant-picker-clear {
    right: 50%;
    transform: translate(50%, -50%);
  }

  & .ant-picker-input {
    cursor: pointer;

    & > input {
      display: none;
    }
  }
`
