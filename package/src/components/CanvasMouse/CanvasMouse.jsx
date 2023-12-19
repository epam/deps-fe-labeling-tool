import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { canvasShape } from '@/models/Canvas'

const CanvasMouse = (props) => {
  useEffect(() => {
    props.onMouseDown && props.canvas.on('mouse:down', props.onMouseDown)
    props.onMouseMove && props.canvas.on('mouse:move', props.onMouseMove)
    props.onMouseUp && props.canvas.on('mouse:up', props.onMouseUp)
    return () => {
      props.onMouseDown && props.canvas.off('mouse:down', props.onMouseDown)
      props.onMouseMove && props.canvas.off('mouse:move', props.onMouseMove)
      props.onMouseUp && props.canvas.off('mouse:up', props.onMouseUp)
    }
  },
  [
    props.canvas,
    props.onMouseDown,
    props.onMouseMove,
    props.onMouseUp
  ]
  )

  return null
}

CanvasMouse.propTypes = {
  canvas: canvasShape.isRequired,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseUp: PropTypes.func
}

export {
  CanvasMouse
}
