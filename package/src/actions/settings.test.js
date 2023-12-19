import { Mode } from '@/enums/Mode'
import { Settings } from '@/models/Settings'
import { resetDefault, storeSettings } from './settings'

describe('Actions: settings', () => {
  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create storeSettings action with correct type and payload', () => {
    const settings = new Settings(Mode.DEFAULT)
    const action = storeSettings(settings)

    expect(action).toEqual({
      type: storeSettings.toString(),
      payload: settings
    })
  })
})
