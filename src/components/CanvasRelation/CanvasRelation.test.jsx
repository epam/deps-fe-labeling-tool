import React from 'react'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, MockFabricArrow } from '@/mocks/mockFabric'
import { shallow } from 'enzyme'
import { CanvasRelation as ProviderMock } from '@/components/CanvasRelation'
import { Label, LabelType } from '@/models/Label'
import { Relation } from '@/models/Relation'
import { atSameSpot, hasSameSize } from '@/utils/fabric'

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

jest.mock('@/utils/fabric', () => ({
  getPositionInsideGroup: jest.fn(() => {
    return { x1: 1, y1: 3 }
  }),
  atSameSpot: jest.fn((thisProp, newProp) => thisProp.x === newProp.x && thisProp.y === newProp.y),
  hasSameSize: jest.fn((thisProp, newProp) => thisProp.h === newProp.h && thisProp.w === newProp.w)
}))

jest.mock('@/components/CanvasRelation/FabricArrow', () => ({
  FabricArrow: MockFabricArrow
}))

const CanvasRelation = ProviderMock.WrappedComponent

describe('Component: CanvasRelation', () => {
  let defaultProps, wrapper, labelC

  const labelA = new Label(1, 1, 1, 1, 'fieldCode1', 0, LabelType.VALUE, 'value 1')
  const labelB = new Label(2, 2, 2, 2, 'fieldCode1', 0, LabelType.KEY, 'key 1')
  labelC = new Label(3, 3, 3, 3, 'fieldCode1', 0, LabelType.KEY, 'key 1')

  const mockCanvas = new MockCanvas()
  const mockRelation = new Relation(labelA, labelB)

  beforeEach(() => {
    defaultProps = {
      canvas: mockCanvas,
      relation: mockRelation,
      scale: 1,
      image: { width: 1000, height: 1000 }
    }

    wrapper = shallow(<CanvasRelation {...defaultProps} />)
  })

  it('should not render any layout', () => {
    expect(wrapper.children().exists()).toBe(false)
  })

  it('should register correct canvas add events callbacks', () => {
    const arrow = wrapper.instance().arrow

    expect(defaultProps.canvas.add).nthCalledWith(1, arrow)
  })

  it('should register correct canvas sendToBack add events callbacks', () => {
    const arrow = wrapper.instance().arrow

    expect(defaultProps.canvas.sendToBack).nthCalledWith(1, arrow)
  })

  it('should triggered remove method when the component is unmounted', () => {
    const arrow = wrapper.instance().arrow
    wrapper.unmount()

    expect(defaultProps.canvas.remove).nthCalledWith(1, arrow)
  })

  it('should atSameSpot return false when prop relation.from x or y update and run updateArrowProps', () => {
    wrapper.setProps({ ...defaultProps, relation: new Relation(labelC, labelB) })

    const arrow = wrapper.instance().arrow

    expect(atSameSpot).nthReturnedWith(1, false)
    expect(arrow.set).toBeCalledTimes(2)
    expect(arrow.setCoords).toBeCalledTimes(2)
  })

  it('should atSameSpot return false when prop relation.to x or y update and run updateArrowProps', () => {
    wrapper.setProps({ ...defaultProps, relation: new Relation(labelA, labelC) })

    const arrow = wrapper.instance().arrow

    expect(atSameSpot).nthReturnedWith(2, false)
    expect(arrow.set).toBeCalledTimes(2)
    expect(arrow.setCoords).toBeCalledTimes(2)
  })

  it('should hasSameSize return false when prop relation.from w or h update and run updateArrowProps', () => {
    labelC = new Label(1, 1, 2, 2, 'fieldCode1', 0, LabelType.KEY, 'key 1')

    wrapper.setProps({ ...defaultProps, relation: new Relation(labelC, labelB) })

    const arrow = wrapper.instance().arrow

    expect(hasSameSize).nthReturnedWith(1, false)
    expect(arrow.set).toBeCalledTimes(2)
    expect(arrow.setCoords).toBeCalledTimes(2)
  })

  it('should hasSameSize return false when prop relation.to w or h update and run updateArrowProps', () => {
    labelC = new Label(2, 2, 1, 1, 'fieldCode1', 0, LabelType.KEY, 'key 1')

    wrapper.setProps({ ...defaultProps, relation: new Relation(labelA, labelC) })

    const arrow = wrapper.instance().arrow

    expect(hasSameSize).nthReturnedWith(2, false)
    expect(arrow.set).toBeCalledTimes(2)
    expect(arrow.setCoords).toBeCalledTimes(2)
  })

  it('should triggered updateArrowProps method when prop relation update', () => {
    wrapper.setProps({ ...defaultProps, relation: new Relation(labelA, labelC) })
    const arrow = wrapper.instance().arrow

    expect(arrow.set).toBeCalledTimes(2)
    expect(arrow.setCoords).toBeCalledTimes(2)
  })

  it('should componentDidUpdate are not triggered when props have not changed', () => {
    wrapper.setProps({ ...defaultProps })

    const shouldUpdate = wrapper.instance().shouldComponentUpdate(defaultProps)

    const arrow = wrapper.instance().arrow

    expect(shouldUpdate).toBe(false)
    expect(arrow.set).toBeCalledTimes(1)
    expect(arrow.setCoords).toBeCalledTimes(1)
  })
})
