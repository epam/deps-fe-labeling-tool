import { fabric } from 'fabric'
import { Cursor } from '@/enums/Cursor'
import { COLORS } from '@/theme/theme.default'

const FabricBorder = fabric.util.createClass(fabric.Line, {
  type: 'border',
  initialize: function (border, color = COLORS.TABLE_BORDER) {
    fabric.Line.prototype.initialize.call(
      this,
      [
        border.p1.x,
        border.p1.y,
        border.p2.x,
        border.p2.y
      ],
      {
        data: border,
        stroke: color,
        selectable: false,
        hasControls: false,
        hoverCursor: Cursor.DEFAULT,
        hasBorders: false,
        objectCaching: false
      }
    )
  }
})

export {
  FabricBorder
}
