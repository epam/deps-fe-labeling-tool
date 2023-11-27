import { createSelector } from 'reselect'
import { currentPageSelector } from '@/selectors/pagination'

const documentSelector = (state) => state.document

const pagesSelector = createSelector(
  [documentSelector],
  (document) => document.pages
)

const documentNameSelector = createSelector(
  [documentSelector],
  (document) => document.name
)

const extraNameSelector = createSelector(
  [documentSelector],
  (document) => document.extraName
)

const pageImageUrlSelector = createSelector(
  [pagesSelector, currentPageSelector],
  (pages, currentPage) => pages && pages[currentPage - 1]
)

const pagesQuantitySelector = createSelector(
  [pagesSelector],
  (pages) => pages.length
)

const languageSelector = createSelector(
  [documentSelector],
  (document) => document.language
)

export {
  documentSelector,
  documentNameSelector,
  extraNameSelector,
  pageImageUrlSelector,
  pagesQuantitySelector,
  languageSelector
}
