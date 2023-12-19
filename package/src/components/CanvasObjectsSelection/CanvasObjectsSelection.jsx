import { Component } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { canvasShape } from '@/models/Canvas'
import { getActiveDataObjects, disableRotationControls } from '@/utils/fabric'

class CanvasObjectsSelection extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    selectedObjectsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelection: PropTypes.func.isRequired,
    onSelectionClear: PropTypes.func.isRequired
  }

  on = () => {
    this.canvas.on('selection:created', this.onSelection)
    this.canvas.on('selection:updated', this.onSelection)
    this.canvas.on('selection:cleared', this.onSelectionClear)
  }

  off = () => {
    this.canvas.off('selection:created', this.onSelection)
    this.canvas.off('selection:updated', this.onSelection)
    this.canvas.off('selection:cleared', this.onSelectionClear)
  }

  onSelectionClear = () => {
    this.props.onSelectionClear()
  }

  onSelection = (opts) => {
    this.props.onSelection && this.props.onSelection(getActiveDataObjects(this.canvas))
  }

  getObjectsForSelection = () => {
    const objects = this.canvas.getObjects()
    return this.props.selectedObjectsIds.map((id) => {
      return objects.find((o) => o.data && o.data.uid === id)
    })
  }

  getActiveSelection = (selectedObjects) => {
    if (selectedObjects.length === 1) {
      return selectedObjects[0]
    }

    return new fabric.ActiveSelection(selectedObjects, {
      canvas: this.canvas
    })
  }

  renderSelection = () => {
    this.canvas.discardActiveObject()
    const objectsForSelection = this.getObjectsForSelection()
    if (!objectsForSelection.length) {
      return
    }

    const activeSelection = this.getActiveSelection(objectsForSelection)
    disableRotationControls(activeSelection)
    this.canvas.setActiveObject(activeSelection)
  }

  componentWillUnmount = () => {
    this.off()
  }

  componentDidUpdate = () => {
    this.off()
    this.renderSelection()
    this.on()
  }

  componentDidMount = () => {
    this.canvas = this.props.canvas
    this.renderSelection()
    this.on()
  }

  render = () => null
}

const WithCanvas = withCanvas(CanvasObjectsSelection)

export {
  WithCanvas as CanvasObjectsSelection
}
