import { handleActions } from 'redux-actions'
import { resetDefault, storeOcr, setPrimaryEngine, setPrimaryLanguage } from '@/actions/ocr'

const defaultState = {
  primaryEngine: null,
  ocrEngines: null,
  ocrLanguages: null,
  primaryLanguage: null
}

const storeOcrHandler = (state, action) => ({
  ...state,
  primaryEngine: action.payload.primaryEngine || action.payload.engines[0].code,
  ocrEngines: action.payload.engines,
  ocrLanguages: action.payload.languages
})

const setPrimaryEngineHandler = (state, action) => ({
  ...state,
  primaryEngine: action.payload
})

const setPrimaryLanguageHandler = (state, action) => ({
  ...state,
  primaryLanguage: action.payload
})

const resetDefaultHandler = () => (defaultState)

const ocrReducer = handleActions(
  new Map([
    [
      resetDefault,
      resetDefaultHandler
    ],
    [
      storeOcr,
      storeOcrHandler
    ],
    [
      setPrimaryEngine,
      setPrimaryEngineHandler
    ],
    [
      setPrimaryLanguage,
      setPrimaryLanguageHandler
    ]
  ]),
  defaultState
)

export {
  ocrReducer
}
