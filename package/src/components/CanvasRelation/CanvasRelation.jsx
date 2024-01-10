import { Component } from 'react'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { canvasShape } from '@/models/Canvas'
import { Point } from '@/models/Point'
import { Rectangle } from '@/models/Rectangle'
import { relationShape } from '@/models/Relation'
import { COLORS } from '@/theme/theme.default'
import { atSameSpot, hasSameSize } from '@/utils/fabric'
import { FabricArrow } from './FabricArrow'

const SIZE_ARROW = 8

class CanvasRelation extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    relation: relationShape.isRequired,
    scale: PropTypes.number.isRequired,
    image: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  }

  getClosestEdgeMidPoints = (a, b) => {
    const midPoints1 = Rectangle.getEdgeMidPoints(a)
    const midPoints2 = Rectangle.getEdgeMidPoints(b)
    const pointsPermutations = midPoints1.map((p1) => midPoints2.map((p2) => [p1, p2])).flat()
    const sortByDistance = ([a, b], [c, d]) => Point.getDistance(c, d) - Point.getDistance(a, b)
    return pointsPermutations.sort(sortByDistance).pop()
  }

  getLinePoints = () => {
    const { from, to } = this.props.relation
    const { width, height } = this.props.image

    const absoluteFrom = {
      x: from.x * width * this.props.scale,
      y: from.y * height * this.props.scale,
      w: from.w * width * this.props.scale,
      h: from.h * height * this.props.scale
    }
    const absoluteTo = {
      x: to.x * width * this.props.scale,
      y: to.y * height * this.props.scale,
      w: to.w * width * this.props.scale,
      h: to.h * height * this.props.scale
    }

    const [p1, p2] = this.getClosestEdgeMidPoints(
      new Rectangle(absoluteFrom.x, absoluteFrom.y, absoluteFrom.w, absoluteFrom.h),
      new Rectangle(absoluteTo.x, absoluteTo.y, absoluteTo.w, absoluteTo.h)

    )
    return {
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y
    }
  }

  createArrow = () => {
    const { x1, y1, x2, y2 } = this.getLinePoints()
    const arrow = new FabricArrow([x1, y1, x2, y2], {
      size: SIZE_ARROW,
      fill: COLORS.RELATION_ARROW,
      stroke: COLORS.RELATION_ARROW
    })
    arrow.lockMovementX = true
    arrow.lockMovementY = true
    arrow.lockScalingX = true
    arrow.lockScalingY = true
    arrow.lockRotation = true
    arrow.selectable = false
    return arrow
  }

  updateArrowProps = () => {
    this.arrow.set({
      ...this.getLinePoints(),
      data: this.props.relation
    })
    this.arrow.setCoords()
  }

  shouldComponentUpdate = (newProps) => (
    !atSameSpot(this.props.relation.from, newProps.relation.from) ||
    !hasSameSize(this.props.relation.from, newProps.relation.from) ||
    !atSameSpot(this.props.relation.to, newProps.relation.to) ||
    !hasSameSize(this.props.relation.to, newProps.relation.to) ||
    this.props.relation.uid !== newProps.relation.uid ||
    this.props.image !== newProps.image
  )

  componentWillUnmount = () => {
    this.canvas.remove(this.arrow)
  }

  componentDidUpdate = () => {
    this.updateArrowProps()
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.arrow = this.createArrow()
    this.updateArrowProps()
    this.canvas.add(this.arrow)
    this.canvas.sendToBack(this.arrow)
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasRelation)

export {
  WithCanvas as CanvasRelation
}
