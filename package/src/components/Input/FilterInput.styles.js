import { CloseCircleOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const FilterInputWrapper = styled.div`
  position: relative;
`

const CloseOutlinedIcon = styled(CloseCircleOutlined)`
  color: rgba(0,0,0,0.45);
  position: absolute;
  top: 0.5rem;
  right: 0.7rem;

  &:hover {
    color: rgba(0,0,0,0.65);
  }
`

export {
  FilterInputWrapper,
  CloseOutlinedIcon
}
