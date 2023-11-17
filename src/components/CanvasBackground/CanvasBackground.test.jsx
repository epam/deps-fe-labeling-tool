import React from 'react'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, MockImage, mockFabric } from '@/mocks/mockFabric'
import { shallow } from 'enzyme'
import { fabric } from 'fabric'
import flushPromises from 'flush-promises'
import { CanvasBackground as ProviderMock } from '@/components/CanvasBackground'
import { Placement } from '@/enums/Placement'
import { getApi } from '@/services/api'
import { loadImage } from '@/utils/image'

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

  it('should call to canvas.setBackgroundColor if props.color was specified', () => {
    expect(defaultProps.canvas.setBackgroundColor).nthCalledWith(1, defaultProps.color)
  })

  it('should not call to canvas.setBackgroundColor if props.color was not specified', async () => {
    jest.clearAllMocks()
    const { color, ...resetProps } = defaultProps

    shallow(<CanvasBackground {...resetProps} />)

    expect(defaultProps.canvas.setBackgroundColor).not.toHaveBeenCalled()
  })

  it('should call to canvas.setBackgroundImage with correct args if props.url was specified', async () => {
    await flushPromises()

    const { image } = await loadImage(defaultProps.url, getApi().getImage)
    const { originX, originY } = mockImgPlacement

    expect(defaultProps.canvas.setBackgroundImage).nthCalledWith(1,
      new fabric.Image(image),
      expect.any(Function),
      {
        scaleX: defaultProps.scale,
        scaleY: defaultProps.scale,
        angle: defaultProps.rotationAngle,
        originX,
        originY
      })
  })

  it('should call to canvas.setViewportTransform with correct args to align the image', () => {
    expect(defaultProps.canvas.setViewportTransform).nthCalledWith(1, [0, 0, 0, 0, 50, 50])
  })

  it('should not call to canvas.setBackgroundImage if props.url was not specified', async () => {
    jest.clearAllMocks()
    const { url, ...resetProps } = defaultProps

    shallow(<CanvasBackground {...resetProps} />)

    await flushPromises()

    expect(defaultProps.canvas.setBackgroundImage).not.toHaveBeenCalled()
  })

  it('should update canvas.backgroundColor if props.color has changed', () => {
    jest.clearAllMocks()
    const color = 'NEW_COLOR'

    wrapper.setProps({
      ...defaultProps,
      color
    })

    expect(defaultProps.canvas.setBackgroundColor).nthCalledWith(1, color)
  })

  it('should clear background color if props.color was cleared', () => {
    jest.clearAllMocks()

    wrapper.setProps({
      ...defaultProps,
      color: undefined
    })

    expect(defaultProps.canvas.setBackgroundColor).nthCalledWith(1, '')
  })

  it('should call to canvas.setBackgroundImage if props.url has changed', async () => {
    jest.clearAllMocks()
    const url = 'NEW_URL'
    const { image } = await loadImage(url, getApi().getImage)

    wrapper.setProps({
      ...defaultProps,
      url
    })

    await flushPromises()

    expect(defaultProps.canvas.setBackgroundImage).nthCalledWith(1,
      new fabric.Image(image),
      expect.any(Function),
      expect.any(Object)
    )
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
