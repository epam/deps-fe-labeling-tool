import { Tool } from '@/enums/Tool'
import { selectedToolSelector } from '@/selectors/tools'

describe('Selectors: tools', () => {
  const defaultState = {
    tools: {
      selectedTool: Tool.TABLE
    }
  }

  it('should get selected tool from state when using selectedToolSelector', () => {
    expect(selectedToolSelector(defaultState)).toBe(Tool.TABLE)
  })
})
