import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockReduxUndo } from '@/mocks/mockReduxUndo'
import { mockUuid } from '@/mocks/mockUuid'
import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { ActionCreators } from 'redux-undo'
import {
  copyMarkup,
  pasteMarkup,
  insertCopiedMarkup,
  resetDefault,
  addLabels,
  updateLabels,
  updateAllLabels,
  removeLabels,
  selectLabels,
  addTables,
  updateTables,
  updateAllTables,
  removeTables,
  selectTables,
  clearSelection,
  undo,
  redo,
  reset,
  storeMarkup,
  storeAssignedMarkup,
  storeImportMarkup,
  importMarkup,
  exportMarkup,
  updatePageMarkup,
  updateLabelsWithSettings,
  updateTablesWithSettings
} from '@/actions/markup'
import { Feature } from '@/enums/Feature'
import { Mode } from '@/enums/Mode'
import { Label, LabelType } from '@/models/Label'
import { Markup, PageMarkup } from '@/models/Markup'
import { Rectangle } from '@/models/Rectangle'
import { Table } from '@/models/Table'
import { documentNameSelector } from '@/selectors/document'
import {
  markupSelector,
  pageSelectedLabelsSelector,
  pageSelectedTablesSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import * as exportService from '@/services/export'
import { clipboardStorage } from '@/storage'

jest.mock('uuid', () => mockUuid)

const MOCK_STATE = 'MOCK_STATE'

const MOCK_DOCUMENT_NAME = 'testName'

const MOCK_FIELD_CODE_1 = 'mockFieldCode1'
const MOCK_FIELD_CODE_2 = 'mockFieldCode2'

const MOCK_LABEL_1 = new Label(1, 2, 3, 4, MOCK_FIELD_CODE_1, undefined, LabelType.VALUE, 'mock content 1')
const MOCK_LABEL_2 = new Label(4, 3, 2, 1, MOCK_FIELD_CODE_2, undefined, LabelType.VALUE, 'mock content 2')

const MOCK_RECT = new Rectangle(4, 4, 4, 4)

const MOCK_TABLE_1 = Table.fromRectangle(MOCK_RECT)

const MOCK_LABELS = [MOCK_LABEL_1, MOCK_LABEL_2]

const MOCK_TABLES = [MOCK_TABLE_1]

const MOCK_PAGE = 1

const MOCK_LABELS_ACTION_PAYLOAD = {
  page: MOCK_PAGE,
  labels: MOCK_LABELS
}

const MOCK_PAGE_MARKUP = new PageMarkup(
  MOCK_LABELS,
  MOCK_TABLES
)

const MOCK_MARKUP = new Markup(
  new Map([
    [
      MOCK_PAGE,
      MOCK_PAGE_MARKUP
    ]
  ])
)

const MOCK_TABLES_ACTION_PAYLOAD = {
  page: MOCK_PAGE,
  tables: MOCK_TABLES
}

jest.mock('redux-undo', () => mockReduxUndo)
jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/services/export', () => ({
  importMarkup: jest.fn(() => Promise.resolve(MOCK_MARKUP)),
  exportMarkup: jest.fn()
}))

jest.mock('@/storage', () => ({
  clipboardStorage: {
    write: jest.fn(),
    read: jest.fn(() => Promise.resolve(MOCK_PAGE_MARKUP))
  }
}))

describe('Actions: markup', () => {
  let dispatch
  let getState

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn(() => MOCK_STATE)
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create addLabels action with correct type and payload', () => {
    const action = addLabels(MOCK_PAGE, MOCK_LABELS)

    expect(action).toEqual({
      type: addLabels.toString(),
      payload: MOCK_LABELS_ACTION_PAYLOAD
    })
  })

  it('should create removeLabels action with correct type and payload', () => {
    const action = removeLabels(MOCK_PAGE, MOCK_LABELS)

    expect(action).toEqual({
      type: removeLabels.toString(),
      payload: MOCK_LABELS_ACTION_PAYLOAD
    })
  })

  it('should create updateLabels action with correct type and payload', () => {
    const action = updateLabels(MOCK_PAGE, MOCK_LABELS)

    expect(action).toEqual({
      type: updateLabels.toString(),
      payload: MOCK_LABELS_ACTION_PAYLOAD
    })
  })

  it('should create selectLabels action with correct type and payload', () => {
    const action = selectLabels(MOCK_PAGE, MOCK_LABELS)

    expect(action).toEqual({
      type: selectLabels.toString(),
      payload: MOCK_LABELS_ACTION_PAYLOAD
    })
  })

  it('should create clearSelection action with correct type and payload', () => {
    const action = clearSelection()

    expect(action).toEqual({
      type: clearSelection.toString()
    })
  })

  it('should create undo action with correct type and payload', () => {
    expect(undo).toEqual(ActionCreators.undo)
  })

  it('should create redo action with correct type and payload', () => {
    expect(redo).toEqual(ActionCreators.redo)
  })

  it('should create reset action with correct type and default payload', () => {
    reset()
    expect(ActionCreators.jumpToPast).toHaveBeenCalledWith(1)
  })

  it('should create storeMarkup action with correct type and payload', () => {
    const action = storeMarkup(MOCK_MARKUP)

    expect(action).toEqual({
      type: storeMarkup.toString(),
      payload: MOCK_MARKUP
    })
  })

  it('should create storeAssignedMarkup action with correct type and payload', () => {
    const action = storeAssignedMarkup(MOCK_MARKUP)

    expect(action).toEqual({
      type: storeAssignedMarkup.toString(),
      payload: MOCK_MARKUP
    })
  })

  it('should call to exportService.importMarkup when dispatching importMarkup action', async () => {
    await importMarkup()(dispatch, getState)
    expect(exportService.importMarkup).toHaveBeenCalledTimes(1)
  })

  it('should dispatch storeImportMarkup with imported markup when dispatching importMarkup', async () => {
    await importMarkup()(dispatch, getState)

    const expectedMarkup = new Markup(
      new Map([
        [
          MOCK_PAGE,
          MOCK_PAGE_MARKUP
        ]
      ])
    )

    expect(
      dispatch
    ).toHaveBeenCalledWith(
      storeImportMarkup(expectedMarkup)
    )
  })

  it('should call exportService.exportMarkup with result from markupSelector and documentNameSelector', () => {
    exportMarkup()(dispatch, getState)
    expect(getState).toHaveBeenCalledTimes(1)
    expect(documentNameSelector).nthCalledWith(1, MOCK_STATE)
    expect(markupSelector).nthCalledWith(1, MOCK_STATE)
    expect(exportService.exportMarkup).nthCalledWith(
      1,
      markupSelector(MOCK_STATE),
      `${documentNameSelector(MOCK_DOCUMENT_NAME)}.json`
    )
  })

  it('should create addTables action with correct type and payload', () => {
    const action = addTables(MOCK_PAGE, MOCK_TABLES)

    expect(action).toEqual({
      type: addTables.toString(),
      payload: MOCK_TABLES_ACTION_PAYLOAD
    })
  })

  it('should create updateTables action with correct type and payload', () => {
    const action = updateTables(MOCK_PAGE, MOCK_TABLES)

    expect(action).toEqual({
      type: updateTables.toString(),
      payload: MOCK_TABLES_ACTION_PAYLOAD
    })
  })

  it('should create removeTables action with correct type and payload', () => {
    const action = removeTables(MOCK_PAGE, MOCK_TABLES)

    expect(action).toEqual({
      type: removeTables.toString(),
      payload: MOCK_TABLES_ACTION_PAYLOAD
    })
  })

  it('should create selectTables action with correct type and payload', () => {
    const action = selectTables(MOCK_PAGE, MOCK_TABLES)

    expect(action).toEqual({
      type: selectTables.toString(),
      payload: MOCK_TABLES_ACTION_PAYLOAD
    })
  })

  describe('copyMarkup', () => {
    it('should call getState once', async () => {
      await copyMarkup()(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('should call clipboardStorage write once with correct pageMarkup', async () => {
      await copyMarkup()(dispatch, getState)
      const expectedMarkupToCopy = new PageMarkup(
        pageSelectedLabelsSelector(),
        pageSelectedTablesSelector()
      )

      expect(clipboardStorage.write).nthCalledWith(1, expectedMarkupToCopy)
    })
  })

  describe('pasteMarkup', () => {
    it('should call getState once', async () => {
      await pasteMarkup()(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('should call clipboardStorage read once', async () => {
      await pasteMarkup()(dispatch, getState)
      expect(clipboardStorage.read).toHaveBeenCalledTimes(1)
    })

    it('should call dispatch once with correct argument', async () => {
      await pasteMarkup()(dispatch, getState)
      expect(dispatch).nthCalledWith(1, insertCopiedMarkup(MOCK_PAGE, MOCK_PAGE_MARKUP))
    })

    it('should not call dispatch in case of invalid page markup', async () => {
      clipboardStorage.read.mockImplementationOnce(() => Promise.resolve(null))

      await pasteMarkup()(dispatch, getState)
      expect(dispatch).not.toHaveBeenCalledWith()
    })
  })

  describe('updatePageMarkup', () => {
    it('should call getState and markupSelector once', () => {
      updatePageMarkup(MOCK_PAGE_MARKUP)(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
      expect(currentPageSelector).toHaveBeenCalledWith(MOCK_STATE)
    })

    it('should update pageMarkup with correct values', () => {
      updatePageMarkup(MOCK_PAGE_MARKUP)(dispatch, getState)
      mockReactRedux.batch(() => {
        expect(dispatch).nthCalledWith(1, updateLabels(MOCK_LABELS_ACTION_PAYLOAD))
        expect(dispatch).nthCalledWith(1, updateTables(MOCK_TABLES_ACTION_PAYLOAD))
      })
    })
  })

  describe('updateLabelsWithSettings', () => {
    const MOCK_STATE = {
      settings: {
        mode: Mode.MARKUP,
        features: [Feature.MULTI_ASSIGN_LABELS],
        panels: [],
        tools: []
      }
    }

    beforeEach(() => {
      getState = jest.fn(() => MOCK_STATE)
    })

    it('should call getState once', () => {
      updateLabelsWithSettings(MOCK_LABEL_1)(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('should update labels with correct values with multiAssign feature', () => {
      updateLabelsWithSettings(MOCK_LABEL_1)(dispatch, getState)
      expect(dispatch).nthCalledWith(1, updateAllLabels({
        label: MOCK_LABEL_1,
        multiAssign: true
      }))
    })

    it('should update labels with correct values without multiAssign feature', () => {
      MOCK_STATE.settings.features = []
      updateLabelsWithSettings(MOCK_LABEL_1)(dispatch, getState)

      expect(dispatch).nthCalledWith(1, updateAllLabels({
        label: MOCK_LABEL_1,
        multiAssign: false
      }))
    })
  })

  describe('updateTablesWithSettings', () => {
    const MOCK_STATE = {
      settings: {
        mode: Mode.MARKUP,
        features: [Feature.MULTI_ASSIGN_TABLES],
        panels: [],
        tools: []
      }
    }

    beforeEach(() => {
      getState = jest.fn(() => MOCK_STATE)
    })

    it('should call getState once', () => {
      updateTablesWithSettings(MOCK_TABLE_1)(dispatch, getState)
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('should update tables with correct values with multiAssign feature', () => {
      updateTablesWithSettings(MOCK_TABLE_1)(dispatch, getState)
      expect(dispatch).nthCalledWith(1, updateAllTables({
        table: MOCK_TABLE_1,
        multiAssign: true
      }))
    })

    it('should update tables with correct values without multiAssign feature', () => {
      MOCK_STATE.settings.features = []
      updateTablesWithSettings(MOCK_TABLE_1)(dispatch, getState)

      expect(dispatch).nthCalledWith(1, updateAllTables({
        table: MOCK_TABLE_1,
        multiAssign: false
      }))
    })
  })
})
