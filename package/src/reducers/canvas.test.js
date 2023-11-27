import { mockAction } from '@/mocks/mockAction'
import { resetDefault, setZoom, setScale } from '@/actions/canvas'
import { canvasReducer } from '@/reducers/canvas'

describe('Reducer: canvas', () => {
  let defaultState

  beforeEach(() => {
    defaultState = canvasReducer(undefined, mockAction)
  })

  it('should handle resetDefault action correctly', () => {
    const action = resetDefault()
    expect(canvasReducer({}, action)).toEqual(defaultState)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual({
      zoom: 1,
      rotationAngles: {}
    })
  })

  it('should update zoom value when handling setZoom', () => {
    const newZoom = defaultState.zoom + 1

    expect(
      canvasReducer(defaultState, setZoom(newZoom))
    ).toEqual({
      ...defaultState,
      zoom: newZoom
    })
  })

  it('should update scale value when handling setScale', () => {
    const newScale = defaultState.zoom + 1

    expect(
      canvasReducer(defaultState, setScale(newScale))
    ).toEqual({
      ...defaultState,
      scale: newScale
    })
  })
})
