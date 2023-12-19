import { CellsMerge } from '@/models/Table/CellsMerge'
import { CellValue } from '@/models/Table/CellValue'

const transpose = (table) => ({
  ...table,
  xGuidelines: table.yGuidelines,
  yGuidelines: table.xGuidelines,
  merges: table.merges.map(CellsMerge.transpose),
  values: table.values.map(CellValue.transpose)
})

export {
  transpose
}
