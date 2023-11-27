import React from 'react'
import PropTypes from 'prop-types'
import { withCanvas } from '@/components/CanvasProvider'
import { canvasShape } from '@/models/Canvas'
import { tableShape } from '@/models/Table'
import { CanvasTableDefault } from './CanvasTableDefault'
import { CanvasTableMerge } from './CanvasTableMerge'
import { CanvasTableSplit } from './CanvasTableSplit'

const CanvasTableMode = {
  DEFAULT: 'DEFAULT',
  MERGE: 'MERGE',
  SPLIT: 'SPLIT'
}

const getComponent = (mode) => {
  switch (mode) {
    case CanvasTableMode.MERGE:
      return CanvasTableMerge
    case CanvasTableMode.SPLIT:
      return CanvasTableSplit
    default:
      return CanvasTableDefault
  }
}

const CanvasTable = (props) => {
  const Component = getComponent(props.mode)
  return (
    <Component
      canvas={props.canvas}
      table={props.table}
      onUpdate={props.onUpdate}
      selectable={props.selectable}
      scale={props.scale}
      image={props.image}
    />
  )
}

CanvasTable.propTypes = {
  mode: PropTypes.oneOf(
    Object.values(CanvasTableMode)
  ),
  canvas: canvasShape.isRequired,
  table: tableShape.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
  scale: PropTypes.number.isRequired,
  image: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
}

const WithCanvas = withCanvas(CanvasTable)

export {
  CanvasTableMode,
  WithCanvas as CanvasTable
}
