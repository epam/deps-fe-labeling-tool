import { deleteColumn } from '@/models/Table/deleteColumn'
import { transpose } from '@/models/Table/transpose'

const deleteRow = (table, guideline1, guideline2) => (
  transpose(
    deleteColumn(
      transpose(table),
      guideline1,
      guideline2
    )
  )
)

export {
  deleteRow
}
