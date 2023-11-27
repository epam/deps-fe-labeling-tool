import { resetDefault, registerHotKeyEvents } from './hotkeys'

describe('Actions: hotkeys', () => {
  it('should create registerHotKeyEvents action with correct type and payload', () => {
    const action = registerHotKeyEvents(['DELETE'])

    expect(action).toEqual({
      type: registerHotKeyEvents.toString(),
      payload: ['DELETE']
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })
})
