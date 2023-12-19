import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CanvasMouse } from '@/components/CanvasMouse'
import { withCanvas } from '@/components/CanvasProvider'
import { canvasShape } from '@/models/Canvas'
import { Rectangle } from '@/models/Rectangle'
import { COLORS } from '@/theme/theme.default'

const MIN_REQUIRED_THRESHOLD = 0.001

class CanvasMouseSelection extends PureComponent {
  getSelectionRectangle = (opts) => {
    const cursorB = this.props.canvas.getPointer(opts.e)
    if (!this.cursorA || !cursorB) {
      return
    }

    const w = Math.abs(this.cursorA.x - cursorB.x)
    const h = Math.abs(this.cursorA.y - cursorB.y)
    const x = Math.min(this.cursorA.x, cursorB.x)
    const y = Math.min(this.cursorA.y, cursorB.y)

    if (w === 0 || h === 0) {
      const width = Math.max(w, MIN_REQUIRED_THRESHOLD)
      const height = Math.max(h, MIN_REQUIRED_THRESHOLD)
      return new Rectangle(x, y, width, height)
    }

    return new Rectangle(x, y, w, h)
  }

  onMouseDown = (opts) => {
    if (this.props.canvas.findTarget(opts.e) || opts.e.altKey) {
      return
    }

    this.cursorA = this.props.canvas.getPointer(opts.e)
  }

  onMouseMove = (opts) => {
    const selection = this.getSelectionRectangle(opts)
    selection && this.props.onSelectionUpdate && this.props.onSelectionUpdate(
      selection,
      opts
    )
  }

  onMouseUp = (opts) => {
    const selection = this.getSelectionRectangle(opts)
    selection && this.props.onSelectionEnd(
      selection,
      opts
    )

    this.cursorA = undefined
  }

  componentDidMount = () => {
    this.props.canvas.selectionColor = COLORS.SELECTION
    this.props.canvas.selectionBorderColor = COLORS.SELECTION_BORDER_COLOR
  }

  componentWillUnmount = () => {
    this.props.canvas.selectionColor = COLORS.TRANSPARENT
    this.props.canvas.selectionBorderColor = COLORS.TRANSPARENT
  }

  render = () => (
    <CanvasMouse
      canvas={this.props.canvas}
      onMouseDown={this.onMouseDown}
      onMouseMove={this.props.onSelectionUpdate && this.onMouseMove}
      onMouseUp={this.onMouseUp}
    />
  )
}

CanvasMouseSelection.propTypes = {
  canvas: canvasShape.isRequired,
  onSelectionEnd: PropTypes.func.isRequired,
  onSelectionUpdate: PropTypes.func
}

const WithCanvas = withCanvas(CanvasMouseSelection)

export {
  WithCanvas as CanvasMouseSelection
}
