import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import React from 'react'
import { Dropdown } from 'antd'
import { shallow } from 'enzyme'
import { importMarkup, exportMarkup } from '@/actions/markup'
import { MainMenu } from '@/containers/MainMenu/MainMenu'
import { ActionMenu } from '@/containers/MainMenu/MainMenu.styles'

jest.mock('react-redux', () => mockReactRedux
)
jest.mock('@/actions/markup', () => mockMarkupActions)

jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/selectors/tools', () => mockToolsSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/assets/pdfs/Labeling_Tool_Guide.pdf', () => { })

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = MainMenu

describe('Container: MainMenu', () => {
  describe('mapStateToProps', () => {
    it('should pass expected props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should call for importMarkup action from props', () => {
      props.importMarkup()
      expect(importMarkup).toHaveBeenCalledTimes(1)
    })

    it('should call for exportMarkup action from props', () => {
      props.exportMarkup()
      expect(exportMarkup).toHaveBeenCalledTimes(1)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    global.fetch = jest.fn(() =>
      Promise.resolve({
        blob: () => Promise.resolve()
      })
    )

    global.URL.createObjectURL = jest.fn()
    global.URL.revokeObjectURL = jest.fn()

    beforeEach(() => {
      defaultProps = {
        toggleHotKeysInfo: jest.fn(),
        ...mapStateToProps().props,
        ...mapDispatchToProps().props
      }

      wrapper = shallow(
        <WrappedComponent
          {...defaultProps}
        />
      )
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render menu correctly', () => {
      const action = wrapper.find(Dropdown).props()
      const render = action.overlay()
      const div = shallow(<div>{render}</div>)
      expect(div).toMatchSnapshot()
    })

    it('should call import markup using menu', () => {
      const action = wrapper.find(Dropdown).props()
      const render = action.overlay()
      const div = shallow(<div>{render}</div>)
      const onClick = div.find(ActionMenu).props().onClick
      onClick({ key: 'import' })
      expect(importMarkup).toHaveBeenCalled()
    })

    it('should call export markup using menu', () => {
      const action = wrapper.find(Dropdown).props()
      const render = action.overlay()
      const div = shallow(<div>{render}</div>)
      const onClick = div.find(ActionMenu).props().onClick
      onClick({ key: 'export' })
      expect(exportMarkup).toHaveBeenCalled()
    })

    it('should call props toggleHotKeysInfo hot keys using menu', () => {
      const action = wrapper.find(Dropdown).props()
      const render = action.overlay()
      const div = shallow(<div>{render}</div>)
      const onClick = div.find(ActionMenu).props().onClick
      onClick({ key: 'hotKeys' })
      expect(defaultProps.toggleHotKeysInfo).toHaveBeenCalled()
    })
  })
})
