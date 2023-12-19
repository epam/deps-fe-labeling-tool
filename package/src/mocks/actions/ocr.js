const setPrimaryEngine = jest.fn((engineCode) => ({
  type: 'MOCK_SET_PRIMARY_ENGINE',
  payload: engineCode
}))

const storeOcr = jest.fn((ocr) => ({
  type: 'MOCK_STORE_OCR_ACTION',
  payload: ocr
}))

const setPrimaryLanguage = jest.fn((languageCode) => ({
  type: 'MOCK_SET_PRIMARY_LANGUAGE',
  payload: languageCode
}))

const mockOcrActions = {
  setPrimaryEngine,
  storeOcr,
  setPrimaryLanguage
}

export {
  mockOcrActions
}
