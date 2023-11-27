import { combineReducers } from 'redux'
import undoable from 'redux-undo'
import { apiReducer as api } from '@/reducers/api'
import { canvasReducer as canvas } from '@/reducers/canvas'
import { documentReducer as document } from '@/reducers/document'
import { hotKeysReducer as hotKeys } from '@/reducers/hotkeys'
import { imageReducer as image } from '@/reducers/image'
import { markupReducer as markup } from '@/reducers/markup'
import { modelReducer as model } from '@/reducers/model'
import { ocrReducer as ocr } from '@/reducers/ocr'
import { paginationReducer as pagination } from '@/reducers/pagination'
import { settingsReducer as settings } from '@/reducers/settings'
import { toolsReducer as tools } from '@/reducers/tools'
import { uiReducer as ui } from '@/reducers/ui'

jest.mock('redux', () => ({
  createStore: jest.fn(),
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn()
}))

jest.mock('redux-undo', () => ({
  __esModule: true,
  default: jest.fn(),
  ActionCreators: {
    undo: jest.fn(),
    jumpToPast: jest.fn()
  }
})
)

describe('Reducer: root', () => {
  it('should call combine reducers with correct reducers map', async () => {
    await import('@/reducers/root')

    expect(combineReducers).toHaveBeenCalledWith({
      api,
      canvas,
      document,
      image,
      markup: undoable(markup),
      model,
      ocr,
      pagination,
      settings,
      tools,
      hotKeys,
      ui
    })
  })

  it('should return result of the combineReducers call as rootReducer', async () => {
    const { rootReducer } = await import('@/reducers/root')

    expect(rootReducer).toEqual(combineReducers())
  })
})
