import { Rect, classRegistry } from 'fabric'
import { COLORS } from '@/theme/theme.default'

const SIZE_CELL_BORDER = 1
const SIZE_CELL_CORNER = 6
const SIZE_INITIAL_SCALE = 1

class FabricCell extends Rect {
  static type = 'cell'

  constructor (cell, { borderColor, backgroundColor }) {
    const { x, y, w, h } = cell
    super({
      left: x,
      top: y,
      width: w,
      height: h,
      scaleX: SIZE_INITIAL_SCALE,
      scaleY: SIZE_INITIAL_SCALE,
      stroke: borderColor,
      fill: backgroundColor,
      cornerColor: COLORS.TABLE_BORDER,
      strokeWidth: SIZE_CELL_BORDER,
      cornerSize: SIZE_CELL_CORNER,
      transparentCorners: false,
      objectCaching: false,
      strokeUniform: true,
      selectable: true,
      lockScalingFlip: true
    })
    this.data = cell
  }
}

classRegistry.setClass(FabricCell, 'cell')
classRegistry.setSVGClass(FabricCell, 'cell')

export {
  FabricCell
}
