import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels } from '@/actions/markup'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { SpecialSymbols } from '@/containers/SpecialSymbols'
import { Feature } from '@/enums/Feature'
import { debounce } from '@/hocs/debounce'
import { labelShape } from '@/models/Label'
import { Settings, settingsShape } from '@/models/Settings'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { TextAreaStyled } from './ContentTextArea.styles'

const DebouncedTextArea = debounce({
  getValue: (e) => e.target.value
})(TextAreaStyled)

const ContentTextArea = ({
  currentPage,
  label,
  settings,
  updateLabels
}) => {
  const areSymbolsAvailable = useMemo(
    () => (
      Settings.has(settings, Feature.SPECIAL_SYMBOLS)
    ),
    [settings]
  )

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
    <>
      <DebouncedTextArea
        rows={2}
        value={label.content}
        onChange={onContentChange}
      />
      {
        areSymbolsAvailable && (
          <SpecialSymbols
            label={label}
          />
        )
      }
    </>
  )
}

ContentTextArea.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  settings: settingsShape.isRequired,
  updateLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ContentTextArea)

export {
  ConnectedComponent as ContentTextArea
}
