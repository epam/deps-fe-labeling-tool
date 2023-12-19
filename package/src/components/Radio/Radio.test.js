import React from 'react'
import { shallow } from 'enzyme'
import { Option } from '@/models/Option'
import { Radio, RadioGroup } from './'

describe('Component: RadioGroup', () => {
  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      onChange: jest.fn(),
      options: [new Option('hello', 'world', false)]
    }
    wrapper = shallow(<RadioGroup {...defaultProps} />)
  })

  it('should render correct layout based on props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call props.onChange in case calling to RadioGroup onChange', () => {
    const mockEvent = {
      target: {
        value: 'hello world'
      }
    }
    const radioGroupProps = wrapper.props()
    radioGroupProps.onChange(mockEvent)
    expect(defaultProps.onChange).nthCalledWith(1, mockEvent.target.value)
  })
})

describe('Component: Radio', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Radio />)
  })

  it('should render correct layout based on props', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
