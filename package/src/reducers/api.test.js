import { mockAction } from '@/mocks/mockAction'
import { resetDefault, requestAttempt, requestSuccess, requestFailure } from '@/actions/api'
import { apiReducer } from '@/reducers/api'

describe('Reducer: api', () => {
  let defaultState = {
    pending: [],
    errors: []
  }

  beforeEach(() => {
    defaultState = apiReducer(defaultState, mockAction)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual(defaultState)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(apiReducer({}, action)).toEqual(defaultState)
  })

  it('should handle requestAttempt action correctly', () => {
    const mockActionName1 = 'mockActionName1'
    const mockActionName2 = 'mockActionName2'
    const state = {
      ...defaultState,
      pending: [mockActionName1]
    }
    const action = requestAttempt(mockActionName2)

    expect(apiReducer(state, action)).toEqual({
      ...defaultState,
      pending: [mockActionName1, mockActionName2]
    })
  })

  it('should handle requestSuccess action correctly', () => {
    const mockActionName1 = 'mockActionName1'
    const mockActionName2 = 'mockActionName2'
    const state = {
      ...defaultState,
      pending: [mockActionName1, mockActionName2]
    }
    const action = requestSuccess(mockActionName2)

    expect(apiReducer(state, action)).toEqual({
      ...defaultState,
      pending: [mockActionName1]
    })
  })

  it('should handle requestFailure action correctly', () => {
    const mockActionName1 = 'mockActionName1'
    const mockActionName2 = 'mockActionName2'
    const mockErrorMessage = 'Mock Error message'

    const state = {
      ...defaultState,
      pending: [mockActionName1, mockActionName2]
    }

    const action = requestFailure(mockActionName2, mockErrorMessage)

    expect(apiReducer(state, action)).toEqual({
      ...defaultState,
      pending: [mockActionName1],
      errors: [{
        requestId: mockActionName2,
        error: mockErrorMessage
      }]
    })
  })
})
