import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { omrArea } from '@/actions/api'
import { updateLabels } from '@/actions/markup'
import { ButtonType } from '@/components/Button'
import { ObjectTitle } from '@/components/ObjectTitle'
import {
  Label,
  labelShape
} from '@/models/Label'
import { currentPageSelector } from '@/selectors/pagination'
import { getApi } from '@/services/api'
import {
  Divider,
  Button
} from './ExtractArea.styles'

const RESOURCE_OMR = 'OMR'
const RESOURCE_EXTRACT_DATA = 'Extract data'

const OmrArea = ({
  currentPage,
  label,
  omrArea,
  updateLabels
}) => {
  const omr = async () => {
    const savedLabel = label
    const coords = Label.toRectangle(savedLabel)
    const { content, confidence } = await omrArea(coords)
    updateLabels(
      currentPage,
      [{
        ...savedLabel,
        content,
        confidence
      }]
    )
  }

  const isOMRAvailable = !!getApi().omrArea

  if (!isOMRAvailable) {
    return null
  }

  return (
    <>
      <Divider />
      <ObjectTitle
        title={RESOURCE_OMR}
      />
      <Button
        onClick={omr}
        type={ButtonType.PRIMARY}
      >
        {RESOURCE_EXTRACT_DATA}
      </Button>
    </>
  )
}

OmrArea.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  omrArea: PropTypes.func.isRequired,
  updateLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state)
})

const mapDispatchToProps = {
  omrArea,
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(OmrArea)

export {
  ConnectedComponent as OmrArea
}
