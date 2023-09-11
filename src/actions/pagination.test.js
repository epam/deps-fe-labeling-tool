import { resetDefault, openPage } from './pagination'

describe('Actions: pagination', () => {
  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })

  it('should create openPage action with correct type and payload', () => {
    const page = 2
    const action = openPage(page)

    expect(action).toEqual({
      type: openPage.toString(),
      payload: page
    })
  })
})
