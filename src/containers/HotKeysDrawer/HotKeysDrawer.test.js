import React from 'react'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockHotKeysSelectors } from '@/mocks/selectors/hotkeys'
import { shallow } from 'enzyme'
import { List } from '@/components/List'
import { Drawer } from './HotKeysDrawer.styles'
import { HotKeysDrawer } from '.'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/hotkeys', () => mockHotKeysSelectors)

const { WrappedComponent, mapStateToProps } = HotKeysDrawer

describe('Container: HotKeysDrawer', () => {
  describe('mapStateToProps', () => {
    it('should pass expected props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      visible: true,
      toggleHotKeysInfo: jest.fn(),
      hotKeyEvents: mockHotKeysSelectors.hotKeysSelector()
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem with the selected tools', () => {
    const list = wrapper.find(List)
    const hotKeysInfo = list.props().dataSource
    const listItem = hotKeysInfo.map((info) => list.props().renderItem(info))
    const listWrapper = shallow(<div>{listItem}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should call props toggleHotKeysInfo when calling to Drawer onClose', () => {
    wrapper.find(Drawer).props().onClose()
    expect(defaultProps.toggleHotKeysInfo).toHaveBeenCalled()
  })
})
