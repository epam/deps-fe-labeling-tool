const mockStore = {
  MOCK_STORE: 'MOCK_STORE',
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: jest.fn(() => ({
    MOCK_STATE: 'MOCK_STATE'
  }))
}

const mockRedux = {
  createStore: jest.fn(() => mockStore),
  applyMiddleware: jest.fn(() => mockStore),
  combineReducers: jest.fn(() => ({
    MOCK_COMBINED_REDUCER: 'MOCK_COMBINED_REDUCER'
  }))
}

export {
  mockRedux
}
