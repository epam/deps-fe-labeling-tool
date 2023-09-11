import { mockUiActions } from '@/mocks/actions/ui'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { resetDefault } from '@/actions/ui'
import { LabelingTool as Container } from '@/pages/LabelingTool'
import { settingsSelector } from '@/selectors/settings'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/containers/ObjectProperties', () => mockComponent('ObjectProperties'))
jest.mock('@/containers/LabelingCanvas', () => mockComponent('LabelingCanvas'))
jest.mock('@/containers/MarkupSider', () => mockComponent('MarkupSider'))
jest.mock('@/containers/ApplicationToolbar', () => mockComponent('ApplicationToolbar'))
jest.mock('@/containers/LeftSidebar', () => mockComponent('LeftSidebar'))
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/hocs/withParentSize', () => ({
  withParentSize: (options) => (Component) => Component
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = Container

describe('Container: LabelingTool', () => {
  describe('mapStateToProps', () => {
    it('should call settingsSelector and pass the result as settings prop', () => {
      const { props } = mapStateToProps()

      expect(settingsSelector).toHaveBeenCalled()
      expect(props.settings).toEqual(mockSettingsSelectors.settingsSelector())
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass resetDefault action as prop to WrappedComponent', () => {
      props.resetDefault()

      expect(resetDefault).toHaveBeenCalled()
    })
  })

  describe('component', () => {
    let defaultProps
    let wrapper

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        size: {
          width: 900,
          height: 900
        }
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
