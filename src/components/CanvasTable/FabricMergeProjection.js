import { fabric } from 'fabric'
import { COLORS } from '@/theme/theme.default'

const FabricMergeProjection = fabric.util.createClass(fabric.Rect, {
  type: 'merge-projection',
  initialize: function (rectangle) {
    const { x, y, w, h } = rectangle
    fabric.Rect.prototype.initialize.call(this, {
      left: x,
      top: y,
      width: w,
      height: h,
      fill: COLORS.MERGE_PROJECTION_BACKGROUND,
      selectable: false,
      hasControls: false
    })
  }
})

export {
  FabricMergeProjection
}
