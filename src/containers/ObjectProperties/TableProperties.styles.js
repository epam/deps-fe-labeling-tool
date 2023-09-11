import styled from 'styled-components'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const TableDimensions = styled.div`
  display: flex;
  justify-content: space-between;
`

const DimensionsTitle = styled.div`
  margin-bottom: 0.5rem;
  font-style: normal;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 1.2rem;
`

const TableData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TableDataName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const StyledOpenButton = styled(Button)`
  width: 6rem;
`

const DimensionsInput = styled(Input.Numeric)`
  width: 12.5rem;
`

const TableDimensionsRow = styled.div`
  display: flex;
  flex-direction: column;
`

export {
  TableDimensionsRow,
  TableData,
  StyledOpenButton,
  TableDataName,
  TableDimensions,
  DimensionsInput,
  DimensionsTitle
}
