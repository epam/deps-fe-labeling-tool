import React from 'react'
import { MockCanvas } from '@/mocks/mockFabric'
import { mount } from 'enzyme'
import { CanvasMouse } from '@/components/CanvasMouse'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f()())
}))

const mockCanvas = new MockCanvas()

describe('Component: CanvasMouse', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: mockCanvas,
      onMouseDown: jest.fn(),
      onMouseMove: jest.fn(),
      onMouseUp: jest.fn()
    }

    wrapper = mount(<CanvasMouse {...defaultProps} />)
  })

  it('should not render any layout', () => {
    expect(wrapper.children().exists()).toBe(false)
  })

  it('should register correct canvas events mouse:down callbacks when component updated', () => {
    expect(defaultProps.canvas.on).nthCalledWith(1, 'mouse:down', defaultProps.onMouseDown)
  })

  it('should register correct canvas events mouse:move callbacks when component updated', () => {
    expect(defaultProps.canvas.on).nthCalledWith(2, 'mouse:move', defaultProps.onMouseMove)
  })

  it('should register correct canvas events mouse:up callbacks when component updated', () => {
    expect(defaultProps.canvas.on).nthCalledWith(3, 'mouse:up', defaultProps.onMouseUp)
  })

  it('should register correct canvas events mouse:down callbacks when component unmounted', () => {
    expect(defaultProps.canvas.off).nthCalledWith(1, 'mouse:down', defaultProps.onMouseDown)
  })

  it('should register correct canvas events mouse:move callbacks when component unmounted', () => {
    expect(defaultProps.canvas.off).nthCalledWith(2, 'mouse:move', defaultProps.onMouseMove)
  })

  it('should register correct canvas events mouse:up callbacks when component unmounted', () => {
    expect(defaultProps.canvas.off).nthCalledWith(3, 'mouse:up', defaultProps.onMouseUp)
  })
})
