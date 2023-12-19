import { mockAction } from '@/mocks/mockAction'
import { resetDefault, setImage } from '@/actions/image'
import { imageReducer } from '@/reducers/image'

describe('Reducer: image', () => {
  let defaultState

  beforeEach(() => {
    defaultState = imageReducer(undefined, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(imageReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({})
  })

  it('should handle set image action correctly', () => {
    const beforeState = {}

    const image = { width: 1000, height: 1000 }
    const action = setImage(image)

    const afterState = {
      ...beforeState,
      width: image.width,
      height: image.height
    }

    expect(imageReducer(beforeState, action)).toEqual(afterState)
  })
})
