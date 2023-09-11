import * as React from 'react'
import { Select } from 'antd'
import { shallow } from 'enzyme'
import { Input } from '@/components/Input'
import { PaginationButton } from './PageSwitcher.styles'
import { PageSwitcher } from '.'

describe('Component: PageSwitcher', () => {
  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      className: 'test',
      pagesQuantity: 10,
      activePage: 2,
      changeActivePage: jest.fn(),
      disabled: false,
      pageOptions: [
        <Select.Option key={1}>1</Select.Option>,
        <Select.Option key={1}>2</Select.Option>
      ]
    }
    wrapper = shallow(<PageSwitcher {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call changeActivePage on nextPage call', () => {
    wrapper.find(PaginationButton).at(0).props().onClick()
    expect(defaultProps.changeActivePage).toHaveBeenCalled()
  })

  it('should call changeActivePage on prevPage call', () => {
    wrapper.find(PaginationButton).at(1).props().onClick()
    expect(defaultProps.changeActivePage).toHaveBeenCalled()
  })

  it('should call changeActivePage with correct arg on input value', () => {
    wrapper.find(Input.Numeric).props().onChange(4)
    expect(defaultProps.changeActivePage).toHaveBeenCalledWith(4)
  })

  it('should not call changeActivePage on incorrect input value', () => {
    const incorrectValuesInput = [0, defaultProps.pagesQuantity + 10, defaultProps.activePage]
    incorrectValuesInput.forEach((value) => {
      wrapper.find(Input.Numeric).props().onChange(value)
      expect(defaultProps.changeActivePage).not.toHaveBeenCalled()
    })
  })
})
