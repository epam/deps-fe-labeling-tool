
import React from 'react'
import { shallow } from 'enzyme'
import { Option } from '@/models/Option'
import { Autocomplete } from '.'

describe('Component: Autocomplete', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      notFoundContent: 'not Found Content mock',
      onChange: jest.fn(),
      onFocus: jest.fn(),
      options: [new Option('test', 'test')],
      value: 'test',
      disabled: false
    }

    wrapper = shallow(<Autocomplete {...defaultProps} />)
  })

  it('should render correct layout according to props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should be rendered with the correct disabled value', () => {
    wrapper.setProps({
      ...defaultProps,
      disabled: true
    })

    expect(wrapper.props().disabled).toEqual(true)
  })
})
