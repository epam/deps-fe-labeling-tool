import React from 'react'
import { MockCanvas, MockBorder } from '@/mocks/mockFabric'
import { shallow } from 'enzyme'
import { CanvasMouse } from '@/components/CanvasMouse'
import { Table, toAbsolute, toRelative, splitCells, getSplitProjection } from '@/models/Table'
import { CanvasTableSplit } from './CanvasTableSplit'
import { FabricSplitProjection } from './FabricSplitProjection'

const mockOnDownCursor = { x: 1, y: 1 }
const mockOnUpCursor = { x: 10, y: 10 }
const mockOnMoveCursor = { x: 3, y: 3 }

jest.mock('./FabricBorder', () => ({
  FabricBorder: MockBorder
}))

jest.mock('@/models/Table/getBorders', () => ({
  getBorders: jest.fn(() => ['mockBorder'])
}))

describe('Component: CanvasTableSplit', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      table: new Table(
        [10, 20],
        [10, 20]
      ),
      scale: 1,
      image: {
        width: 1,
        height: 1
      },
      onUpdate: jest.fn()
    }

    wrapper = shallow(<CanvasTableSplit {...defaultProps} />)
  })

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass correct onMouseUp, onMouseDown, onMouseMove handlers to CanvasMouse component', () => {
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    expect(CanvasMouseProps.onMouseUp).toEqual(wrapper.instance().onMouseUp)
    expect(CanvasMouseProps.onMouseDown).toEqual(wrapper.instance().onMouseDown)
    expect(CanvasMouseProps.onMouseMove).toEqual(wrapper.instance().onMouseMove)
  })

  it('should call canvas.add and canvas.remove methods when componentDidUpdate', () => {
    const newProps = {
      canvas: new MockCanvas(),
      table: new Table(
        [20, 30],
        [30, 40]
      ),
      scale: 1,
      image: {
        width: 1,
        height: 1
      },
      onUpdate: jest.fn()
    }

    wrapper.setProps(newProps)
    const mockPrevTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockBorders = wrapper.instance().getRenderedBorders(mockPrevTable)
    expect(newProps.canvas.remove).toHaveBeenCalledWith(...mockBorders)
    expect(newProps.canvas.add).toHaveBeenCalled()
  })

  it('should call canvas.getPointer method when calling to onMouseDown with empty altKey', () => {
    defaultProps.canvas.getPointer = jest.fn(() => mockOnDownCursor)
    const mockOpts = { e: { altKey: '' } }
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseDown(mockOpts)
    expect(defaultProps.canvas.getPointer).nthCalledWith(1, mockOpts.e)
  })

  it('should not call canvas.getPointer method when calling to onMouseDown with a given altKey', () => {
    const mockOpts = { e: { altKey: '1' } }
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseDown(mockOpts)
    expect(defaultProps.canvas.getPointer).toHaveBeenCalledTimes(0)
  })

  it('should call canvas.add with correct props method when calling to renderSplitProjection()', () => {
    wrapper.instance().renderSplitProjection(mockOnDownCursor, mockOnMoveCursor, false)
    const mockAbsolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockSplitProjection = getSplitProjection(mockAbsolutePropsTable, mockOnDownCursor, mockOnMoveCursor, false)
    const mockProjection = new FabricSplitProjection(mockSplitProjection)
    expect(defaultProps.canvas.add).toHaveBeenCalledWith(mockProjection)
  })

  it('should call onUpdate with correct props when calling onMouseUp if shouldSplit is true', () => {
    Object.defineProperty(wrapper.instance(), 'onDownCursor', { value: mockOnDownCursor, configurable: true, writable: true })
    const mockOpts = { e: { altKey: '' } }
    defaultProps.canvas.getPointer.mockImplementationOnce(() => (mockOnUpCursor))
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseUp(mockOpts)
    const mockAbsolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockTable = splitCells(mockAbsolutePropsTable, mockOnDownCursor, mockOnUpCursor, mockOpts.e.shiftKey)
    expect(defaultProps.onUpdate).nthCalledWith(1, toRelative(mockTable, defaultProps.scale, defaultProps.image))
  })

  it('should not call onUpdate when calling onMouseUp if shouldSplit is false', () => {
    Object.defineProperty(wrapper.instance(), 'onDownCursor', { value: mockOnDownCursor, configurable: true, writable: true })
    const mockOpts = { e: { altKey: '1' } }
    defaultProps.canvas.getPointer.mockImplementationOnce(() => ({ x: 1, y: 1 }))
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseUp(mockOpts)
    expect(defaultProps.onUpdate).toHaveBeenCalledTimes(0)
  })

  it('should call canvas.add method when calling to onMouseMove if onDownCursor is given', () => {
    Object.defineProperty(wrapper.instance(), 'onDownCursor', { value: mockOnDownCursor, configurable: true, writable: true })
    const mockOpts = { e: { altKey: '' } }
    defaultProps.canvas.getPointer.mockImplementationOnce(() => ({ x: 1, y: 1 }))
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseMove(mockOpts)
    expect(defaultProps.canvas.add).toHaveBeenCalled()
  })

  it('should call canvas.remove with correct props when calling onMouseMove if onDownCursor is given', () => {
    wrapper.instance().renderSplitProjection(mockOnDownCursor, mockOnMoveCursor, false)
    const mockAbsolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockSplitProjection = getSplitProjection(mockAbsolutePropsTable, mockOnDownCursor, mockOnMoveCursor, false)
    const mockProjection = new FabricSplitProjection(mockSplitProjection)
    Object.defineProperty(wrapper.instance(), 'onDownCursor', { value: mockOnDownCursor, configurable: true, writable: true })
    const mockOpts = { e: { altKey: '' } }
    defaultProps.canvas.getPointer.mockImplementationOnce(() => ({ x: 1, y: 1 }))
    const CanvasMouseProps = wrapper.find(CanvasMouse).props()
    CanvasMouseProps.onMouseMove(mockOpts)
    expect(defaultProps.canvas.remove).toHaveBeenCalledWith(mockProjection)
  })

  it('should call reRenderTable with correct props when componentWillUnmount', () => {
    const reRenderTable = jest.spyOn(wrapper.instance(), 'reRenderTable')
    wrapper.unmount()
    expect(reRenderTable).toHaveBeenCalledWith(toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image))
  })
})
