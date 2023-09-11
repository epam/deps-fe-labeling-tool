import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import {
  zoomSelector,
  scaleSelector,
  rotationAnglesSelector,
  pageRotationAngleSelector
} from '@/selectors/canvas'

const mockRotationAngles = mockCanvasSelectors.rotationAnglesSelector()

describe('Selectors: canvas', () => {
  let defaultState

  beforeEach(() => {
    defaultState = {
      pagination: {
        currentPage: 1
      },
      canvas: {
        zoom: 4,
        scale: 2,
        rotationAngles: mockRotationAngles
      }
    }
  })

  it('should get correct zoom value from state when using zoomSelector', () => {
    expect(zoomSelector(defaultState)).toEqual(defaultState.canvas.zoom)
  })

  it('should get correct scale value from state when using scaleSelector', () => {
    expect(scaleSelector(defaultState)).toEqual(defaultState.canvas.scale)
  })

  it('should get correct rotation angles from state when using rotationAnglesSelector', () => {
    expect(rotationAnglesSelector(defaultState)).toEqual(defaultState.canvas.rotationAngles)
  })

  it('should get correct page rotation angle when using pageRotationAngleSelector', () => {
    expect(pageRotationAngleSelector(defaultState)).toEqual(defaultState.canvas.rotationAngles[1])
  })
})
