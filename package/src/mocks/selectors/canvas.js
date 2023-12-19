
import { Angle } from '@/enums/Rotation'

const mockZoom = 3
const zoomSelector = jest.fn(() => mockZoom)

const mockScale = 2
const scaleSelector = jest.fn(() => mockScale)

const mockRotationAngles = {
  1: Angle.D_0
}
const rotationAnglesSelector = jest.fn(() => mockRotationAngles)

const pageRotationAngleSelector = jest.fn(() => mockRotationAngles[1])

const mockCanvasSelectors = {
  zoomSelector,
  scaleSelector,
  rotationAnglesSelector,
  pageRotationAngleSelector
}

export {
  mockCanvasSelectors
}
