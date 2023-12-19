import { addColumn } from '@/models/Table/addColumn'
import { transpose } from '@/models/Table/transpose'

const addRow = (table, guideline) => (
  transpose(
    addColumn(
      transpose(table),
      guideline
    )
  )
)

export {
  addRow
}
