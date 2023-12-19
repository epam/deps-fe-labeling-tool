import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ocrText } from '@/actions/api'
import { updateLabels } from '@/actions/markup'
import { ButtonType } from '@/components/Button'
import { ObjectTitle } from '@/components/ObjectTitle'
import { OcrSelect } from '@/containers/OcrSelect'
import {
  Label,
  labelShape
} from '@/models/Label'
import { ocrEngineShape } from '@/models/OcrEngine'
import {
  primaryEngineSelector,
  ocrEnginesSelector
} from '@/selectors/ocr'
import { currentPageSelector } from '@/selectors/pagination'
import { getApi } from '@/services/api'
import {
  Divider,
  Button
} from './ExtractArea.styles'

const RESOURCE_OCR = 'OCR'
const RESOURCE_EXTRACT_DATA = 'Extract data'

const OcrArea = ({
  currentPage,
  label,
  ocrEngines,
  ocrText,
  primaryEngine,
  updateLabels
}) => {
  const ocr = async () => {
    const savedLabel = label
    const coords = Label.toRectangle(savedLabel)
    const { content, confidence } = await ocrText(primaryEngine, coords)
    updateLabels(
      currentPage,
      [{
        ...savedLabel,
        content,
        confidence
      }]
    )
  }

  const isOCRAvailable = !!ocrEngines?.length && !!getApi().ocrText

  if (!isOCRAvailable) {
    return null
  }

  return (
    <>
      <Divider />
      <ObjectTitle
        title={RESOURCE_OCR}
      />
      <OcrSelect
        ocr={ocr}
      />
      <Button
        onClick={ocr}
        type={ButtonType.PRIMARY}
      >
        {RESOURCE_EXTRACT_DATA}
      </Button>
    </>
  )
}

OcrArea.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  ocrEngines: PropTypes.arrayOf(ocrEngineShape),
  primaryEngine: PropTypes.string.isRequired,
  ocrText: PropTypes.func.isRequired,
  updateLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  ocrEngines: ocrEnginesSelector(state),
  primaryEngine: primaryEngineSelector(state)
})

const mapDispatchToProps = {
  ocrText,
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OcrArea)

export {
  ConnectedComponent as OcrArea
}
