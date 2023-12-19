import React, { PureComponent } from 'react'
import { canvasShape } from '@/models/Canvas'

const CANVAS_HOC_NAME = 'CanvasHOC'

const withCanvas = (WrapperComponent) => {
  return class CanvasHOC extends PureComponent {
    static propTypes = {
      canvas: canvasShape
    }

    static displayName = CANVAS_HOC_NAME

    render = () => {
      if (!this.props.canvas) {
        return null
      }

      return <WrapperComponent {...this.props} />
    }
  }
}

export {
  CANVAS_HOC_NAME,
  withCanvas
}
