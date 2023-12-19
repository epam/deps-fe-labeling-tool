import { InfoCircleFilled } from '@ant-design/icons/lib/icons'
import { Drawer } from 'antd'
import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Collapse } from '@/components/Collapse'
import { COLORS } from '@/theme/theme.default'
import 'antd/lib/drawer/style/index.less'

const StyledDrawer = styled(Drawer)`
  z-index: 1060;

  .ant-drawer-content-wrapper > div {
    padding: 0 2rem !important;
  }

  .ant-drawer-header,
  .ant-drawer-body,
  .ant-drawer-footer {
    padding-left: 0;
    padding-right: 0;
  }
`

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header,
  .ant-collapse-content-box {
    padding-left: 0 !important;
  }

  .ant-collapse-header {
    color: ${COLORS.PRIMARY_2} !important;

    .ant-collapse-arrow {
      right: auto !important;
      left: 13rem !important;
      color: ${COLORS.PRIMARY_2};
    }
  }
`

const StyledInfoIcon = styled(InfoCircleFilled)`
  margin-right: 1rem;
  color: ${COLORS.GRAYSCALE_4};
`

const DrawerFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button:nth-child(1) {
    margin-right: 1rem;
  }
`

const AddButton = styled(Button)`
  padding: 0.4rem 1.5rem;
  background-color: ${COLORS.PRIMARY_2};
  color: ${COLORS.PRIMARY_3};
  border: none;

  &:disabled,
  &:disabled:hover {
    background-color: ${COLORS.PRIMARY_2};
    color: ${COLORS.PRIMARY_3};
    opacity: 0.5;
    border: none;
  }
`

const CancelButton = styled(Button)`
  margin-right: 1rem;
  border-color: ${COLORS.ADD_FIELD_BORDER};
  color: ${COLORS.ADD_FIELD_BORDER};
  padding: 0.4rem 1.5rem;
`

const CheckboxWrapper = styled.div`
  & > div {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 12px;

    & > label {
      margin-right: 0.5rem;
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  line-height: 22px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0,0,0,0.85);

  span {
    margin-right: 1rem;
    color: rgb(101, 113, 129);
  }
`

const AddFieldButton = styled(Button)`
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  border: none;
  color: ${COLORS.PRIMARY_2};
  box-shadow: none;

  &:hover {
    border: none;
    box-shadow: none;
  }

  & svg {
    font-size: 2rem;
  }

  & > span {
    font-size: 1.4rem;
    font-weight: 600;
  }
`

const AddFieldFormWrapper = styled.div`
  & .ant-btn {
    width: auto;
    display: flex;
    margin-right: 0.1rem;
    border: 0.1rem solid transparent;
    font-size: 2rem;
    color: ${COLORS.PRIMARY_2};

    &:hover {
      color: ${COLORS.PRIMARY_2};
    }
  }
`

const AddFieldFormContext = styled.span`
  color: ${COLORS.PRIMARY_2};
  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    color: ${COLORS.ADD_FIELD_BORDER};
  }
`

export {
  StyledDrawer as Drawer,
  StyledCollapse as Collapse,
  StyledInfoIcon as InfoIcon,
  DrawerFooterWrapper,
  CheckboxWrapper,
  CancelButton,
  AddButton,
  HeaderWrapper,
  AddFieldButton,
  AddFieldFormWrapper,
  AddFieldFormContext
}
