import { Rect, classRegistry } from 'fabric'
import { COLORS } from '@/theme/theme.default'

class FabricMergeProjection extends Rect {
  static type = 'merge-projection'

  constructor (rectangle) {
    const { x, y, w, h } = rectangle
    super({
      left: x,
      top: y,
      width: w,
      height: h,
      fill: COLORS.AREA_BACKGROUND,
      selectable: false,
      hasControls: false
    })
  }
}

classRegistry.setClass(FabricMergeProjection, 'merge-projection')
classRegistry.setSVGClass(FabricMergeProjection, 'merge-projection')

export {
  FabricMergeProjection
}
