import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 6fr 4fr;
  column-gap: 1rem;

  .ant-select {
    min-width: 10rem;
  }
`

export {
  Wrapper
}
