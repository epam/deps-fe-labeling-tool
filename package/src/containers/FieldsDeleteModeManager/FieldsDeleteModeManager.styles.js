import styled from 'styled-components'
import { TextButton } from '@/components/Button'
import { COLORS } from '@/theme/theme.default'

const DeleteModeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem 1rem 0;
`

const CancelOption = styled(TextButton)`
  width: 7rem;
  justify-content: space-around;
  margin-right: 2rem;
  color: ${COLORS.GRAYSCALE_8};

  &:hover {
    color: ${COLORS.GRAYSCALE_8};
  }
`

const SaveOption = styled(TextButton)`
  width: 7rem;
  justify-content: space-around;
  color: ${COLORS.SUCCESS};

  &:hover {
    color: ${COLORS.SUCCESS};
  }
`

const DeleteButton = styled(TextButton)`
  width: 11rem;
  justify-content: space-between;
  color: ${COLORS.PRIMARY_2};
  font-weight: 600;
`

export {
  DeleteModeWrapper,
  DeleteButton,
  CancelOption,
  SaveOption
}
