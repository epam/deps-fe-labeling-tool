import { createSelector } from 'reselect'

const rootSelector = (state) => state.pagination

const currentPageSelector = createSelector(
  rootSelector,
  (pagination) => pagination.currentPage
)

export {
  currentPageSelector
}
