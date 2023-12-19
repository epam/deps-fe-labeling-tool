import { Component } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { ZOOM_STEP, ZOOM_MIN, ZOOM_MAX } from '@/constants/canvas'
import { canvasShape } from '@/models/Canvas'

class CanvasZoom extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    zoom: PropTypes.number,
    setZoom: PropTypes.func.isRequired
  }

  static defaultProps = {
    zoom: 1
  }

  on = () => {
    this.canvas.on('mouse:wheel', this.onWheel)
  }

  off = () => {
    this.canvas.off('mouse:wheel', this.onWheel)
  }

  setZoom = (zoom) => {
    const center = this.canvas.getCenter()
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)
  }

  onZoom = (e) => {
    let targetZoom = this.canvas.getZoom() - e.deltaY * ZOOM_STEP
    targetZoom = targetZoom <= ZOOM_MIN ? ZOOM_MIN : targetZoom
    targetZoom = targetZoom >= ZOOM_MAX ? ZOOM_MAX : targetZoom
    this.canvas.zoomToPoint(new fabric.Point(e.offsetX, e.offsetY), targetZoom)
    this.props.setZoom(targetZoom)
  }

  onWheel = ({ e }) => {
    if (!e.altKey) {
      return
    }

    this.onZoom(e)
  }

  shouldComponentUpdate = (nextProps) => (
    this.canvas.getZoom() !== nextProps.zoom
  )

  componentWillUnmount = () => {
    this.setZoom(1)
    this.off()
  }

  componentDidUpdate = () => {
    this.setZoom(this.props.zoom)
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.setZoom(this.props.zoom)
    this.on()
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasZoom)

export {
  WithCanvas as CanvasZoom
}
