import styled from 'styled-components'
import { Button } from '@/components/Button'
import { COLORS } from '@/theme/theme.default'

const ListItemWrapper = styled.div`
  border: 0.1rem solid ${COLORS.GRAYSCALE_2};
  border-radius: 0.4rem;
  margin: 0.9rem 0;
`

const ListItemHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem 0.6rem 0.4rem;
  background-color: ${COLORS.GRAYSCALE_2};
  border-radius: 0.4rem 0.4rem 0 0;
`

const ListItemTitle = styled.span`
  margin: 0 0.4rem;

  & > span {
    font-weight: 600;
  }
`

const ListItemsLabels = styled.div`
  max-height: 22rem;
  overflow-y: scroll;
  padding: 0.9rem 0.8rem;

  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover {
    padding-right: 0;

    ::-webkit-scrollbar {
      width: 0.8rem;
    }
  }
`

const StyledButton = styled(Button)`
  flex: 1 1 auto;
  text-align: right;
`

const DeleteFieldButton = styled(Button.Icon)`
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
  border: none;
  box-shadow: none;
  background: transparent;
  margin-right: 0.3rem;

  &:hover {
    border: none;
    box-shadow: none;
    background: transparent;
  }

  &:focus {
    color: transparent;
    border: none;
  }

  > svg > path {
    fill: ${COLORS.GRAYSCALE_9};
  }
`

export {
  ListItemWrapper,
  ListItemHeader,
  ListItemTitle,
  ListItemsLabels,
  StyledButton as Button,
  DeleteFieldButton
}
