import { createSelector } from 'reselect'
import { LabelType } from '@/models/Label'
import { Relation, getRelatedLabels } from '@/models/Relation'
import { createDeepEqualSelector } from '@/utils/selectors'
import { currentPageSelector } from './pagination'

const rootSelector = (state) => state.markup.present

const markupSelector = createDeepEqualSelector(
  [rootSelector],
  (markupRootState) => {
    const markup = Object.entries(markupRootState).reduce((markup, [page, pageMarkup]) => {
      const { labels, tables, areas } = pageMarkup

      if (labels && labels.length) {
        markup[page] = {
          ...(markup[page] || {}),
          labels
        }
      }

      if (tables && tables.length) {
        markup[page] = {
          ...(markup[page] || {}),
          tables
        }
      }

      if (areas && areas.length) {
        markup[page] = {
          ...(markup[page] || {}),
          areas
        }
      }

      return markup
    }, {})

    if (!Object.keys(markup).length) {
      return null
    }
    return markup
  }
)

const modifiedObjectsSelector = createSelector(
  [rootSelector],
  (markupRootState) => {
    const modifiedObjects = Object.entries(markupRootState).reduce((modifiedObjects, [page, pageMarkup]) => {
      if (pageMarkup.modifiedObjects && pageMarkup.modifiedObjects.length) {
        modifiedObjects[page] = [
          ...pageMarkup.modifiedObjects
        ]
      }

      return modifiedObjects
    }, {})

    if (!Object.keys(modifiedObjects).length) {
      return null
    }

    return modifiedObjects
  }
)

const pageMarkupSelector = createSelector(
  [markupSelector, currentPageSelector],
  (markupState, page) => (markupState && markupState[page]) || {}
)

const pageMarkupStateSelector = createSelector(
  [rootSelector, currentPageSelector],
  (markupState, page) => markupState[page]
)

// TODO: #1431
const pageLabelsSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.labels) || []
)

const pageSelectedLabelsIdsSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.selectedLabelsIds) || []
)

const pageSelectedLabelsSelector = createSelector(
  [pageLabelsSelector, pageSelectedLabelsIdsSelector],
  (labels, selectedIds) => selectedIds.map((uid) => labels.find((obj) => obj.uid === uid))
)

// TODO: #1431
const pageRelationsSelector = createSelector(
  [pageLabelsSelector],
  (labels) => labels.reduce((relations, label) => {
    if (label.type === LabelType.VALUE) {
      return relations
    }

    const relatedLabels = getRelatedLabels(labels, label)
    return [
      ...relations,
      ...relatedLabels.map((rl) => new Relation(label, rl))
    ]
  }, [])
)

// TODO: #1431
const pageTablesSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.tables) || []
)

const pageSelectedTablesIdsSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.selectedTablesIds) || []
)

const pageSelectedTablesSelector = createSelector(
  [pageTablesSelector, pageSelectedTablesIdsSelector],
  (tables, selectedTablesIds) => selectedTablesIds.map((uid) => tables.find((obj) => obj.uid === uid))
)

// TODO: #1431
const pageAreasSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.areas) || []
)

const pageSelectedAreasIdsSelector = createSelector(
  [pageMarkupStateSelector],
  (pageMarkupState) => (pageMarkupState && pageMarkupState.selectedAreasIds) || []
)

const pageSelectedAreasSelector = createSelector(
  [pageAreasSelector, pageSelectedAreasIdsSelector],
  (areas, selectedIds) => selectedIds.map((uid) => areas.find((obj) => obj.uid === uid))
)

const pageSelectedMarkupObjectsSelector = createSelector(
  [pageSelectedLabelsSelector, pageSelectedTablesSelector],
  (labels, tables) => [...labels, ...tables]
)

export {
  markupSelector,
  modifiedObjectsSelector,
  pageLabelsSelector,
  pageSelectedLabelsSelector,
  pageRelationsSelector,
  pageTablesSelector,
  pageSelectedTablesSelector,
  pageAreasSelector,
  pageSelectedAreasIdsSelector,
  pageSelectedAreasSelector,
  pageMarkupSelector,
  pageMarkupStateSelector,
  pageSelectedMarkupObjectsSelector
}
