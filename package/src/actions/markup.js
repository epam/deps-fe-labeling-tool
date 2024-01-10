import { batch } from 'react-redux'
import { createAction } from 'redux-actions'
import { ActionCreators } from 'redux-undo'
import { Feature } from '@/enums/Feature'
import { Mode } from '@/enums/Mode'
import { PageMarkup } from '@/models/Markup'
import { Settings } from '@/models/Settings'
import { documentNameSelector } from '@/selectors/document'
import {
  markupSelector,
  pageSelectedLabelsSelector,
  pageSelectedTablesSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import * as exportService from '@/services/export'
import { clipboardStorage } from '@/storage'

const FEATURE_NAME = 'MARKUP'

// TODO: #1431
const addLabels = createAction(
  `${FEATURE_NAME}/ADD_LABELS`,
  (page, labels) => ({
    page,
    labels
  })
)

const storeMarkup = createAction(`${FEATURE_NAME}/STORE`)

const storeAssignedMarkup = createAction(`${FEATURE_NAME}/UPDATE`)

const storeImportMarkup = createAction(`${FEATURE_NAME}/STORE_IMPORT`)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

const removeLabels = createAction(
  `${FEATURE_NAME}/REMOVE_LABELS`,
  (page, labels) => ({
    page,
    labels
  })
)

const updateLabels = createAction(
  `${FEATURE_NAME}/UPDATE_LABELS`,
  (page, labels) => ({
    page,
    labels
  })
)

const selectLabels = createAction(
  `${FEATURE_NAME}/SELECT_LABELS`,
  (page, labels) => ({
    page,
    labels
  })
)

const clearSelection = createAction(
  `${FEATURE_NAME}/CLEAR_SELECTION`
)

// TODO: #1431
const addTables = createAction(
  `${FEATURE_NAME}/ADD_TABLES`,
  (page, tables) => ({
    page,
    tables
  })
)

const removeTables = createAction(
  `${FEATURE_NAME}/REMOVE_TABLES`,
  (page, tables) => ({
    page,
    tables
  })
)

const selectTables = createAction(
  `${FEATURE_NAME}/SELECT_TABLES`,
  (page, tables) => ({
    page,
    tables
  })
)

const updateTables = createAction(
  `${FEATURE_NAME}/UPDATE_TABLES`,
  (page, tables) => ({
    page,
    tables
  })
)

const insertCopiedMarkup = createAction(
  `${FEATURE_NAME}/INSERT_COPIED_MARKUP`,
  (page, pageMarkup) => ({
    page,
    pageMarkup
  })
)

const updateInitialMarkup = createAction(
  `${FEATURE_NAME}/UPDATE_INITIAL_MARKUP`
)

const updateAllLabels = createAction(
  `${FEATURE_NAME}/UPDATE_ALL_LABELS`
)

const updateAllTables = createAction(
  `${FEATURE_NAME}/UPDATE_ALL_TABLES`
)

const undo = ActionCreators.undo

const redo = ActionCreators.redo

const reset = (stateIndex = 1) => ActionCreators.jumpToPast(stateIndex)

const copyMarkup = () => async (dispatch, getState) => {
  const state = getState()
  const markupToCopy = new PageMarkup(
    pageSelectedLabelsSelector(state),
    pageSelectedTablesSelector(state)
  )

  await clipboardStorage.write(markupToCopy)
}

const pasteMarkup = () => async (dispatch, getState) => {
  const state = getState()
  const currentPage = currentPageSelector(state)
  const markupToPaste = await clipboardStorage.read()

  if (!PageMarkup.isValid(markupToPaste)) {
    return
  }

  dispatch(insertCopiedMarkup(currentPage, markupToPaste))
}

const importMarkup = () => async (dispatch) => {
  const markup = await exportService.importMarkup()

  dispatch(storeImportMarkup(markup))
}

const exportMarkup = () => (dispatch, getState) => {
  const state = getState()
  const documentName = documentNameSelector(state)
  const documentNameForExport = `${documentName}.json`
  const markup = markupSelector(state)
  exportService.exportMarkup(markup, documentNameForExport)
}

const updatePageMarkup = ({ labels, tables }) => (dispatch, getState) => {
  const state = getState()
  const currentPage = currentPageSelector(state)
  batch(() => {
    labels && dispatch(updateLabels(currentPage, labels))
    tables && dispatch(updateTables(currentPage, tables))
  })
}

const updateLabelsWithSettings = (label) => (dispatch, getState) => {
  const { settings } = getState()

  const multiAssign = (
    settings.mode === Mode.MARKUP &&
    Settings.has(settings, Feature.MULTI_ASSIGN_LABELS)
  )

  dispatch(updateAllLabels({
    label,
    multiAssign
  }))
}

const updateTablesWithSettings = (table) => (dispatch, getState) => {
  const { settings } = getState()

  const multiAssign = (
    settings.mode === Mode.MARKUP &&
    Settings.has(settings, Feature.MULTI_ASSIGN_TABLES)
  )

  dispatch(updateAllTables({
    table,
    multiAssign
  }))
}

export {
  resetDefault,
  addLabels,
  storeMarkup,
  storeAssignedMarkup,
  storeImportMarkup,
  removeLabels,
  updateLabels,
  selectLabels,
  addTables,
  removeTables,
  updateTables,
  selectTables,
  clearSelection,
  redo,
  undo,
  copyMarkup,
  pasteMarkup,
  insertCopiedMarkup,
  reset,
  importMarkup,
  exportMarkup,
  updateAllLabels,
  updateAllTables,
  updateInitialMarkup,
  updatePageMarkup,
  updateLabelsWithSettings,
  updateTablesWithSettings
}
