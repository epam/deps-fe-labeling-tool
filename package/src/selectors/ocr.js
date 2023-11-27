import get from 'lodash/get'
import { createSelector } from 'reselect'

const rootSelector = (state) => state.ocr

const primaryEngineSelector = createSelector(
  [rootSelector],
  (ocr) => get(ocr, 'primaryEngine')
)

const ocrEnginesSelector = createSelector(
  [rootSelector],
  (ocr) => get(ocr, 'ocrEngines')
)

const primaryLanguageSelector = createSelector(
  [rootSelector],
  (ocr) => get(ocr, 'primaryLanguage')
)

const ocrLanguagesSelector = createSelector(
  [rootSelector],
  (ocr) => get(ocr, 'ocrLanguages')
)

export {
  primaryEngineSelector,
  ocrEnginesSelector,
  primaryLanguageSelector,
  ocrLanguagesSelector
}
