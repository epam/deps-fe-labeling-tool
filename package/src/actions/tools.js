import { createAction } from 'redux-actions'
import { clearSelection } from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'
import { Settings } from '@/models/Settings'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'

const FEATURE_NAME = 'TOOLS'

const selectTool = createAction(
  `${FEATURE_NAME}/SELECT_TOOL`
)

const resetDefault = createAction(
  `${FEATURE_NAME}/RESET_DEFAULT`
)

const changeTool = (toolToSelect) => (dispatch, getState) => {
  const state = getState()
  const settings = settingsSelector(state)
  if (!Settings.has(settings, toolToSelect)) {
    return
  }

  const currentPage = currentPageSelector(state)
  const selectedTool = selectedToolSelector(state)
  if (selectedTool !== toolToSelect) {
    dispatch(setActiveSidebar(SidebarContent.MARKUP))
    dispatch(clearSelection(currentPage))
    dispatch(selectTool(toolToSelect))
  }
}

export {
  resetDefault,
  selectTool,
  changeTool
}
