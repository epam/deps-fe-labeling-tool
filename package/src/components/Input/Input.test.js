import React from 'react'
import { shallow } from 'enzyme'
import { Input } from './Input'

describe('Components: Input', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      className: 'input'
    }
    wrapper = shallow(<Input {...defaultProps} />)
  })

  it('should render Input with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
