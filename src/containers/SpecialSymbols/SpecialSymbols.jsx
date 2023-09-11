import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels } from '@/actions/markup'
import { ButtonType } from '@/components/Button'
import { Feature } from '@/enums/Feature'
import { SpecialSymbol } from '@/enums/SpecialSymbol'
import { labelShape } from '@/models/Label'
import { settingsShape } from '@/models/Settings'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import {
  SymbolButton,
  SymbolsContainer,
  TogglerButton
} from './SpecialSymbols.styles'

const RESOURCE_TOGGLER_HIDE = 'Hide'
const RESOURCE_TOGGLER_SHOW = 'Show special characters'

const SpecialSymbols = ({
  currentPage,
  label,
  settings,
  updateLabels
}) => {
  const [visible, setVisible] = useState(false)

  const onSymbolClick = useCallback((e) => {
    updateLabels(currentPage, [{
      ...label,
      content: label.content + e.currentTarget.innerText
    }])
  }, [currentPage, label, updateLabels])

  const onTogglerClick = useCallback(() => {
    setVisible((prevVisible) => !prevVisible)
  }, [])

  const Toggler = useMemo(() => (
    <TogglerButton
      onClick={onTogglerClick}
      type={ButtonType.LINK}
    >
      {visible && RESOURCE_TOGGLER_HIDE}
      {!visible && RESOURCE_TOGGLER_SHOW}
    </TogglerButton>
  ), [onTogglerClick, visible])

  const specialSymbols = useMemo(
    () => (
      settings.features.find((f) => f.code === Feature.SPECIAL_SYMBOLS)?.data ?? Object.values(SpecialSymbol)
    ),
    [settings.features]
  )

  const Symbols = useMemo(
    () => (
      <SymbolsContainer>
        {
          specialSymbols.map((s, index) =>
            <SymbolButton
              key={index}
              onClick={onSymbolClick}
            >
              <code>
                {s}
              </code>
            </SymbolButton>
          )
        }
      </SymbolsContainer>
    ),
    [onSymbolClick, specialSymbols]
  )

  return (
    <>
      {Toggler}
      {visible && Symbols}
    </>
  )
}

SpecialSymbols.propTypes = {
  currentPage: PropTypes.number.isRequired,
  label: labelShape.isRequired,
  updateLabels: PropTypes.func.isRequired,
  settings: settingsShape.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  updateLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SpecialSymbols)

export {
  ConnectedComponent as SpecialSymbols
}
