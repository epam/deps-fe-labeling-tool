import { createAction } from 'redux-actions'
import { rotationAnglesSelector } from '@/selectors/canvas'
import { pageImageUrlSelector } from '@/selectors/document'
import { markupSelector } from '@/selectors/markup'
import { fieldsSelector } from '@/selectors/model'
import { primaryLanguageSelector } from '@/selectors/ocr'
import { getApi } from '@/services/api'

const FEATURE_NAME = 'API'

const requestAttempt = createAction(
  `${FEATURE_NAME}/REQUEST_ATTEMPT`
)

const requestSuccess = createAction(
  `${FEATURE_NAME}/REQUEST_SUCCESS`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

const requestFailure = createAction(
  `${FEATURE_NAME}/REQUEST_FAILURE`,
  (requestId, error) => ({
    requestId,
    error
  })
)

export const createRequestAction = (requestId, actionCreator) => {
  const requestActionCreator = (...args) => async (dispatch, getState) => {
    try {
      dispatch(requestAttempt(requestId))
      const result = await actionCreator(...args)(dispatch, getState)
      dispatch(requestSuccess(requestId))
      return result
    } catch (error) {
      dispatch(requestFailure(requestId, error.message))
      throw error
    }
  }
  requestActionCreator.toString = () => requestId
  return requestActionCreator
}

const save = createRequestAction(
  'save',
  () => (dispatch, getState) => {
    const state = getState()
    const markup = markupSelector(state)
    const rotationAngles = rotationAnglesSelector(state)
    const language = primaryLanguageSelector(state)
    return getApi().save(markup, rotationAngles, language)
  }
)

const saveMarkup = createRequestAction(
  'saveMarkup',
  () => (dispatch, getState) => {
    const state = getState()
    const markup = markupSelector(state)
    const rotationAngles = rotationAnglesSelector(state)
    const language = primaryLanguageSelector(state)
    const fields = fieldsSelector(state)
    return getApi().saveMarkup(markup, rotationAngles, language, fields)
  }
)

const ocrText = createRequestAction(
  'ocrText',
  (engine, coordinates) => (dispatch, getState) => {
    const state = getState()
    const pageImageUrl = pageImageUrlSelector(state)
    const language = primaryLanguageSelector(state)
    return getApi().ocrText(
      engine,
      pageImageUrl,
      coordinates,
      language
    )
  }
)

const omrArea = createRequestAction(
  'omrArea',
  (coordinates) => (dispatch, getState) => {
    const state = getState()
    const pageImageUrl = pageImageUrlSelector(state)

    return getApi().omrArea(
      pageImageUrl,
      coordinates
    )
  }
)

const detectTables = createRequestAction(
  'detectTables',
  (selectedAreaCoords) => (dispatch, getState) => {
    const state = getState()
    const pageImageUrl = pageImageUrlSelector(state)
    return getApi().detectTables(
      pageImageUrl,
      selectedAreaCoords
    )
  }
)

const ocrTable = createRequestAction(
  'ocrTable',
  (engine, table) => (dispatch, getState) => {
    const state = getState()
    const pageImageUrl = pageImageUrlSelector(state)
    const language = primaryLanguageSelector(state)
    return getApi().ocrTable(
      engine,
      pageImageUrl,
      table,
      language
    )
  }
)

export {
  detectTables,
  ocrTable,
  ocrText,
  omrArea,
  resetDefault,
  requestAttempt,
  requestSuccess,
  requestFailure,
  save,
  saveMarkup
}
