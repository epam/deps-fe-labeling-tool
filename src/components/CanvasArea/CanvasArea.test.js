import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, mockFabric } from '@/mocks/mockFabric'
import { mockUuid } from '@/mocks/mockUuid'
import React from 'react'
import { shallow } from 'enzyme'
import { CanvasArea as ProviderMock } from '@/components/CanvasArea'
import { Cursor } from '@/enums/Cursor'
import { Area } from '@/models/Area'
import { COLORS } from '@/theme/theme.default'

jest.mock('uuid', () => mockUuid)

jest.mock('fabric', () => mockFabric)

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

const mockCanvas = new MockCanvas()
mockCanvas.getActiveObjects = jest.fn(() => [{ data: { uid: `${+mockUuid.v4() - 1}` } }])

const mockImage = new Image(100, 100)

const CanvasArea = ProviderMock.WrappedComponent

const getAreaUpdates = (props) => ({
  left: props.area.x * props.image.width * props.scale,
  top: props.area.y * props.image.height * props.scale,
  width: props.area.w * props.image.width * props.scale,
  height: props.area.h * props.image.height * props.scale,
  data: props.area,
  stroke: COLORS.AREA_BORER,
  scaleX: 1,
  scaleY: 1,
  selectable: props.selectable,
  hoverCursor: props.selectable ? Cursor.MOVE : Cursor.DEFAULT
})

describe('Component: CanvasArea', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: mockCanvas,
      area: new Area(10, 10, 10, 10),
      onUpdate: jest.fn(),
      selectable: true,
      image: mockImage,
      scale: 1
    }

    wrapper = shallow(<CanvasArea {...defaultProps} />)
  })

  it('should not render any layout', () => {
    expect(wrapper.children().exists()).toBe(false)
  })

  it('should call area.set and area.setCoords when mounted', () => {
    expect(wrapper.instance().area.set).nthCalledWith(1, getAreaUpdates(defaultProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(1)
  })

  it('should call canvas.add when mounted', () => {
    expect(defaultProps.canvas.add).nthCalledWith(1, wrapper.instance().area)
  })

  it('should register correct canvas events object:moved callbacks when mounted', () => {
    expect(defaultProps.canvas.on).nthCalledWith(1, 'object:moved', wrapper.instance().updateArea)
  })

  it('should register correct canvas events object:scaled callbacks when mounted', () => {
    expect(defaultProps.canvas.on).nthCalledWith(2, 'object:scaled', wrapper.instance().updateArea)
  })

  it('should call area.set and area.setCoords again when area.x prop updated', () => {
    const newProps = {
      ...defaultProps,
      area: new Area(20, 10, 10, 10)
    }
    wrapper.setProps(newProps)
    expect(wrapper.instance().area.set).nthCalledWith(2, getAreaUpdates(newProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(2)
  })

  it('should call area.set and area.setCoords again when area.y prop updated', () => {
    const newProps = {
      ...defaultProps,
      area: new Area(10, 20, 10, 10)
    }
    wrapper.setProps(newProps)
    expect(wrapper.instance().area.set).nthCalledWith(2, getAreaUpdates(newProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(2)
  })

  it('should call area.set and area.setCoords again when area.w prop updated', () => {
    const newProps = {
      ...defaultProps,
      area: new Area(10, 10, 20, 10)
    }
    wrapper.setProps(newProps)
    expect(wrapper.instance().area.set).nthCalledWith(2, getAreaUpdates(newProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(2)
  })

  it('should call area.set and area.setCoords again when area.h prop updated', () => {
    const newProps = {
      ...defaultProps,
      area: new Area(10, 10, 10, 20)
    }
    wrapper.setProps(newProps)
    expect(wrapper.instance().area.set).nthCalledWith(2, getAreaUpdates(newProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(2)
  })

  it('should call area.set and area.setCoords again when selectable prop updated', () => {
    const newProps = {
      ...defaultProps,
      selectable: false
    }
    wrapper.setProps(newProps)
    expect(wrapper.instance().area.set).nthCalledWith(2, getAreaUpdates(newProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(2)
  })

  it('should not call area.set and area.setCoords again if area has not changed', () => {
    wrapper.setProps({ ...defaultProps })
    expect(wrapper.instance().area.set).nthCalledWith(1, getAreaUpdates(defaultProps))
    expect(wrapper.instance().area.setCoords).nthCalledWith(1)
  })

  it('should call canvas remove when component unmounting', () => {
    const area = wrapper.instance().area
    wrapper.unmount()
    expect(defaultProps.canvas.remove).nthCalledWith(1, area)
  })

  it('should register correct canvas events object:moved callbacks when component unmounting', () => {
    const updateArea = wrapper.instance().updateArea
    wrapper.unmount()
    expect(defaultProps.canvas.off).nthCalledWith(1, 'object:moved', updateArea)
  })

  it('should register correct canvas events object:scaled callbacks when component unmounting', () => {
    const updateArea = wrapper.instance().updateArea
    wrapper.unmount()
    expect(defaultProps.canvas.off).nthCalledWith(2, 'object:scaled', updateArea)
  })

  it('should not update when props have not changed', () => {
    expect(wrapper.instance().shouldComponentUpdate(defaultProps)).toBe(false)
  })

  it('should call defaultProps.onUpdate when CanvasArea.updateArea', () => {
    wrapper.instance().updateArea()
    expect(defaultProps.onUpdate).toHaveBeenCalledTimes(1)
  })

  it('should not call defaultProps.onUpdate when CanvasArea.updateArea if no renderedArea', () => {
    mockCanvas.getActiveObjects = jest.fn(() => [])
    wrapper.instance().updateArea()
    expect(defaultProps.onUpdate).not.toHaveBeenCalled()
  })
})
