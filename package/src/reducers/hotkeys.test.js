import { mockAction } from '@/mocks/mockAction'
import { resetDefault, registerHotKeyEvents } from '@/actions/hotkeys'
import { hotKeysReducer } from '@/reducers/hotkeys'

describe('Reducer: hotkeys', () => {
  let defaultState

  beforeEach(() => {
    defaultState = hotKeysReducer(defaultState, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(hotKeysReducer([], action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual([])
  })

  it('should handle registerHotKeyEvents action correctly', () => {
    const action = registerHotKeyEvents(['DELETE'])

    expect(hotKeysReducer(defaultState, action)).toEqual([
      'DELETE'
    ])
  })
})
