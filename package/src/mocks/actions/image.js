const setImage = jest.fn((image) => ({
  type: 'MOCK_SET_IMAGE_ACTION',
  payload: image
}))

const mockImageActions = {
  setImage
}

export {
  mockImageActions
}
