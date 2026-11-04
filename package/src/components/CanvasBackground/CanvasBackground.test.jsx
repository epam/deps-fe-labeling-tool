import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, MockImage, mockFabric } from '@/mocks/mockFabric'
import React from 'react'
import { shallow } from 'enzyme'
import flushPromises from 'flush-promises'
import { CanvasBackground as ProviderMock } from '@/components/CanvasBackground'
import { Placement } from '@/enums/Placement'

jest.mock('fabric', () => mockFabric)

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)
jest.mock('@/services/api', () => ({
  getApi: () => ({
    getImage: jest.fn()
  })
}))

const mockImgPlacement = {
  originX: Placement.LEFT,
  originY: Placement.TOP
}
const CanvasBackground = ProviderMock.WrappedComponent

jest.mock('@/utils/image', () => ({
  loadImage: jest.fn((imageURL) => {
    const mockImage = new MockImage()
    mockImage.src = imageURL
    return Promise.resolve({ image: mockImage, imageURL })
  }),
  getImagePosition: jest.fn(() => ({
    originX: mockImgPlacement.originX,
    originY: mockImgPlacement.originY
  }))
}))

describe('Component: CanvasBackground', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      url: 'MOCK_URL',
      color: 'MOCK_COLOR',
      scale: 0.5,
      canvas: new MockCanvas(),
      rotationAngle: 0,
      setImage: jest.fn(),
      setScale: jest.fn(),
      image: {
        width: 100,
        height: 100
      }
    }

    wrapper = shallow(<CanvasBackground {...defaultProps} />)
  })

  it('should not render any layout', () => {
    expect(wrapper.children().exists()).toBeFalsy()
  })

  it('should set canvas.backgroundColor if props.color was specified', () => {
    expect(defaultProps.canvas.backgroundColor).toBe(defaultProps.color)
  })

  it('should not change canvas.backgroundColor if props.color was not specified', async () => {
    const mockColor = 'EXISTING_COLOR'
    const canvas = new MockCanvas()
    canvas.backgroundColor = mockColor
    const { color, ...resetProps } = defaultProps

    shallow(<CanvasBackground {...resetProps} canvas={canvas} />)

    expect(canvas.backgroundColor).toBe(mockColor)
  })

  it('should set canvas.backgroundImage with correct props if props.url was specified', async () => {
    await flushPromises()

    const { originX, originY } = mockImgPlacement

    expect(defaultProps.canvas.backgroundImage).toEqual(expect.objectContaining({
      scaleX: defaultProps.scale,
      scaleY: defaultProps.scale,
      angle: defaultProps.rotationAngle,
      originX,
      originY
    }))
  })

  it('should call to canvas.setViewportTransform with correct args to align the image', () => {
    expect(defaultProps.canvas.setViewportTransform).nthCalledWith(1, [0, 0, 0, 0, 50, 50])
  })

  it('should not change canvas.backgroundImage if props.url was not specified', async () => {
    const canvas = new MockCanvas()
    canvas.backgroundImage = { existing: true }
    const { url, ...resetProps } = defaultProps

    shallow(<CanvasBackground {...resetProps} canvas={canvas} />)

    await flushPromises()

    expect(canvas.backgroundImage).toEqual({ existing: true })
  })

  it('should update canvas.backgroundColor if props.color has changed', () => {
    const color = 'NEW_COLOR'

    wrapper.setProps({
      ...defaultProps,
      color
    })

    expect(defaultProps.canvas.backgroundColor).toBe(color)
  })

  it('should clear background color if props.color was cleared', () => {
    jest.clearAllMocks()

    wrapper.setProps({
      ...defaultProps,
      color: undefined
    })

    expect(defaultProps.canvas.backgroundColor).toBe('')
  })

  it('should update canvas.backgroundImage if props.url has changed', async () => {
    const url = 'NEW_URL'

    wrapper.setProps({
      ...defaultProps,
      url
    })

    await flushPromises()

    expect(defaultProps.canvas.backgroundImage).toEqual(expect.objectContaining({
      scaleX: defaultProps.scale,
      scaleY: defaultProps.scale
    }))
  })

  it('should clear backgroundImage if props.url was cleared', () => {
    jest.clearAllMocks()

    wrapper.setProps({
      ...defaultProps,
      url: undefined
    })

    expect(defaultProps.canvas.backgroundImage).toBeUndefined()
  })
})
