import { fabric } from 'fabric'
import { COLORS } from '@/theme/theme.default'

const FabricSplitProjection = fabric.util.createClass(fabric.Line, {
  type: 'split-line',
  initialize: function (line) {
    fabric.Line.prototype.initialize.call(
      this,
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
})

export {
  FabricSplitProjection
}
