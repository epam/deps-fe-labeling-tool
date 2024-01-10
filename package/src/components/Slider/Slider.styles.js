import { Col, Row } from 'antd'
import 'antd/lib/grid/style/index.less'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { COLORS } from '@/theme/theme.default'

export const SliderComponent = styled(Row)`
  width: 20rem;

  & input {
    height: 2.2rem !important;
  }
`

export const IconWrapper = styled(Col)`
  position: relative;
  padding: 0 3rem;
`

export const SliderButton = styled(Button.Icon)`
  position: absolute;
  top: 0;
  width: 2.9rem;
  border-radius: 50%;
  color: ${COLORS.GRAYSCALE_4};
  background-color: transparent !important;
  line-height: 1;
  cursor: pointer;
  border-color: white;
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
  font-size: 1.5rem;

  &:focus, &:active {
    color: ${COLORS.GRAYSCALE_4};
  }

  :disabled {
    color: ${COLORS.GRAYSCALE_4};
    background-color: white;
    cursor: default;
  }

  :first-child {
    left: 0;
  }

  :last-child {
    right: 0;
  }

  &::after {
    animation-duration: 0s !important;
  }
`

export const ScaleInputNumber = styled(Input.Numeric)`
  width: 7.5rem;
  top: 0.4rem;
  margin: 0;
`
