import { fabric } from 'fabric'

const FabricArrow = fabric.util.createClass(fabric.Line, {
  type: 'arrow',

  _render: function (ctx) {
    this.callSuper('_render', ctx)

    if (
      this.width === 0 ||
      this.height === 0 ||
      !this.visible
    ) {
      return
    }

    ctx.save()
    const xDiff = this.x2 - this.x1
    const yDiff = this.y2 - this.y1
    const angle = Math.atan2(yDiff, xDiff)
    ctx.translate((xDiff) / 2, (yDiff) / 2)
    ctx.rotate(angle)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(-this.size, this.size / 2)
    ctx.lineTo(-this.size, -this.size / 2)
    ctx.closePath()
    ctx.fillStyle = this.stroke
    ctx.fill()
    ctx.restore()
  }
})

export {
  FabricArrow
}
