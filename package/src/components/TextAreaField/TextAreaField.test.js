import React from 'react'
import { shallow } from 'enzyme'
import { TextAreaField } from '.'

describe('Component: TextAreaField', () => {
  let defaultProps, wrapper

  beforeEach(() => {
    defaultProps = {
      onChange: jest.fn(),
      value: 'TextAreaField',
      disabled: false
    }

    wrapper = shallow(<TextAreaField {...defaultProps} />)
  })

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
