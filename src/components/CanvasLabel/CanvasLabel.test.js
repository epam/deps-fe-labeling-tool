import React from 'react'
import { mockCanvasProvider } from '@/mocks/mockCanvasProvider'
import { mockFabric, MockCanvas } from '@/mocks/mockFabric'
import { mount } from 'enzyme'
import { fabric } from 'fabric'
import { CanvasLabel as ProviderMock } from '@/components/CanvasLabel'
import { Label, LabelType } from '@/models/Label'
import { COLORS } from '@/theme/theme.default'

jest.mock('@/components/CanvasProvider', () => mockCanvasProvider)

jest.mock('fabric', () => mockFabric)

const CanvasLabel = ProviderMock.WrappedComponent
const mockLabel = new Label(10, 10, 10, 10)

describe('Component: CanvasLabel', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      label: mockLabel,
      image: { width: 1000, height: 1000 },
      scale: 1,
      onUpdate: jest.fn(),
      isContentVisible: true,
      selectable: true
    }

    wrapper = mount(<CanvasLabel {...defaultProps} />)
  })

  it('should render right color', () => {
    defaultProps.label = new Label(10, 10, 10, 10, 'mockLabelCode', 0, LabelType.STRING)
    wrapper.setProps(defaultProps)
    const backgroundColor = wrapper.instance().getBackgroundColor()
    const borderColor = wrapper.instance().getBorderColor()
    expect(backgroundColor).toBe(COLORS.LABEL_STRING_BACKGROUND)
    expect(borderColor).toBe(COLORS.LABEL_STRING_BORDER)
  })

  it('should render right color for label without label code', () => {
    defaultProps.label = new Label(10, 10, 10, 10, '', 0, LabelType.STRING)
    wrapper.setProps(defaultProps)
    const backgroundColor = wrapper.instance().getBackgroundColor()
    const borderColor = wrapper.instance().getBorderColor()
    expect(backgroundColor).toBe(COLORS.MARKUP_OBJECT_UNASSIGNED_BACKGROUND)
    expect(borderColor).toBe(COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER)
  })

  it('should render right color for unasigned type', () => {
    const backgroundColor = wrapper.instance().getBackgroundColor()
    const borderColor = wrapper.instance().getBorderColor()
    expect(backgroundColor).toBe(COLORS.MARKUP_OBJECT_UNASSIGNED_BACKGROUND)
    expect(borderColor).toBe(COLORS.MARKUP_OBJECT_UNASSIGNED_BORDER)
  })

  it('should call canvas off method with correct args in case component unmounting', () => {
    const updatedLabel = wrapper.instance().updateCanvasLabel
    wrapper.unmount()
    expect(defaultProps.canvas.off).toHaveBeenCalledTimes(2)
    expect(defaultProps.canvas.on).toHaveBeenCalledWith('object:moved', updatedLabel)
    expect(defaultProps.canvas.on).toHaveBeenCalledWith('object:scaled', updatedLabel)
  })

  it('should call canvas remove method with correct args in case component unmounting', () => {
    const { selection, content, name } = wrapper.instance()
    wrapper.unmount()
    expect(defaultProps.canvas.remove).toHaveBeenCalledTimes(3)
    expect(defaultProps.canvas.remove).nthCalledWith(1, content)
    expect(defaultProps.canvas.remove).nthCalledWith(2, selection)
    expect(defaultProps.canvas.remove).nthCalledWith(3, name)
  })

  it('should register correct canvas events callbacks', () => {
    expect(defaultProps.canvas.on).toHaveBeenCalledTimes(2)
    expect(defaultProps.canvas.on).toHaveBeenCalledWith('object:moved', wrapper.instance().updateCanvasLabel)
    expect(defaultProps.canvas.on).toHaveBeenCalledWith('object:scaled', wrapper.instance().updateCanvasLabel)
  })

  it('should register correct selection events callbacks', () => {
    const { selection } = wrapper.instance()
    expect(selection.on).toHaveBeenCalledTimes(6)
  })

  it('should call requestRenderAll in showCaption when one label is selected', () => {
    defaultProps.canvas.getActiveObject.mockImplementationOnce(() => wrapper.instance().selection)
    wrapper.instance().showCaptions()
    expect(defaultProps.canvas.requestRenderAll).toHaveBeenCalled()
  })

  it('should call requestRenderAll in hideCaptions when several labels are selected', () => {
    defaultProps.canvas.getActiveObject.mockImplementationOnce(() => [])
    wrapper.instance().hideCaptions()
    expect(defaultProps.canvas.requestRenderAll).toHaveBeenCalled()
  })

  it('should call onUpdate when called updateCanvasLabel with active object', () => {
    defaultProps.canvas.getActiveObjects.mockImplementationOnce(() => [{ data: defaultProps.label }])
    wrapper.instance().updateCanvasLabel()
    expect(defaultProps.onUpdate).toHaveBeenCalled()
  })

  it('should not call onUpdate when called updateCanvasLabel with no active objects', () => {
    defaultProps.canvas.getActiveObjects.mockImplementationOnce(() => [])
    wrapper.instance().updateCanvasLabel()
    expect(defaultProps.onUpdate).not.toHaveBeenCalled()
  })

  it('should call content name.set and content name.setCoors from componentDidMount method when props changed', () => {
    wrapper.setProps({ ...defaultProps, selectable: false })
    expect(wrapper.instance().name.set).toHaveBeenCalled()
    expect(wrapper.instance().name.setCoords).toHaveBeenCalled()
  })

  it('should fabric.Textbox with correct arguments', () => {
    expect(fabric.Textbox).nthCalledWith(
      1,
      Label.getStringContent(defaultProps.label),
      {
        fontSize: 15,
        fill: COLORS.PRIMARY_EMPHASIS,
        backgroundColor: COLORS.LABEL_NAME_BACKGROUND,
        hasControls: false,
        selectable: false,
        evented: false,
        readOnly: true,
        visible: false
      }
    )
  })
})
