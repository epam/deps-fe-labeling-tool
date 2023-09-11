import { resetDefault as resetApi } from './api'
import { resetDefault as resetCanvas } from './canvas'
import { resetDefault as resetDocument } from './document'
import { resetDefault as resetImage } from './image'
import { resetDefault as resetMarkup } from './markup'
import { resetDefault as resetModel } from './model'
import { resetDefault as resetOcr } from './ocr'
import { resetDefault as resetPagination } from './pagination'
import { resetDefault as resetSettings } from './settings'
import { resetDefault as resetTools } from './tools'

const resetDefault = () => (dispatch) => {
  dispatch(resetApi())
  dispatch(resetOcr())
  dispatch(resetCanvas())
  dispatch(resetImage())
  dispatch(resetDocument())
  dispatch(resetMarkup())
  dispatch(resetPagination())
  dispatch(resetTools())
  dispatch(resetModel())
  dispatch(resetSettings())
}

export {
  resetDefault
}
