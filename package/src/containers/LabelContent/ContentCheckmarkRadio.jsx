import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels } from '@/actions/markup'
import { RadioGroup } from '@/components/Radio'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { labelShape } from '@/models/Label'
import { Option } from '@/models/Option'
import { currentPageSelector } from '@/selectors/pagination'
import { RadioGroupWrapper } from './ContentCheckmarkRadio.styles'

const RESOURCE_TRUE_OPTION = 'True'
const RESOURCE_FALSE_OPTION = 'False'

const CheckmarkOption = {
  [RESOURCE_FALSE_OPTION]: false,
  [RESOURCE_TRUE_OPTION]: true
}

const options = Object.entries(CheckmarkOption).map(([text, value]) => new Option(value, text))

const ContentCheckmarkRadio = ({
  currentPage,
  label,
  updateLabels
}) => {
  const onContentChange = useCallback(
    (value) => {
      updateLabels(currentPage, [{
        ...label,
        content: value,
        confidence: CONFIDENCE_ON_MANUAL_CHANGE
      }])
    },
    [
      currentPage,
      label,
      updateLabels
    ])

  return (
    <RadioGroupWrapper>
      <RadioGroup
        options={options}
        onChange={onContentChange}
        value={label.content}
      />
    </RadioGroupWrapper>
  )
}

ContentCheckmarkRadio.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  updateLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state)
})

const mapDispatchToProps = {
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContentCheckmarkRadio)

export {
  ConnectedComponent as ContentCheckmarkRadio
}
