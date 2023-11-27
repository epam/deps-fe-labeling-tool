import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, MockPoint, mockFabric } from '@/mocks/mockFabric'
import React from 'react'
import { shallow } from 'enzyme'
import { CanvasZoom as ProviderMock } from './CanvasZoom'

jest.mock('fabric', () => mockFabric)

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

const CanvasZoom = ProviderMock.WrappedComponent

const ZOOM_STEP = 1 / 500
const MIN_ZOOM = 0.5
const MAX_ZOOM = 5

const HUGE_SCROLL_AMOUNT = 10000

const getMouseWheelEvent = (deltaY = -1, altKey = true, offsetX = 10, offsetY = 10) => ({
  e: {
    offsetX,
    offsetY,
    deltaY,
    altKey
  }
})

describe('Component: CanvasZoom', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      zoom: 1,
      setZoom: jest.fn()
    }

    wrapper = shallow(<CanvasZoom {...defaultProps} />)
  })

  it('should register correct canvas events callbacks', () => {
    expect(defaultProps.canvas.on).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.on).toHaveBeenCalledWith('mouse:wheel', wrapper.instance().onWheel)
  })

  it('should call to props.setZoom with new zoom if calling to onWheel', () => {
    const event = getMouseWheelEvent(-1)

    wrapper.instance().onWheel(event)

    expect(defaultProps.setZoom).toHaveBeenCalledWith(defaultProps.zoom + ZOOM_STEP)
  })

  it('should call to canvas.zoomToPoint with new zoom if calling to onWheel', () => {
    const event = getMouseWheelEvent(1)

    wrapper.instance().onWheel(event)

    expect(defaultProps.canvas.zoomToPoint).toHaveBeenCalledWith(
      {
        x: event.e.offsetX,
        y: event.e.offsetY
      },
      defaultProps.zoom - ZOOM_STEP
    )
  })

  it('should call to setZoom with MAX_ZOOM if scroll deltaY value was huge and below zero', () => {
    const event = getMouseWheelEvent(-HUGE_SCROLL_AMOUNT)

    wrapper.instance().onWheel(event)

    expect(defaultProps.setZoom).toHaveBeenCalledWith(MAX_ZOOM)
  })

  it('should call to setZoom with MIN_ZOOM if scroll deltaY value was huge', () => {
    const event = getMouseWheelEvent(HUGE_SCROLL_AMOUNT)

    wrapper.instance().onWheel(event)

    expect(defaultProps.setZoom).toHaveBeenCalledWith(MIN_ZOOM)
  })

  it('should call to canvas canvas.zoomToPoint after props.zoom update', () => {
    jest.clearAllMocks()
    const zoom = defaultProps.zoom + 1

    wrapper.setProps({ ...defaultProps, zoom })

    expect(defaultProps.canvas.getZoom).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.getCenter).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.zoomToPoint).nthCalledWith(1, MockPoint.getLastCreatedInstance(), zoom)
  })
})
