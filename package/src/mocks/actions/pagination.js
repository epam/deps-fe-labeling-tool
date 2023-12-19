const openPage = jest.fn((page) => ({
  type: 'MOCK_OPEN_PAGE_ACTION',
  payload: page
}))

const mockPaginationActions = {
  openPage
}

export {
  mockPaginationActions
}
