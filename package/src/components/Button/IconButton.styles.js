import { Button as AntdButton } from 'antd'
import 'antd/lib/button/style/index.less'
import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const IconButton = styled(AntdButton)`
  margin: 0;
  padding: 0;
  border: 1px solid ${COLORS.PRIMARY_3};
  box-shadow: none;

  &:hover {
    background-color: ${COLORS.PRIMARY_3};
    box-shadow: 0 0 3px ${COLORS.SHADOW_5};
  }

  &:focus, &:active {
    outline: none;
    background-color: ${COLORS.PRIMARY_3};
    border: 1px solid ${COLORS.PRIMARY_3};
  }
`

export {
  IconButton
}
