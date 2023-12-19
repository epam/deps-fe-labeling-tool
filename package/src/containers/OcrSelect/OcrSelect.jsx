import React, { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setPrimaryEngine } from '@/actions/ocr'
import { HotKeyEvent } from '@/constants/hotKeys'
import { withHotKeys } from '@/hocs/withHotKeys'
import { ocrEngineShape } from '@/models/OcrEngine'
import { Option } from '@/models/Option'
import {
  primaryEngineSelector,
  ocrEnginesSelector
} from '@/selectors/ocr'
import { Select } from './OcrSelect.styles'

const OcrSelect = ({
  setPrimaryEngine,
  primaryEngine,
  registerHandlers,
  ocr,
  ocrEngines
}) => {
  const onSelectItemChange = useCallback((value) => {
    const engine = ocrEngines.find((engine) => engine.code === value)
    setPrimaryEngine(engine.code)
  }, [ocrEngines, setPrimaryEngine])

  const hotKeyHandlers = useMemo(() => ({
    [HotKeyEvent.RECOGNIZE]: ocr
  }), [ocr])

  useEffect(() => {
    registerHandlers(hotKeyHandlers)
  }, [hotKeyHandlers, registerHandlers])

  const generateOptions = () => (
    ocrEngines.map((engine) => new Option(engine.code, engine.name))
  )

  return (
    <Select
      onChange={onSelectItemChange}
      defaultValue={primaryEngine}
      options={generateOptions()}
      getPopupContainer={() => document.body}
    />
  )
}

OcrSelect.propTypes = {
  ocrEngines: PropTypes.arrayOf(ocrEngineShape).isRequired,
  primaryEngine: PropTypes.string.isRequired,
  setPrimaryEngine: PropTypes.func.isRequired,
  registerHandlers: PropTypes.func.isRequired,
  ocr: PropTypes.func.isRequired
}

const OcrDropdownButtonWithHotKeys = withHotKeys(OcrSelect)

const mapStateToProps = (state) => ({
  primaryEngine: primaryEngineSelector(state),
  ocrEngines: ocrEnginesSelector(state)
})

const OcrDropdownButtonContainer = connect(mapStateToProps, { setPrimaryEngine })(OcrDropdownButtonWithHotKeys)

export {
  OcrDropdownButtonContainer as OcrSelect
}
