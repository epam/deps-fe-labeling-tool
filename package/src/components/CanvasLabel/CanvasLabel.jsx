import { Component } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { Cursor } from '@/enums/Cursor'
import { canvasShape } from '@/models/Canvas'
import { Label, labelShape, LabelType } from '@/models/Label'
import { Rectangle } from '@/models/Rectangle'
import { COLORS } from '@/theme/theme.default'
import { getPositionInsideGroup, getAbsoluteCanvasPosition, applyScale, disableRotationControls } from '@/utils/fabric'

const SIZE_LABEL_BORDER = 1
const SIZE_LABEL_CORNER = 6
const SIZE_LABEL_CONTENT_FONT = 15
const SIZE_LABEL_NAME_FONT = 15

const SIZE_INITIAL_SCALE = 1

class CanvasLabel extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    label: labelShape.isRequired,
    onUpdate: PropTypes.func.isRequired,
    isContentVisible: PropTypes.bool.isRequired,
    selectable: PropTypes.bool.isRequired,
    image: PropTypes.PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    scale: PropTypes.PropTypes.number.isRequired
  }

  getBorderColor = () => {
    switch (this.props.label.type) {
      case LabelType.CHECKMARK:
        return COLORS.LABEL_CHECKMARK_BORDER
      case LabelType.KEY:
        return COLORS.LABEL_KEY_BORDER
      case LabelType.VALUE:
        return COLORS.LABEL_VALUE_BORDER
      case LabelType.ENUM:
        return COLORS.LABEL_ENUM_BORDER
      case LabelType.DATE:
        return COLORS.LABEL_DATE_BORDER
      case LabelType.STRING:
        return this.props.label.fieldCode !== ''
          ? COLORS.LABEL_STRING_BORDER
          : COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER
      default:
        return COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER
    }
  }

  getBackgroundColor = () => {
    switch (this.props.label.type) {
      case LabelType.CHECKMARK:
        return COLORS.LABEL_CHECKMARK_BACKGROUND
      case LabelType.KEY:
        return COLORS.LABEL_KEY_BACKGROUND
      case LabelType.VALUE:
        return COLORS.LABEL_VALUE_BACKGROUND
      case LabelType.ENUM:
        return COLORS.LABEL_ENUM_BACKGROUND
      case LabelType.DATE:
        return COLORS.LABEL_DATE_BACKGROUND
      case LabelType.STRING:
        return this.props.label.fieldCode !== ''
          ? COLORS.LABEL_STRING_BACKGROUND
          : COLORS.MARKUP_OBJECT_UNASSIGNED_BACKGROUND
      default:
        return COLORS.MARKUP_OBJECT_UNASSIGNED_BACKGROUND
    }
  }

  selectedAlone = () => (
    this.canvas.getActiveObject() === this.selection
  )

  showCaptions = (opts, force) => {
    if (this.selectedAlone() || force) {
      this.selection.set('fill', COLORS.SELECTION)
      this.props.isContentVisible && this.props.selectable && this.content.set('visible', true)
      this.props.selectable && this.name.set('visible', true)
      this.canvas.requestRenderAll()
    }
  }

  hideCaptions = (opts, force) => {
    if (!this.selectedAlone() || force) {
      this.selection.set('fill', this.getBackgroundColor())
      this.content.set('visible', false)
      this.name.set('visible', false)
      this.canvas.requestRenderAll()
    }
  }

  updateCanvasLabel = () => {
    const activeObjects = this.canvas.getActiveObjects()
    const renderedLabel = activeObjects.some((ao) => ao.data === this.props.label)

    if (!renderedLabel) {
      return
    }

    const { x, y } = getAbsoluteCanvasPosition(this.selection, this.canvas)
    const target = applyScale(this.selection)
    const unscaledObject = Rectangle.scale(
      new Rectangle(x, y, target.width, target.height),
      1 / this.props.scale
    )
    const updatedObject = {
      ...this.selection.data,
      ...Rectangle.toRelative(unscaledObject, this.props.image)
    }

    this.props.onUpdate(updatedObject)
  }

  on = () => {
    this.selection.on('scaling', (opts) => this.hideCaptions(opts, true))
    this.selection.on('moving', (opts) => this.hideCaptions(opts, true))
    this.selection.on('selected', this.showCaptions)
    this.selection.on('deselected', this.hideCaptions)
    this.selection.on('mouseover', (opts) => this.showCaptions(opts, true))
    this.selection.on('mouseout', this.hideCaptions)
    this.canvas.on('object:moved', this.updateCanvasLabel)
    this.canvas.on('object:scaled', this.updateCanvasLabel)
  }

  createContent = () => new fabric.Textbox(
    Label.getStringContent(this.props.label),
    {
      fontSize: SIZE_LABEL_CONTENT_FONT,
      fill: COLORS.PRIMARY_EMPHASIS,
      backgroundColor: COLORS.LABEL_NAME_BACKGROUND,
      hasControls: false,
      selectable: false,
      evented: false,
      readOnly: true,
      visible: false
    }
  )

  updateContentProps = (content) => {
    const { x, y, w } = this.props.label
    const { width, height } = this.props.image
    content.set({
      left: x * width * this.props.scale,
      text: Label.getStringContent(this.props.label),
      width: w * width * this.props.scale
    })
    content.set({
      top: y * height * this.props.scale - content.height
    })
    content.setCoords()
  }

  createSelection = () => new fabric.Rect({
    cornerColor: COLORS.LABEL_KEY_BORDER,
    strokeWidth: SIZE_LABEL_BORDER,
    cornerSize: SIZE_LABEL_CORNER,
    objectCaching: false,
    transparentCorners: false,
    strokeUniform: true
  })

  updateSelectionProps = (selection) => {
    const { width, height } = this.props.image
    const { w, h } = this.props.label
    const point = {
      x: this.props.label.x * width * this.props.scale,
      y: this.props.label.y * height * this.props.scale
    }
    const group = selection && selection.group
    const { x, y } = getPositionInsideGroup(point, group)
    selection.set({
      left: x,
      top: y,
      width: w * width * this.props.scale,
      height: h * height * this.props.scale,
      data: this.props.label,
      stroke: this.getBorderColor(),
      fill: this.getBackgroundColor(),
      scaleX: SIZE_INITIAL_SCALE,
      scaleY: SIZE_INITIAL_SCALE,
      selectable: this.props.selectable,
      hoverCursor: this.props.selectable ? Cursor.MOVE : Cursor.DEFAULT
    })
    selection.setCoords()
  }

  createName = () => new fabric.Textbox(Label.getName(this.props.label), {
    fontSize: SIZE_LABEL_NAME_FONT,
    fill: COLORS.PRIMARY_EMPHASIS,
    backgroundColor: COLORS.LABEL_NAME_BACKGROUND,
    hasControls: false,
    selectable: false,
    evented: false,
    readOnly: true,
    visible: false
  })

  updateNameProps = (name) => {
    const { x, y, w, h } = this.props.label
    const { width, height } = this.props.image
    name.set({
      text: Label.getName(this.props.label),
      left: x * width * this.props.scale,
      top: (y + h) * height * this.props.scale + 1,
      width: w * width * this.props.scale
    })
    name.setCoords()
  }

  shouldComponentUpdate = (nextProps) => (
    this.selection.left !== nextProps.label.x ||
    this.selection.top !== nextProps.label.y ||
    this.selection.width !== nextProps.label.w ||
    this.selection.height !== nextProps.label.h ||
    this.selection.name !== nextProps.label.name ||
    this.selection.content !== nextProps.label.content ||
    this.selection.data.uid !== nextProps.label.uid ||
    this.selection.selectable !== this.props.selectable
  )

  componentWillUnmount = () => {
    this.canvas.remove(this.content)
    this.canvas.remove(this.selection)
    this.canvas.remove(this.name)
    this.canvas.off('object:moved', this.updateCanvasLabel)
    this.canvas.off('object:scaled', this.updateCanvasLabel)
  }

  componentDidUpdate = () => {
    this.updateNameProps(this.name)
    this.updateSelectionProps(this.selection)
    this.updateContentProps(this.content)
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.content = this.createContent()
    this.selection = this.createSelection()
    disableRotationControls(this.selection)
    this.name = this.createName()
    this.updateContentProps(this.content)
    this.updateSelectionProps(this.selection)
    this.updateNameProps(this.name)
    this.canvas.add(this.content)
    this.canvas.add(this.selection)
    this.canvas.add(this.name)
    this.on()
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasLabel)

export {
  WithCanvas as CanvasLabel
}
