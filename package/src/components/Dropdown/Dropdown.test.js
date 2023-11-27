
import React from 'react'
import { shallow } from 'enzyme'
import { Dropdown } from '.'

describe('Component: Dropdown', () => {
  const wrapper = shallow(<Dropdown />)

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
