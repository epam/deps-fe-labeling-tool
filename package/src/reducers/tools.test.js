import { mockAction } from '@/mocks/mockAction'
import {
  resetDefault,
  selectTool
} from '@/actions/tools'
import { Tool } from '@/enums/Tool'
import { toolsReducer } from '@/reducers/tools'

describe('Reducer: tools', () => {
  let defaultState

  beforeEach(() => {
    defaultState = toolsReducer(defaultState, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(toolsReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({
      selectedTool: Tool.POINTER
    })
  })

  it('should handle selectTool action correctly', () => {
    const action = selectTool(Tool.TABLE)

    expect(toolsReducer(defaultState, action)).toEqual({
      ...defaultState,
      selectedTool: Tool.TABLE
    })
  })
})
