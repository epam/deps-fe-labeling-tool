import React from 'react'
import { OcrArea } from '@/containers/ExtractArea/OcrArea'
import { OmrArea } from '@/containers/ExtractArea/OmrArea'
import { labelShape, LabelType } from '@/models/Label'

const ExtractArea = ({ label }) => {
  if (label.type === LabelType.CHECKMARK) {
    return <OmrArea label={label} />
  }

  return <OcrArea label={label} />
}

ExtractArea.propTypes = {
  label: labelShape.isRequired
}

export { ExtractArea }
