import { mockToolsActions } from '@/mocks/actions/tools'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import React from 'react'
import { shallow } from 'enzyme'
import { changeTool } from '@/actions/tools'
import { Mode } from '@/enums/Mode'
import { Panel } from '@/enums/Panel'
import { Tool } from '@/enums/Tool'
import { Settings } from '@/models/Settings'
import { isToolsPickerEmpty, ToolsPicker } from '.'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/selectors/tools', () => mockToolsSelectors)

jest.mock('@/actions/tools', () => mockToolsActions)
jest.mock('@/containers/ToolsPicker/ToolsPickerDropdown', () => mockComponent('ToolsPickerDropdown'))

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = ToolsPicker

describe('Container: ToolsPicker', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass changeTool action as prop to WrappedComponent', () => {
      const { props } = mapDispatchToProps()
      const desiredTool = 'mockTool'
      props.changeTool(desiredTool)
      expect(changeTool).nthCalledWith(1, desiredTool)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        registerHandlers: jest.fn(),
        registerModifiers: jest.fn()
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call registerHandlers on mount', () => {
      expect(defaultProps.registerHandlers).toHaveBeenCalled()
    })

    it('should call registerModifiers on mount', () => {
      expect(defaultProps.registerModifiers).toHaveBeenCalled()
    })
  })

  describe('Util: isToolsPickerEmpty', () => {
    it('should return true when called without a tools property', () => {
      const settings = new Settings(Mode.DEFAULT, Panel.TOOLBAR, null)
      const result = isToolsPickerEmpty(settings)
      expect(result).toBe(true)
    })

    it('should return true when called with an empty array of tools', () => {
      const settings = new Settings(Mode.DEFAULT, Panel.TOOLBAR, [])
      const result = isToolsPickerEmpty(settings)
      expect(result).toBe(true)
    })

    it('should return false if it contains tools', () => {
      const settings = new Settings(Mode.DEFAULT, Panel.TOOLBAR, Object.values(Tool))
      const result = isToolsPickerEmpty(settings)
      expect(result).toBe(false)
    })
  })
})
