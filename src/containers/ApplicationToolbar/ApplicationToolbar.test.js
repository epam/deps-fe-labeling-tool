import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import { shallow } from 'enzyme'
import { ApplicationToolbar } from '@/containers/ApplicationToolbar'
import { DeleteButton } from '@/containers/DeleteButton'
import { Tool } from '@/enums/Tool'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/selectors/tools', () => mockToolsSelectors)

jest.mock('@/containers/MainMenu', () => ({
  ...mockComponent('MainMenu'),
  isMainMenuEmpty: jest.fn(() => false)
}))

jest.mock('@/containers/ObjectActions', () => ({
  ...mockComponent('ObjectActions'),
  isObjectActionsEmpty: jest.fn(() => false)
}))

jest.mock('@/containers/ToolsPicker', () => ({
  ...mockComponent('ToolsPicker'),
  isToolsPickerEmpty: jest.fn(() => false)
}))

jest.mock('@/containers/HotKeysDrawer', () => mockComponent('HotKeysDrawer'))
jest.mock('@/containers/DeleteButton', () => mockComponent('DeleteButton'))
jest.mock('@/containers/ImageActions', () => mockComponent('ImageActions'))
jest.mock('@/containers/DocumentPageSwitcher', () => mockComponent('DocumentPageSwitcher'))
jest.mock('@/containers/DocumentProperties', () => mockComponent('DocumentProperties'))
jest.mock('@/containers/CommentsButton', () => mockComponent('CommentsButton'))
jest.mock('@/containers/CloseButton', () => mockComponent('CloseButton'))
jest.mock('@/containers/QuickAccessActions', () => mockComponent('QuickAccessActions'))

const { mapStateToProps, WrappedComponent } = ApplicationToolbar

describe('Container: ApplicationToolbar', () => {
  describe('mapStateToProps', () => {
    let props

    beforeEach(() => {
      props = mapStateToProps().props
    })

    it('should pass correct props to the wrapped component', () => {
      expect(props).toMatchSnapshot()
    })
  })

  describe('ConnectedComponent', () => {
    let defaultProps, wrapper

    beforeEach(() => {
      defaultProps = {
        settings: mockSettingsSelectors.settingsSelector(),
        selectedTool: Tool.POINTER
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout based on the props', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render DeleteButton in case selectedTool is not equal to "pointer"', () => {
      defaultProps.selectedTool = Tool.GRABBING
      wrapper.setProps(defaultProps)
      expect(wrapper.find(DeleteButton).exists()).toBe(false)
    })
  })
})
