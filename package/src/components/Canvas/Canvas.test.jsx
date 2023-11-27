import { mockFabric } from '@/mocks/mockFabric'
import React from 'react'
import { mount } from 'enzyme'
import { Canvas } from '@/components/Canvas'
import { CanvasBackground } from '@/components/CanvasBackground'

jest.mock('fabric', () => mockFabric)

describe('Components: Canvas', () => {
  let defaultProps
  let wrapper

  const getCanvas = () => wrapper.find(CanvasBackground).props().canvas

  beforeEach(() => {
    defaultProps = {
      width: 10,
      height: 2,
      onObjectCreate: jest.fn(),
      onObjectsDelete: jest.fn(),
      onObjectsUpdate: jest.fn(),
      onRef: jest.fn()
    }

    wrapper = mount(
      <Canvas {...defaultProps}>
        <CanvasBackground />
      </Canvas>
    )
  })

  it('should render canvas with correct props', () => {
    const canvasWrapper = wrapper.find('canvas')
    expect(canvasWrapper.exists()).toBeTruthy()
    expect(canvasWrapper.props().width).toEqual(defaultProps.width)
    expect(canvasWrapper.props().height).toEqual(defaultProps.height)
  })

  it('should not render any component that is not fabric wrapper', () => {
    wrapper = mount(
      <Canvas {...defaultProps}>
        <span>Mock Text</span>
      </Canvas>
    )

    expect(wrapper.find('span').exists()).toBeFalsy()
  })

  it('should call to canvas requestRenderAll after props update', () => {
    jest.clearAllMocks()

    wrapper.setProps({
      ...defaultProps,
      width: defaultProps.width + 1
    })

    expect(getCanvas().requestRenderAll).toHaveBeenCalledTimes(1)
  })

  it('should call to canvas canvas.setWidth after props.width update', () => {
    jest.clearAllMocks()
    const width = defaultProps.width + 1

    wrapper.setProps({ ...defaultProps, width })

    expect(getCanvas().getHeight).toHaveBeenCalledTimes(1)
    expect(getCanvas().setWidth).nthCalledWith(1, width)
  })

  it('should call to canvas canvas.setHeight after props.height update', () => {
    jest.clearAllMocks()
    const height = defaultProps.height + 1

    wrapper.setProps({ ...defaultProps, height })

    expect(getCanvas().setHeight).toHaveBeenCalledTimes(1)
    expect(getCanvas().setHeight).nthCalledWith(1, height)
  })
})
