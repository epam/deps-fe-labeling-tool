import { Layout } from 'antd'
import styled, { css } from 'styled-components'
import { Button } from '@/components/Button'
import { Collapse } from '@/components/Collapse'
import { List, ListItem, ListItemMeta } from '@/components/List'
import { TextHighlighter } from '@/components/TextHighlighter'
import { COLORS } from '@/theme/theme.default'

const { Content } = Layout

const buttonStyles = () => css`
  display: flex;
  align-items: center;
  border: none;
  box-shadow: none;
  background: transparent;

  &:hover {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  &:focus {
    color: transparent;
    border: none;
  }
`

const PossibleNamesList = styled(List)`
  border-radius: 0.4rem;
  margin-top: 1.2rem;
`

const ListItemStyled = styled(ListItem)`
  background-color: ${COLORS.GRAYSCALE_7};
  padding: 0.3rem 0 0.3rem 0.4rem;
  transition: width 0.5s ease-in;

  &:nth-child(n+1) {
    border-bottom: 0.1rem solid ${COLORS.PRIMARY_3};
  }

  &:hover > button {
    width: 1.5rem;
  }
`

const ListItemMetaStyled = styled(ListItemMeta)`
  margin: 0.4rem 0 0.4rem 0.8rem;

  && > div {
    display: flex;
  }

  && h4 {
    margin: 0 0.4rem 0 0;
  }
`

const StyledTextHighlighter = styled(TextHighlighter)`
  font-weight: 400;
  font-size: 1.4rem;
`

const StyledRequiredMark = styled.span`
  cursor: pointer;
  display: inline-block;
  color: red;
  width: 2.2rem;
  height: 2.2rem;
`

const HeaderStyled = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.2rem;
  color: ${COLORS.GRAYSCALE_4};
`

const CollapseStyled = styled(Collapse)`
  width: 27.5rem;

  & .ant-collapse-content-box {
    padding: 0 !important;
  }
`

const LayoutStyled = styled(Content)`
  overflow: auto;
  ${(props) => props.height && css`
    height: calc(100vh - ${props.height}rem)
  `}
`

const DeleteListItemButton = styled(Button.Icon)`
  ${() => buttonStyles()};
  width: 0;
`

const DeleteFieldButton = styled(Button.Icon)`
  ${() => buttonStyles()};
  width: 1.5rem;
  margin-right: 1rem;

  > svg > path {
    fill: ${COLORS.GRAYSCALE_9};
  }
`

export {
  PossibleNamesList,
  ListItemStyled,
  ListItemMetaStyled,
  StyledTextHighlighter as TextHighlighter,
  StyledRequiredMark,
  CollapseStyled,
  LayoutStyled,
  HeaderStyled,
  DeleteListItemButton,
  DeleteFieldButton
}
