import { mockToolsActions } from '@/mocks/actions/tools'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas } from '@/mocks/mockFabric'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import React from 'react'
import { shallow } from 'enzyme'
import { changeTool } from '@/actions/tools'
import { CanvasDragger } from './CanvasDragger'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)
jest.mock('@/selectors/tools', () => mockToolsSelectors)
jest.mock('@/actions/tools', () => mockToolsActions)
jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

const { mapStateToProps, mapDispatchToProps, WrappedComponent } = CanvasDragger.WrappedComponent

const getMouseUpEvent = () => ({
  e: {
    preventDefault: jest.fn()
  }
})

const getMouseMoveEvent = (clientX = 10, clientY = 10) => ({
  e: {
    preventDefault: jest.fn(),
    clientX,
    clientY
  }
})

const getMouseDownEvent = (altKey = false, clientX = 10, clientY = 10) => ({
  e: {
    preventDefault: jest.fn(),
    altKey,
    clientX,
    clientY
  }
})

describe('Component: CanvasDragger', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      registerHandlers: jest.fn(),
      ...mapStateToProps().props,
      ...mapDispatchToProps().props
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should call registerHandlers on mount', () => {
    expect(defaultProps.registerHandlers).toHaveBeenCalled()
  })

  it('should call to e.preventDefault and disable canvas selection onMouseDown if alt was pressed', () => {
    const event = getMouseDownEvent(true)

    wrapper.instance().onMouseDown(event)

    expect(event.e.preventDefault).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.selection).toEqual(false)
  })

  it('should change canvas viewport position if mouse was moved after mouse was clicked with alt pressed', () => {
    jest.clearAllMocks()
    const downEvent = getMouseDownEvent(true, 200, 200)
    const moveEvent1 = getMouseMoveEvent(210, 210)
    const moveEvent2 = getMouseMoveEvent(220, 220)
    const beforeViewportXOffset = defaultProps.canvas.viewportTransform[4]
    const beforeViewportYOffset = defaultProps.canvas.viewportTransform[5]

    wrapper.instance().onMouseDown(downEvent)
    wrapper.instance().onMouseMove(moveEvent1)
    wrapper.instance().onMouseMove(moveEvent2)

    expect(moveEvent1.e.preventDefault).toHaveBeenCalledTimes(1)
    expect(moveEvent2.e.preventDefault).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.viewportTransform[4]).toEqual(beforeViewportXOffset + 20)
    expect(defaultProps.canvas.viewportTransform[5]).toEqual(beforeViewportYOffset + 20)
    expect(defaultProps.canvas.requestRenderAll).toHaveBeenCalledTimes(2)
  })

  it('should ignore mouse move event if mouse was not clicked before that', () => {
    jest.clearAllMocks()
    const moveEvent = getMouseMoveEvent(210, 210)
    const beforeViewportXOffset = defaultProps.canvas.viewportTransform[4]
    const beforeViewportYOffset = defaultProps.canvas.viewportTransform[5]

    wrapper.instance().onMouseMove(moveEvent)

    expect(moveEvent.e.preventDefault).not.toHaveBeenCalled()
    expect(defaultProps.canvas.viewportTransform[4]).toEqual(beforeViewportXOffset)
    expect(defaultProps.canvas.viewportTransform[5]).toEqual(beforeViewportYOffset)
    expect(defaultProps.canvas.requestRenderAll).not.toHaveBeenCalled()
  })

  it('should call e.preventDefault and enable canvas selection on mouse up event if mouse was clicked with alt pressed before that', () => {
    jest.clearAllMocks()
    const downEvent = getMouseDownEvent(true)
    const upEvent = getMouseUpEvent()

    wrapper.instance().onMouseDown(downEvent)
    wrapper.instance().onMouseUp(upEvent)

    expect(upEvent.e.preventDefault).toHaveBeenCalledTimes(1)
    expect(defaultProps.canvas.selection).toEqual(true)
  })

  it('should ignore mouse move event after mouse down and mouse up events sequence', () => {
    jest.clearAllMocks()
    const downEvent = getMouseDownEvent(true)
    const upEvent = getMouseUpEvent()
    const moveEvent = getMouseMoveEvent()
    const beforeViewportXOffset = defaultProps.canvas.viewportTransform[4]
    const beforeViewportYOffset = defaultProps.canvas.viewportTransform[5]

    wrapper.instance().onMouseDown(downEvent)
    wrapper.instance().onMouseUp(upEvent)
    wrapper.instance().onMouseMove(moveEvent)

    expect(moveEvent.e.preventDefault).not.toHaveBeenCalled()
    expect(defaultProps.canvas.viewportTransform[4]).toEqual(beforeViewportXOffset)
    expect(defaultProps.canvas.viewportTransform[5]).toEqual(beforeViewportYOffset)
    expect(defaultProps.canvas.requestRenderAll).not.toHaveBeenCalled()
  })
})

describe('mapDispatchToProps', () => {
  const { props, dispatch } = mapDispatchToProps()

  it('should dispatch changeTool action when calling to changeTool prop', () => {
    props.changeTool()
    expect(changeTool).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(changeTool())
  })
})
