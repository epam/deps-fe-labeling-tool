import { fabric } from 'fabric'
import { COLORS } from '@/theme/theme.default'

const SIZE_CELL_BORDER = 1
const SIZE_CELL_CORNER = 6
const SIZE_INITIAL_SCALE = 1

const FabricCell = fabric.util.createClass(fabric.Rect, {
  type: 'cell',
  initialize: function (cell, { borderColor, backgroundColor }) {
    const { x, y, w, h } = cell
    fabric.Rect.prototype.initialize.call(this, {
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
      lockScalingFlip: true,
      data: cell
    })
  }
})

export {
  FabricCell
}
