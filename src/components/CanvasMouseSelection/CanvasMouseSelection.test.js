import React from 'react'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { MockCanvas, mockFabric } from '@/mocks/mockFabric'
import { shallow } from 'enzyme'
import { CanvasMouse } from '@/components/CanvasMouse'
import { CanvasMouseSelection as ProviderMock } from '@/components/CanvasMouseSelection'
import { Rectangle } from '@/models/Rectangle'
import { COLORS } from '@/theme/theme.default'

jest.mock('fabric', () => mockFabric)

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

const mockCanvas = new MockCanvas()
mockCanvas.getPointer = jest.fn(() => ({
  x: 10,
  y: 10
}))

const MIN_REQUIRED_THRESHOLD = 0.001
const mockRectangle = new Rectangle(10, 10, 10, 10)
const mockOpts = { e: { altKey: null } }
const mockCursor = {
  x: 20,
  y: 20
}

const CanvasMouseSelection = ProviderMock.WrappedComponent

describe('Component: CanvasMouseSelection', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: mockCanvas,
      onSelectionEnd: jest.fn(),
      onSelectionUpdate: jest.fn()
    }

    wrapper = shallow(<CanvasMouseSelection {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should set selection color on component mount', () => {
    expect(defaultProps.canvas.selectionColor).toBe(COLORS.SELECTION)
    expect(defaultProps.canvas.selectionBorderColor).toBe(COLORS.SELECTION_BORDER_COLOR)
  })

  it('should set selection color to transparent on component unmount', () => {
    wrapper.instance().componentWillUnmount()
    expect(defaultProps.canvas.selectionColor).toBe(COLORS.TRANSPARENT)
    expect(defaultProps.canvas.selectionBorderColor).toBe(COLORS.TRANSPARENT)
  })

  it('should call canvas getPointer on onMouseDown event', () => {
    wrapper.find(CanvasMouse).props().onMouseDown(mockOpts)
    expect(defaultProps.canvas.getPointer).nthCalledWith(1, mockOpts.e)
  })

  it('should not call canvas getPointer on onMouseDown event when given altKey', () => {
    const opts = { e: { altKey: 'altKey' } }
    wrapper.find(CanvasMouse).props().onMouseDown(opts)
    expect(defaultProps.canvas.getPointer).not.toHaveBeenCalled()
  })

  it('should call defaultProps.onSelecionEnd on onMouseUp event', () => {
    wrapper.instance().cursorA = mockCursor
    wrapper.find(CanvasMouse).props().onMouseUp(mockOpts)
    expect(defaultProps.onSelectionEnd).nthCalledWith(1, mockRectangle, mockOpts)
  })

  it('should call defaultProps.onSelectionUpdate on onMouseMove event', () => {
    wrapper.instance().cursorA = mockCursor
    wrapper.find(CanvasMouse).props().onMouseMove(mockOpts)
    expect(defaultProps.onSelectionUpdate).nthCalledWith(1, mockRectangle, mockOpts)
  })

  it('CanvasMouseSelection.getSelectionRectangle should return rectangle', () => {
    wrapper.instance().cursorA = mockCursor
    expect(wrapper.instance().getSelectionRectangle(mockOpts)).toEqual(mockRectangle)
  })

  it('CanvasMouseSelection.getSelectionRectangle should return rectangle with minimum size if coords are equal', () => {
    wrapper.instance().cursorA = mockCanvas.getPointer()
    expect(wrapper.instance().getSelectionRectangle(mockOpts)).toEqual(new Rectangle(10, 10, MIN_REQUIRED_THRESHOLD, MIN_REQUIRED_THRESHOLD))
  })

  it('CanvasMouseSelection.getSelectionRectangle should return undefined if missing cursor coords', () => {
    expect(wrapper.instance().getSelectionRectangle(mockOpts)).toEqual(undefined)
  })
})
