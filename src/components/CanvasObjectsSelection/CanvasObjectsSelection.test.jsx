import React from 'react'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, mockFabric, MockActiveSelection } from '@/mocks/mockFabric'
import { shallow } from 'enzyme'
import { CanvasObjectsSelection as ProviderMock } from '@/components/CanvasObjectsSelection'
import { getActiveDataObjects } from '@/utils/fabric'

jest.mock('fabric', () => mockFabric)

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

jest.mock('@/utils/fabric', () => ({
  getActiveDataObjects: jest.fn(),
  disableRotationControls: jest.fn()
}))

const CanvasObjectsSelection = ProviderMock.WrappedComponent

const mockCanvas = new MockCanvas()

mockCanvas.getObjects = jest.fn(() => [{ data: { uid: 'test' }, set: jest.fn() }])

mockCanvas.setActiveObject = jest.fn((arg) => arg)

describe('Component: CanvasObjectsSelection', () => {
  let defaultProps, wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: mockCanvas,
      selectedObjectsIds: ['test', 'test1'],
      onSelection: jest.fn(),
      onSelectionClear: jest.fn()
    }

    wrapper = shallow(<CanvasObjectsSelection {...defaultProps} />)
  })

  it('should register correct canvas events selection:created callbacks when component mounting', () => {
    expect(defaultProps.canvas.on).nthCalledWith(1, 'selection:created', wrapper.instance().onSelection)
  })

  it('should register correct canvas events selection:updated callbacks when component mounting', () => {
    expect(defaultProps.canvas.on).nthCalledWith(2, 'selection:updated', wrapper.instance().onSelection)
  })

  it('should register correct canvas events selection:cleared callbacks when component mounting', () => {
    expect(defaultProps.canvas.on).nthCalledWith(3, 'selection:cleared', wrapper.instance().onSelectionClear)
  })

  it('should register correct canvas events selection:created callbacks when component unmounting', () => {
    const onSelection = wrapper.instance().onSelection
    wrapper.unmount()
    expect(defaultProps.canvas.off).nthCalledWith(1, 'selection:created', onSelection)
  })

  it('should register correct canvas events selection:updated callbacks when component unmounting', () => {
    const onSelection = wrapper.instance().onSelection
    wrapper.unmount()
    expect(defaultProps.canvas.off).nthCalledWith(2, 'selection:updated', onSelection)
  })

  it('should register correct canvas events selection:cleared callbacks when component unmounting', () => {
    const onSelectionClear = wrapper.instance().onSelectionClear
    wrapper.unmount()
    expect(defaultProps.canvas.off).nthCalledWith(3, 'selection:cleared', onSelectionClear)
  })

  it('should discardActiveObject be called once', () => {
    expect(defaultProps.canvas.discardActiveObject).toHaveBeenCalledTimes(1)
  })

  it('should getActiveSelection return selectedObjects[0] if selectedObjects.length === 1', () => {
    wrapper.setProps({ ...defaultProps, selectedObjectsIds: ['test'] })
    expect(defaultProps.canvas.setActiveObject).nthCalledWith(2, expect.objectContaining({ data: expect.objectContaining({ uid: 'test' }), set: expect.any(Function) }))
  })

  it('should getActiveSelection retrun new fabric.ActiveSelection if selectedObjects.length > 1', () => {
    const instance = wrapper.instance().getActiveSelection(['test', 'test1'])
    expect(instance instanceof MockActiveSelection).toBe(true)
  })

  it('should renderSelection stop execution if !objectsForSelection.length (once call when shallow)', () => {
    wrapper.setProps({ ...defaultProps, selectedObjectsIds: [] })
    expect(defaultProps.canvas.setActiveObject).toBeCalledTimes(1)
  })

  it('should renderSelection all methods be executed', () => {
    wrapper.instance().renderSelection()
    expect(defaultProps.canvas.setActiveObject).toBeCalledTimes(2)
  })

  it('should be called defaultProps.onSelection when CanvasObjectsSelection.onSelection', () => {
    const opts = { target: new MockActiveSelection() }
    wrapper.instance().onSelection(opts)
    expect(defaultProps.onSelection).toBeCalled()
  })

  it('should be called defaultProps.onSelection with correct arg', () => {
    const opts = { target: new MockActiveSelection() }
    wrapper.instance().onSelection(opts)
    expect(getActiveDataObjects).nthCalledWith(1, defaultProps.canvas)
  })

  it('should getObjects must be called once', () => {
    expect(defaultProps.canvas.getObjects).toHaveBeenCalledTimes(1)
  })
})
