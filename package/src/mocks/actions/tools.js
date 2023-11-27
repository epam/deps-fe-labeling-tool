const changeTool = jest.fn((tool) => ({
  type: 'MOCK_CHANGE_TOOL_ACTION',
  payload: tool
}))

const mockToolsActions = {
  changeTool
}

export {
  mockToolsActions
}
