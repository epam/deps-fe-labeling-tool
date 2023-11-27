import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import { clearSelection } from '@/actions/markup'
import { resetDefault, selectTool, changeTool } from '@/actions/tools'
import { Tool } from '@/enums/Tool'
import { Settings } from '@/models/Settings'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'

const MOCK_STATE = 'MOCK_STATE'

jest.mock('@/selectors/tools', () => mockToolsSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

describe('Actions: tools', () => {
  let dispatch
  let getState

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn(() => MOCK_STATE)
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should dispatch selectTool and clearSelection actions when dispatching changeTool action', () => {
    const MOCK_CURRENT_PAGE = 2
    currentPageSelector.mockImplementationOnce(() => MOCK_CURRENT_PAGE)

    changeTool(Tool.TABLE)(dispatch, getState)

    expect(getState).toHaveBeenCalledTimes(1)
    expect(settingsSelector).toHaveBeenCalledWith(MOCK_STATE)
    expect(currentPageSelector).toHaveBeenCalledWith(MOCK_STATE)
    expect(selectedToolSelector).toHaveBeenCalledWith(MOCK_STATE)
    expect(dispatch).toHaveBeenCalledWith(clearSelection(MOCK_CURRENT_PAGE))
    expect(dispatch).toHaveBeenCalledWith(selectTool(Tool.TABLE))
  })

  it('should not dispatch selectTool action when dispatching changeTool with already selected tool', () => {
    changeTool(Tool.LABEL)(dispatch, getState)

    expect(dispatch).not.toHaveBeenCalledTimes(1)
  })

  it('should ignore change tool call in case provided tool is disabled', () => {
    settingsSelector.mockImplementationOnce(() => new Settings(undefined, [], [], []))

    changeTool(Tool.TABLE)(dispatch, getState)
    expect(settingsSelector).toHaveBeenCalledWith(MOCK_STATE)
    expect(dispatch).not.toHaveBeenCalled()
  })
})
