import styled, { css } from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const separatorPseudo = css`
  content: ' ';
  height: 3rem;
  width: 1px;
  position: absolute;
  background: ${COLORS.SHADOW_1};
  top: 0.7rem;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr 4fr;
  padding: 0.7rem;

  .ant-btn {
    margin: 0 2px;
  }
`

const Block = styled.div`
  display: flex;
  align-items: center;
`

const RightBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const RightSeparator = styled.div`
  line-height: 0;

  &:not(:first-child) {
    margin-left: 1.3rem;
  }

  &::after {
    ${separatorPseudo}
    margin: 0.5rem 0.6rem;
  }
`

const LeftSeparator = styled.div`
  line-height: 0;

  &:not(:last-child) {
    margin-right: 1.3rem;
  }

  &::before {
    ${separatorPseudo}
    margin: 0.5rem -0.7rem;
  }
`

const Row = styled.div`
  display: inline-flex;
`

export {
  Row,
  Wrapper,
  Block,
  RightBlock,
  RightSeparator,
  LeftSeparator
}
