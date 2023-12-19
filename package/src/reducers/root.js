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

const rootReducer = combineReducers({
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

export {
  rootReducer
}
