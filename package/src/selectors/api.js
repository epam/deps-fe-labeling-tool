import get from 'lodash/get'
import { createSelector } from 'reselect'
import { save, ocrText } from '@/actions/api'

const rootSelector = (state) => state.api

const pendingSelector = createSelector(
  [rootSelector],
  (api) => get(api, 'pending')
)

const isFetchingSelector = (action) => createSelector(
  [pendingSelector],
  (pending) => pending.includes(action.toString())
)

const isSavingSelector = isFetchingSelector(save)

const isOcrInProgressSelector = isFetchingSelector(ocrText)

export {
  isOcrInProgressSelector,
  isSavingSelector
}
