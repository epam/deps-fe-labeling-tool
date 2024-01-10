import { Component } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { WIDTH_SCALING_TARGET } from '@/constants/canvas'
import { canvasShape } from '@/models/Canvas'
import { getApi } from '@/services/api'
import { loadImage, getImagePosition } from '@/utils/image'

const MIN_CANVAS_OFFSET = 50
const RESET_COLOR = ''

class CanvasBackground extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    url: PropTypes.string,
    color: PropTypes.string,
    scale: PropTypes.number,
    rotationAngle: PropTypes.number,
    setImage: PropTypes.func,
    setScale: PropTypes.func,
    image: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    })
  }

  loading = new fabric.Text('Loading...', {
    selectable: false,
    fontSize: 20,
    fontFamily: 'sans-serif'
  })

  storeImageProperties = (image) => {
    this.props.setImage({
      width: image.width,
      height: image.height
    })

    const scale = WIDTH_SCALING_TARGET / image.width

    this.props.setScale(scale)
  }

  addMarginToBackground = () => {
    const vpt = [...this.canvas.viewportTransform]
    vpt[4] = MIN_CANVAS_OFFSET
    vpt[5] = MIN_CANVAS_OFFSET
    this.canvas.setViewportTransform(vpt)
  }

  setBackgroundColor = (color) => {
    this.canvas.setBackgroundColor(color)
  }

  rotateBackgroundImage = (currentAngle = 0, prevAngle = 0) => {
    const { originX, originY } = getImagePosition(currentAngle)
    this.canvas.backgroundImage.set({
      angle: currentAngle,
      originX,
      originY
    })

    const toRadians = (degree) => degree * (Math.PI / 180)
    const isAnglesDiff90Degree = Math.abs(Math.sin(toRadians(prevAngle) - toRadians(currentAngle))) === 1

    if (isAnglesDiff90Degree) {
      this.props.setImage({
        width: this.props.image.height,
        height: this.props.image.width
      })
    }
  }

  setBackgroundImage = async (url, scale) => {
    if (!url) {
      this.canvas.backgroundImage = undefined
      this.canvas.requestRenderAll()
      return
    }

    if (this.canvas.backgroundImage) {
      this.canvas.fxRemove(this.canvas.backgroundImage)
    }

    this.canvas.add(this.loading)
    const api = getApi()
    const { image } = await loadImage(url, api.getImage)
    const angle = this.props.rotationAngle ?? 0
    const { originX, originY } = getImagePosition(angle)

    this.canvas.remove(this.loading)
    this.canvas.setBackgroundImage(
      new fabric.Image(image),
      this.canvas.requestRenderAll.bind(this.canvas),
      {
        scaleX: scale || 1,
        scaleY: scale || 1,
        angle,
        originX,
        originY
      }
    )
  }

  shouldComponentUpdate = (nextProps) => (
    this.canvas.backgroundColor !== nextProps.color ||
    this.props.url !== nextProps.url ||
    this.props.rotationAngle !== nextProps.rotationAngle
  )

  componentWillUnmount = () => {
    this.setBackgroundColor(RESET_COLOR)
    this.setBackgroundImage(undefined)
  }

  componentDidUpdate = async (prevProps) => {
    if (this.canvas.backgroundColor !== this.props.color) {
      this.setBackgroundColor(this.props.color ? this.props.color : RESET_COLOR)
    }

    if (
      prevProps.url !== this.props.url ||
      prevProps.scale !== this.props.scale
    ) {
      const { image, imageURL } = this.props.url
        ? await loadImage(this.props.url, getApi().getImage)
        : { image: null, imageURL: null }

      if (this.props.url &&
        (this.props.image.width !== image.width ||
          this.props.image.height !== image.height) &&
          this.props.url === imageURL
      ) {
        this.storeImageProperties(image)
      }

      this.setBackgroundImage(this.props.url, this.props.scale)
    }

    if (this.props.rotationAngle !== prevProps.rotationAngle) {
      this.rotateBackgroundImage(this.props.rotationAngle, prevProps.rotationAngle)
    }
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    if (this.props.color) {
      this.setBackgroundColor(this.props.color)
    }

    if (this.props.url) {
      this.setBackgroundImage(this.props.url, this.props.scale)
      this.addMarginToBackground()
    }
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasBackground)

export {
  WithCanvas as CanvasBackground
}
