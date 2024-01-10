const mockReduxUndo = ({
  ActionCreators: {
    undo: jest.fn(),
    jumpToPast: jest.fn()
  }
})

export {
  mockReduxUndo
}
