import { Component } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { Cursor } from '@/enums/Cursor'
import { areaShape } from '@/models/Area'
import { canvasShape } from '@/models/Canvas'
import { Rectangle } from '@/models/Rectangle'
import { COLORS } from '@/theme/theme.default'
import { getPositionInsideGroup, getAbsoluteCanvasPosition, applyScale, disableRotationControls } from '@/utils/fabric'

const SIZE_AREA_BORDER = 1
const SIZE_AREA_CORNER = 6
const SIZE_INITIAL_SCALE = 1

class CanvasArea extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    area: areaShape.isRequired,
    onUpdate: PropTypes.func.isRequired,
    selectable: PropTypes.bool.isRequired,
    image: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    scale: PropTypes.number.isRequired
  }

  updateArea = () => {
    const activeObjects = this.canvas.getActiveObjects()
    const renderedArea = activeObjects.some((ao) => ao.data.uid === this.props.area.uid)
    if (!renderedArea) {
      return
    }

    const { x, y } = getAbsoluteCanvasPosition(this.area, this.canvas)
    const target = applyScale(this.area)

    const unscaledObject = Rectangle.scale(
      new Rectangle(x, y, target.width, target.height),
      1 / this.props.scale
    )

    const updatedObject = Rectangle.toRelative(unscaledObject, this.props.image)
    this.props.onUpdate(updatedObject)
  }

  on = () => {
    this.canvas.on('object:moved', this.updateArea)
    this.canvas.on('object:scaled', this.updateArea)
  }

  off = () => {
    this.canvas.off('object:moved', this.updateArea)
    this.canvas.off('object:scaled', this.updateArea)
  }

  createArea = () => new fabric.Rect({
    fill: COLORS.AREA_BACKGROUND,
    cornerColor: COLORS.AREA_BORER,
    strokeWidth: SIZE_AREA_BORDER,
    cornerSize: SIZE_AREA_CORNER,
    objectCaching: false,
    transparentCorners: false,
    strokeUniform: true
  })

  updateAreaProps = (area) => {
    const { w, h } = this.props.area
    const { width, height } = this.props.image
    const point = {
      x: this.props.area.x * width * this.props.scale,
      y: this.props.area.y * height * this.props.scale
    }
    const group = area && area.group
    const { x, y } = getPositionInsideGroup(point, group)
    area.set({
      left: x,
      top: y,
      width: w * width * this.props.scale,
      height: h * height * this.props.scale,
      data: this.props.area,
      stroke: COLORS.AREA_BORER,
      scaleX: SIZE_INITIAL_SCALE,
      scaleY: SIZE_INITIAL_SCALE,
      selectable: this.props.selectable,
      hoverCursor: this.props.selectable ? Cursor.MOVE : Cursor.DEFAULT
    })

    area.setCoords()
  }

  shouldComponentUpdate = (nextProps) => (
    this.area.left !== nextProps.area.x ||
    this.area.top !== nextProps.area.y ||
    this.area.width !== nextProps.area.w ||
    this.area.height !== nextProps.area.h ||
    this.area.selectable !== nextProps.selectable
  )

  componentWillUnmount = () => {
    this.canvas.remove(this.area)
    this.off()
  }

  componentDidUpdate = () => {
    this.updateAreaProps(this.area)
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.area = this.createArea()
    this.updateAreaProps(this.area)
    this.canvas.add(this.area)
    disableRotationControls(this.area)
    this.on()
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasArea)

export {
  WithCanvas as CanvasArea
}
