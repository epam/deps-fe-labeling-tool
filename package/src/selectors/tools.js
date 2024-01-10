import { createSelector } from 'reselect'

const rootSelector = (state) => state.tools

const selectedToolSelector = createSelector(
  [rootSelector],
  (toolsState) => toolsState.selectedTool
)

export {
  selectedToolSelector
}
