import styled from 'styled-components'
import { COLORS } from '@/theme/theme.default'

const InputPrefix = styled.div`
  display: flex;
  justify-content: space-between;
  width: 3rem;
`

const Param = styled.span`
  text-transform: uppercase;
  color: ${COLORS.GRAYSCALE_5};
`

const InputsWrapper = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 4.8rem;
  grid-row-gap: 0.8rem;

  > span {
    width: 8.8rem;
  }

  .ant-input-prefix {
    margin: 0;
  }

  .ant-input-affix-wrapper {
    height: 2.4rem;
    padding: 0 0.6rem;
  }
`

export {
  InputPrefix,
  Param,
  InputsWrapper
}
