import { Line, classRegistry } from 'fabric'
import { COLORS } from '@/theme/theme.default'

class FabricSplitProjection extends Line {
  static type = 'split-line'

  constructor (line) {
    super(
      [
        line.p1.x,
        line.p1.y,
        line.p2.x,
        line.p2.y
      ],
      {
        selectable: false,
        hasControls: false,
        stroke: COLORS.PRIMARY_EMPHASIS
      }
    )
  }
}

classRegistry.setClass(FabricSplitProjection, 'split-line')
classRegistry.setSVGClass(FabricSplitProjection, 'split-line')

export {
  FabricSplitProjection
}
