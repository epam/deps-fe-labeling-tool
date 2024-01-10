import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeTool } from '@/actions/tools'
import { CanvasMouse } from '@/components/CanvasMouse'
import { withCanvas } from '@/components/CanvasProvider'
import { HotKeyEvent } from '@/constants/hotKeys'
import { Cursor } from '@/enums/Cursor'
import { Tool } from '@/enums/Tool'
import { withHotKeys } from '@/hocs/withHotKeys'
import { canvasShape } from '@/models/Canvas'
import { selectedToolSelector } from '@/selectors/tools'

class CanvasDragger extends Component {
  static propTypes = {
    canvas: canvasShape.isRequired,
    changeTool: PropTypes.func.isRequired,
    selectedTool: PropTypes.oneOf(
      Object.values(Tool)
    ).isRequired,
    registerHandlers: PropTypes.func.isRequired
  }

  prevSelectedTool = Tool.LABEL

  draggerHotKeyHandler = {
    [HotKeyEvent.GRABBING_UP]: () => this.props.changeTool(this.prevSelectedTool),
    [HotKeyEvent.GRABBING_DOWN]: () => {
      this.prevSelectedTool = this.props.selectedTool
      return this.props.changeTool(Tool.GRABBING)
    }
  }

  onDragStart = ({ e }) => {
    e.preventDefault()
    this.props.canvas.selection = false
    this.dragging = {
      lastPosX: e.clientX,
      lastPosY: e.clientY
    }
  }

  onDrag = ({ e }) => {
    e.preventDefault()
    this.props.canvas.viewportTransform[4] += e.clientX - this.dragging.lastPosX
    this.props.canvas.viewportTransform[5] += e.clientY - this.dragging.lastPosY
    this.dragging.lastPosX = e.clientX
    this.dragging.lastPosY = e.clientY
    this.props.canvas.requestRenderAll()
  }

  onDragEnd = (opts) => {
    opts.e.preventDefault()
    this.props.canvas.selection = true
    this.dragging = undefined
    this.props.canvas.setZoom(this.props.canvas.getZoom())
  }

  onMouseDown = (opts) => {
    this.onDragStart(opts)
  }

  onMouseMove = (opts) => {
    if (!this.dragging) {
      return
    }

    this.onDrag(opts)
  }

  onMouseUp = (opts) => {
    if (!this.dragging) {
      return
    }

    this.onDragEnd(opts)
  }

  componentDidMount = () => {
    this.props.registerHandlers(this.draggerHotKeyHandler)
  }

  componentDidUpdate = () => {
    if (this.props.selectedTool === Tool.GRABBING) {
      this.props.canvas.setCursor(Cursor.GRABBING)
      this.setCursor = this.props.canvas.setCursor
      this.props.canvas.setCursor = (cursor) => {
        this.cursorToRestore = cursor
      }
    } else {
      this.setCursor && (this.props.canvas.setCursor = this.setCursor)
      this.props.canvas.setCursor(this.cursorToRestore || this.props.canvas.defaultCursor)
    }
  }

  render = () => (
    this.props.selectedTool === Tool.GRABBING && (
      <CanvasMouse
        canvas={this.props.canvas}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
      />
    )
  )
}

const mapStateToProps = (state) => ({
  selectedTool: selectedToolSelector(state)
})

const mapDispatchToProps = {
  changeTool
}

const ConnectedComponent =
  withCanvas(
    withHotKeys(
      connect(mapStateToProps, mapDispatchToProps)(CanvasDragger)
    )
  )

export {
  ConnectedComponent as CanvasDragger
}
