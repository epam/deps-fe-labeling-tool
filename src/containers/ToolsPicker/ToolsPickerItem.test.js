import React from 'react'
import { shallow } from 'enzyme'
import { Tool } from '@/enums/Tool'
import { ButtonIcon } from './ToolsPicker.styles'
import { ToolsPickerItem } from './ToolsPickerItem'

describe('Container: ToolsPickerItem', () => {
  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      tool: Tool.POINTER,
      selectedTool: Tool.POINTER,
      onClick: jest.fn()
    }
    wrapper = shallow(<ToolsPickerItem {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call to onClick prop with correct arg when calling to ButtonIcon onClick (onItemClick)', () => {
    const ButtonWrapper = wrapper.find(ButtonIcon)
    ButtonWrapper.props().onClick()

    expect(defaultProps.onClick).nthCalledWith(1, defaultProps.tool)
  })
})
