import React from 'react'
import { Button } from '@/components/Button'
import { CompilationFeatureControl, isFeatureEnabled } from '@/components/CompilationFeatureControl'
import { AlignmentIcon } from '@/components/Icons/AlignmentIcon'
import { CropIcon } from '@/components/Icons/CropIcon'
import { OcrIcon } from '@/components/Icons/OcrIcon'
import { TableLineItemIcon } from '@/components/Icons/TableLineItemIcon'
import { Tooltip } from '@/components/Tooltip'
import { CompilationFeature } from '@/enums/CompilationFeature'

const RESOURCE_TOOLTIP_OCR = 'OCR text'
const RESOURCE_TOOLTIP_CROP = 'Autocrop'
const RESOURCE_TOOLTIP_ALIGNMENT = 'Table lineitems sorting'
const RESOURCE_TOOLTIP_TABLE_LINE = 'Group boxes coordinates and size adjustment'

const ObjectActions = () => (
  <>
    <CompilationFeatureControl featureName={CompilationFeature.SHOW_NOT_IMPLEMENTED}>
      <Tooltip title={RESOURCE_TOOLTIP_OCR}>
        <Button.Icon
          icon={<OcrIcon />}
        />
      </Tooltip>
      <Tooltip title={RESOURCE_TOOLTIP_CROP}>
        <Button.Icon icon={<CropIcon />} />
      </Tooltip>
      <Tooltip title={RESOURCE_TOOLTIP_ALIGNMENT}>
        <Button.Icon icon={<AlignmentIcon />} />
      </Tooltip>
      <Tooltip title={RESOURCE_TOOLTIP_TABLE_LINE}>
        <Button.Icon icon={<TableLineItemIcon />} />
      </Tooltip>
    </CompilationFeatureControl>
  </>
)

const isObjectActionsEmpty = () => {
  return !isFeatureEnabled(CompilationFeature.SHOW_NOT_IMPLEMENTED)
}

export {
  ObjectActions,
  isObjectActionsEmpty
}
