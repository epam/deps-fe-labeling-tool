import React, { useMemo } from 'react'
import {
  LabelType,
  labelShape
} from '@/models/Label'
import { ContentCheckmarkRadio } from './ContentCheckmarkRadio'
import { ContentDateField } from './ContentDateField'
import { ContentEnum } from './ContentEnum'
import { ContentTextArea } from './ContentTextArea'

const MAP_LABEL_TYPE_TO_CONTENT_COMPONENT = {
  [LabelType.STRING]: ContentTextArea,
  [LabelType.CHECKMARK]: ContentCheckmarkRadio,
  [LabelType.ENUM]: ContentEnum,
  [LabelType.DATE]: ContentDateField
}

const LabelContent = ({
  label
}) => {
  const Content = useMemo(
    () => MAP_LABEL_TYPE_TO_CONTENT_COMPONENT[label.type] ?? ContentTextArea,
    [label.type]
  )

  return (
    <Content label={label} />
  )
}

LabelContent.propTypes = {
  label: labelShape.isRequired
}

export { LabelContent }
