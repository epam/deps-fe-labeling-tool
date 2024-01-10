const isSavingSelector = jest.fn(() => false)

const isRecognizingSelector = jest.fn(() => false)

const mockApiSelectors = {
  isRecognizingSelector,
  isSavingSelector
}

export {
  mockApiSelectors
}
