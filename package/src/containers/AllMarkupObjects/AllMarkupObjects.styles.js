import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { Collapse } from '@/components/Collapse'

const ButtonIcon = styled(Button.Icon)`
  display: flex;
  align-items: center;
`

const DocumentName = styled.h1`
  min-height: 3.2rem;
  display: flex;
  align-items: center;
  margin: 0;
`

const ExtraIcons = styled.div`
  display: flex;
`

const FiltersWrapper = styled.div`
  display: flex;
  margin: 0.8rem 0;
`

const MarkupCollapse = styled(Collapse)`
  width: 29.2rem;
  align-items: center;
  border-left: 0.2rem solid transparent;
  padding: 1rem 1.6rem !important;
  cursor: pointer;
  ${(props) => props.$unassigned && css`
      border-left: 0.2rem solid red;
      margin: 0.2rem 0;
    `}

  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`

export {
  ButtonIcon,
  FiltersWrapper,
  DocumentName,
  ExtraIcons,
  MarkupCollapse as Collapse
}
