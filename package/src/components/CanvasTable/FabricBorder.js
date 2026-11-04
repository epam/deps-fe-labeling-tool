import { Line, classRegistry } from 'fabric'
import { Cursor } from '@/enums/Cursor'
import { COLORS } from '@/theme/theme.default'

class FabricBorder extends Line {
  static type = 'border'

  constructor (border, color = COLORS.TABLE_BORDER) {
    super(
      [
        border.p1.x,
        border.p1.y,
        border.p2.x,
        border.p2.y
      ],
      {
        stroke: color,
        selectable: false,
        hasControls: false,
        hoverCursor: Cursor.DEFAULT,
        hasBorders: false,
        objectCaching: false
      }
    )
    this.data = border
  }
}

classRegistry.setClass(FabricBorder, 'border')
classRegistry.setSVGClass(FabricBorder, 'border')

export {
  FabricBorder
}
