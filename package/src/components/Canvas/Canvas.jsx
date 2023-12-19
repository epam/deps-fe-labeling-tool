import React, { PureComponent } from 'react'
import { fabric } from 'fabric'
import PropTypes from 'prop-types'
import { CANVAS_HOC_NAME } from '@/components/CanvasProvider'
import { DocumentListener } from '@/components/DocumentListener'
import { COLORS } from '@/theme/theme.default'

class Canvas extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  }

  static defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  canvasRef = React.createRef()

  onContextMenu = (e) => {
    if (e.target === this.canvas.upperCanvasEl) {
      e.preventDefault()
    }
  }

  componentDidUpdate = () => {
    if (this.canvas.getWidth() !== this.props.width) {
      this.canvas.setWidth(this.props.width)
    }

    if (this.canvas.getHeight() !== this.props.height) {
      this.canvas.setHeight(this.props.height)
    }

    this.canvas.requestRenderAll()
  }

  componentDidMount = () => {
    this.canvas = new fabric.Canvas(this.canvasRef.current, {
      fireRightClick: true
    })

    fabric.Group.prototype.lockScalingX = true
    fabric.Group.prototype.lockScalingY = true
    this.canvas.altActionKey = undefined
    this.canvas.uniformScaling = false
    this.canvas.centeredKey = undefined
    this.canvas.selectionColor = COLORS.TRANSPARENT
    this.canvas.selectionBorderColor = COLORS.TRANSPARENT
    this.forceUpdate()
  }

  renderCanvasObjects = () => {
    return React.Children.map(this.props.children, (child) => {
      if (
        !this.canvas ||
        !this.canvasRef.current ||
        !React.isValidElement(child) ||
        !child.type ||
        child.type.displayName !== CANVAS_HOC_NAME
      ) {
        return null
      }

      return React.cloneElement(child, {
        ...child.props,
        canvas: this.canvas
      })
    })
  }

  render = () => (
    <>
      <canvas
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
      >
        {this.renderCanvasObjects()}
      </canvas>
      <DocumentListener
        onContextMenu={this.onContextMenu}
      />
    </>
  )
}

export {
  Canvas
}
