import styled, { css } from 'styled-components'
import { Tooltip } from '@/components/Tooltip'
import { COLORS } from '@/theme/theme.default'

const baseActiveLabelStyles = css`
  font-weight: bold;
  text-decoration: underline;
`

export const Label = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.4rem;

  & > span {
    cursor: default;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    line-height: 2.5rem;
    font-weight: 600;
    padding: 0;
    color: rgb(38, 45, 54);
    text-transform: uppercase;

    & > span {
      font-size: 1.8rem;
    }

    ${(props) => props.active && baseActiveLabelStyles}
  }

  ${(props) => props.clickable && css`
    & > span:hover {
      cursor: pointer;
      ${baseActiveLabelStyles}
    }
  `}
`

export const StyledTooltip = styled(Tooltip)`
  ${({ required }) => required && css`
      &::before {
        content: '*';
        color: ${COLORS.FIELD_LABEL_TOOLTIP_TEXT};
        margin-right: 0.4rem;
        font-size: 1.6rem;
        line-height: 1rem;
      }
    `}
`
