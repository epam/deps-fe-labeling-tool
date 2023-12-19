import { createAction } from 'redux-actions'

const FEATURE_NAME = 'PAGINATION'

const openPage = createAction(`${FEATURE_NAME}/OPEN_PAGE`)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

export {
  resetDefault,
  openPage
}
