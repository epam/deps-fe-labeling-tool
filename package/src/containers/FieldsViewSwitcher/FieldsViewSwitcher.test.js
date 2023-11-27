
import { mockReactRedux } from '@/mocks/mockReactRedux'
import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from '@/components/Dropdown'
import { Menu } from '@/components/Menu'
import { FieldsViewSwitcher, Group } from './FieldsViewSwitcher'

jest.mock('react-redux', () => mockReactRedux)

describe('FieldsViewSwitcher', () => {
  describe('component', () => {
    let defaultProps
    let wrapper

    beforeEach(() => {
      defaultProps = {
        groups: [new Group('test', 'Test')],
        setFieldsGrouping: jest.fn()
      }

      wrapper = shallow(<FieldsViewSwitcher {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call props.setFieldsGrouping in case calling to Menu.props.onClick', () => {
      const DropdownProps = wrapper.find(Dropdown).props()
      const tempWrap = shallow(<div>{DropdownProps.overlay}</div>)
      const MenuProps = tempWrap.find(Menu).props()
      const mockItem = { key: 'test' }
      MenuProps.onClick(mockItem)
      expect(defaultProps.setFieldsGrouping).nthCalledWith(1, mockItem.key)
    })
  })
})
