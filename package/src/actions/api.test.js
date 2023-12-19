import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockOcrSelectors } from '@/mocks/selectors/ocr'
import {
  detectTables,
  omrArea,
  ocrTable,
  resetDefault,
  requestAttempt,
  requestSuccess,
  requestFailure,
  createRequestAction,
  save,
  ocrText,
  saveMarkup
} from '@/actions/api'
import { Rectangle } from '@/models/Rectangle'
import { pageImageUrlSelector } from '@/selectors/document'
import { getApi } from '@/services/api'

const mockContent = 'mockContent'
const mockContentTable = 'mockContent'
const mockMarkupTables = ['mockMarkupTable']
const mockBoolContent = {
  confidence: 0.11,
  content: true
}

const mockOmrArea = jest.fn(() => Promise.resolve(mockBoolContent))
const mockOcrText = jest.fn(() => Promise.resolve(mockContent))
const mockOcrTable = jest.fn(() => Promise.resolve(mockContentTable))
const mockSave = jest.fn((data) => Promise.resolve(data))
const mockSaveMarkup = jest.fn((data) => Promise.resolve(data))
const mockDetectTables = jest.fn((url, coords) => Promise.resolve(mockMarkupTables))

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    detectTables: mockDetectTables,
    omrArea: mockOmrArea,
    ocrTable: mockOcrTable,
    save: mockSave,
    saveMarkup: mockSaveMarkup,
    ocrText: mockOcrText,
    addFieldForm: jest.fn()
  }))
}))

jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/selectors/ocr', () => mockOcrSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

const mockActionName = 'mockActionName'
const mockError = new Error('Mock Error Message')

describe('Actions: api', () => {
  it('should create requestAttempt action with correct type and payload', () => {
    const action = requestAttempt(mockActionName)
    expect(action).toEqual({
      type: requestAttempt.toString(),
      payload: mockActionName
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create requestSuccess action with correct type and payload', () => {
    const action = requestSuccess(mockActionName)
    expect(action).toEqual({
      type: requestSuccess.toString(),
      payload: mockActionName
    })
  })

  it('should create requestFailure action with correct type and payload', () => {
    const action = requestFailure(mockActionName, mockError.message)
    expect(action).toEqual({
      type: requestFailure.toString(),
      payload: {
        requestId: mockActionName,
        error: mockError.message
      }
    })
  })

  describe('createRequestAction', () => {
    let dispatch
    let getState
    let requestId
    let actionCreator
    let mockArg1
    let mockArg2
    let requestActionCreator
    let returnedMockActionCreator

    beforeEach(() => {
      returnedMockActionCreator = jest.fn(() => Promise.resolve({}))
      dispatch = jest.fn()
      getState = jest.fn()
      actionCreator = jest.fn(() => returnedMockActionCreator)
      requestId = 'mockRequestId'
      mockArg1 = 'mockArg1'
      mockArg2 = 'mockArg2'
      requestActionCreator = createRequestAction(requestId, actionCreator)
    })

    it('should return requestActionCreator that have custom toString method that returns requestId', () => {
      expect(requestActionCreator.toString()).toEqual(requestId)
    })

    it('should call dispatch first time with correct argument', async () => {
      await requestActionCreator(mockArg1, mockArg2)(dispatch, getState)
      expect(dispatch).nthCalledWith(1, requestAttempt(requestId))
    })

    it('should call dispatch second time with correct argument in case success', async () => {
      await requestActionCreator(mockArg1, mockArg2)(dispatch, getState)
      expect(dispatch).nthCalledWith(2, requestSuccess(requestId))
    })

    it('should call actionCreator with correct arguments and pass dispatch and getState to returned actionCreator', async () => {
      await requestActionCreator(mockArg1, mockArg2)(dispatch, getState)
      expect(actionCreator).nthCalledWith(1, mockArg1, mockArg2)
      expect(returnedMockActionCreator).nthCalledWith(1, dispatch, getState)
    })

    it('should rethrow error and call dispatch second time with correct argument in case error', async () => {
      returnedMockActionCreator.mockImplementationOnce(() => Promise.reject(mockError))
      await expect(requestActionCreator(mockArg1, mockArg2)(dispatch, getState)).rejects.toThrowError(mockError)
      expect(dispatch).nthCalledWith(2, requestFailure(requestId, mockError.message))
    })
  })

  describe('Action creator: save', () => {
    const mockMarkup = mockMarkupSelectors.markupSelector()
    const mockRotationAngles = mockCanvasSelectors.rotationAnglesSelector()

    let dispatch, getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    it('should call getApi once', async () => {
      await save(mockMarkup, mockRotationAngles)(dispatch, getState)
      expect(getApi).toHaveBeenCalledTimes(1)
    })

    it('should call api save once with correct value', async () => {
      await save(mockMarkup, mockRotationAngles)(dispatch, getState)
      expect(mockSave).nthCalledWith(1, mockMarkup, mockRotationAngles, mockOcrSelectors.primaryLanguageSelector())
    })

    it('should call api saveMarkup once with correct value', async () => {
      await saveMarkup(mockMarkup, mockRotationAngles)(dispatch, getState)
      expect(mockSaveMarkup).nthCalledWith(1, mockMarkup, mockRotationAngles, mockOcrSelectors.primaryLanguageSelector(), mockModelSelectors.fieldsSelector())
    })
  })

  describe('Action creator: ocrText', () => {
    const mockEngine = 'mockEngine'
    const mockCoordinates = new Rectangle(10, 10, 10, 10)

    let dispatch, getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    it('should call getApi once', async () => {
      await ocrText(mockEngine, mockCoordinates)(dispatch, getState)
      expect(getApi).toHaveBeenCalledTimes(1)
    })

    it('should call api ocrText once with correct value', async () => {
      await ocrText(mockEngine, mockCoordinates)(dispatch, getState)
      const pageImageUrl = pageImageUrlSelector()
      expect(mockOcrText).nthCalledWith(1, mockEngine, pageImageUrl, mockCoordinates, mockOcrSelectors.primaryLanguageSelector())
    })

    it('should return content from Api.ocrText', async () => {
      const content = await ocrText(mockEngine, mockCoordinates)(dispatch, getState)
      expect(content).toEqual(mockContent)
    })
  })

  describe('Action creator: omrArea', () => {
    const mockCoordinates = new Rectangle(10, 10, 10, 10)

    let dispatch, getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    it('should call getApi once', async () => {
      await omrArea(mockCoordinates)(dispatch, getState)
      expect(getApi).toHaveBeenCalledTimes(1)
    })

    it('should call api omrArea once with correct value', async () => {
      await omrArea(mockCoordinates)(dispatch, getState)
      const pageImageUrl = pageImageUrlSelector()
      expect(mockOmrArea).nthCalledWith(1, pageImageUrl, mockCoordinates)
    })

    it('should return content from Api.omrArea', async () => {
      const content = await omrArea(mockCoordinates)(dispatch, getState)
      expect(content).toEqual(mockBoolContent)
    })
  })

  describe('Action creator: ocrTable', () => {
    const mockEngine = 'mockEngine'
    const mockTable = {}

    let dispatch, getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    it('should call getApi once', async () => {
      await ocrTable(mockEngine, mockTable)(dispatch, getState)
      expect(getApi).toHaveBeenCalledTimes(1)
    })

    it('should call api ocrTable once with correct value', async () => {
      await ocrTable(mockEngine, mockTable)(dispatch, getState)
      const pageImageUrl = pageImageUrlSelector()
      expect(mockOcrTable).nthCalledWith(1, mockEngine, pageImageUrl, mockTable, mockOcrSelectors.primaryLanguageSelector())
    })

    it('should return content from Api.ocrTable', async () => {
      const content = await ocrTable(mockEngine, mockTable)(dispatch, getState)
      expect(content).toEqual(mockContent)
    })
  })

  describe('Action creator: detectTables', () => {
    const coordinates = new Rectangle(0.5, 0.5, 0.5, 0.5)

    let dispatch, getState

    beforeEach(() => {
      dispatch = jest.fn()
      getState = jest.fn()
    })

    it('should call getApi once', async () => {
      await detectTables(coordinates)(dispatch, getState)
      expect(getApi).toHaveBeenCalledTimes(1)
    })

    it('should call api detectTables once with correct values', async () => {
      await detectTables(coordinates)(dispatch, getState)
      const pageImageUrl = pageImageUrlSelector()
      expect(mockDetectTables).nthCalledWith(1, pageImageUrl, coordinates)
    })

    it('should return markup tables from api.detectTables', async () => {
      const tables = await detectTables(coordinates)(dispatch, getState)
      expect(tables).toEqual(mockMarkupTables)
    })
  })
})
