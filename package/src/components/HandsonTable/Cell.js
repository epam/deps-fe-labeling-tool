
import { COLORS } from '@/theme/theme.default'

const renderCell = (td, value, cellProps, extra) => {
  cellProps.readOnly && (td.style.color = COLORS.GRAYSCALE_1)
  td.textContent = value
  extra && td.append(extra)
  return td
}

export {
  renderCell
}
