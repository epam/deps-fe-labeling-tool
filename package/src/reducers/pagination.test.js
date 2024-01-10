import { mockAction } from '@/mocks/mockAction'
import { resetDefault, openPage } from '@/actions/pagination'
import { paginationReducer } from '@/reducers/pagination'

describe('Reducer: pagination', () => {
  let defaultState

  beforeEach(() => {
    defaultState = paginationReducer(undefined, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(paginationReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({
      currentPage: 1
    })
  })

  it('should handle openPage action correctly', () => {
    const beforeState = {
      currentPage: 1
    }

    const pageToOpen = 2
    const action = openPage(pageToOpen)

    const afterState = {
      ...beforeState,
      currentPage: pageToOpen
    }

    expect(paginationReducer(beforeState, action)).toEqual(afterState)
  })
})
