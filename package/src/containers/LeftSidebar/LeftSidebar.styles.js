import styled, { css } from 'styled-components'
import { Sider } from '@/components/Sider'
import { Tabs } from '@/components/Tabs'
import { COLORS } from '@/theme/theme.default'

const mapPxToRem = (pxValue) => `${pxValue / 10}rem`

const StyledSider = styled(Sider)`
  z-index: 3;
  box-shadow: 1px 4px 14px rgba(0, 0, 0, 0.11);
  position: absolute;
  height: 100%;

  & .ant-layout-sider-zero-width-trigger {
    position: relative;
  }

  & .ant-collapse-header {
    min-height: 3.2rem;
    align-items: center !important;
    padding: 0 !important;
  }

  & .ant-tabs-nav-wrap {
    justify-content: center;
  }
`

const Toggler = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: grid;
  align-items: center;
  align-self: end;
  justify-items: end;
  cursor: pointer;
  width: 30rem;
  box-shadow: 0 -1px 0 ${COLORS.GRAYSCALE_1};
  padding: 0 2rem;
  min-height: 4.8rem;
  background: ${COLORS.PRIMARY_3};

  ${(props) => props.collapsed && css`
    justify-items: center;
    border: 0.6px solid ${COLORS.GRAYSCALE_1};
    width: 3rem;
    height: 3rem;
    min-height: 0;
    box-shadow: none;
    bottom: 1.6rem;
    left: 1.6rem;
    padding: 0;
  `}
`

const TabsStyled = styled(Tabs)`
  .ant-tabs-tab {
    margin: 0.8rem 1.8rem !important;
  }
`

const TabContent = styled.div`
  overflow: auto;

  ${(props) => props.height && css`
    height: ${mapPxToRem(props.height)};
  `}
`

export {
  Toggler,
  StyledSider as Sider,
  TabsStyled,
  TabContent
}
