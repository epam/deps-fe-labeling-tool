import { Menu } from 'antd'
import 'antd/lib/menu/style/index.less'
import styled, { css } from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const ActionMenu = styled(Menu)`
  top: 1rem;
  left: 3rem;
  line-height: 0;
  border-bottom: 0;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const ItemText = styled.div`
  margin: 0 1rem;
  font-weight: 600;
`

const DropdownTools = styled.div`
  display: flex;
  flex-direction: row;

  ${(props) => props.active && css`
    outline: none;
    background-color: ${COLORS.PRIMARY_3};
    border: 1px solid ${COLORS.PRIMARY_2};
  `}

  svg:last-child {
    margin: auto 0;
  }
`

export {
  Item,
  DropdownTools,
  ActionMenu,
  ItemText
}
