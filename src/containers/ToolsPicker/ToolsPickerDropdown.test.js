import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { LabelingIcon } from '@/components/Icons/LabelingIcon'
import { Tool } from '@/enums/Tool'
import { ButtonIcon } from './ToolsPicker.styles'
import { ToolsPickerDropdown } from './ToolsPickerDropdown'
import { ToolsPickerItem } from './ToolsPickerItem'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

const { WrappedComponent, mapStateToProps } = ToolsPickerDropdown

describe('Container: ToolsPickerDropdown', () => {
  let wrapper, defaultProps
  beforeEach(() => {
    defaultProps = {
      tools: [Tool.AREA, Tool.GRABBING, Tool.LABEL, Tool.SPLIT],
      selectedTool: Tool.POINTER,
      onSelection: jest.fn(),
      ...mapStateToProps().props
    }
    jest.clearAllMocks()
    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should change visibleTool state when selecting a valid tool', () => {
    const desiredTool = defaultProps.tools[1]
    wrapper.setProps({
      selectedTool: desiredTool
    })

    const visibleTool = wrapper.state('visibleTool')
    expect(visibleTool).toBe(desiredTool)
  })

  it('should call onSelection prop with expected arg when calling VisibleToolIcon onClick', () => {
    const ButtonIconWrapper = wrapper.find(ButtonIcon)
    const Icon = ButtonIconWrapper.props().icon
    const DropdownWrapper = shallow(
      <div>
        {Icon}
      </div>
    )
    const VisibleToolIconWrapper = DropdownWrapper.find(LabelingIcon).props()
    VisibleToolIconWrapper.onClick()
    expect(defaultProps.onSelection).nthCalledWith(1, wrapper.state('visibleTool'))
  })

  it('should call onSelection prop with expected arg when calling ActionMenu onClick', () => {
    const ButtonIconWrapper = wrapper.find(ButtonIcon)
    const DropdownToolsWrapper = ButtonIconWrapper.props().icon

    const DropdownWrapper = DropdownToolsWrapper.props.children[1]
    const ActionMenuWrapper = DropdownWrapper.props.overlay

    const mockItem = { key: 'mockKey' }
    ActionMenuWrapper.props.onClick(mockItem)

    expect(defaultProps.onSelection).nthCalledWith(1, mockItem.key)
  })

  it('should render secondary tools if selectedTool is Table', () => {
    wrapper.setProps({
      tools: [Tool.AREA, Tool.GRABBING, Tool.TABLE],
      selectedTool: Tool.TABLE,
      settings: {
        ...defaultProps.settings,
        tools: [Tool.MERGE]
      }
    })

    expect(wrapper.find(ToolsPickerItem).exists()).toBe(true)
  })
})
