import React from 'react'
import { shallow } from 'enzyme'
import { Checkbox } from './Checkbox'

const mockOnChange = jest.fn()

describe('Component: Checkbox', () => {
  let wrapper
  let defaultProps

  beforeEach(() => {
    jest.clearAllMocks()

    defaultProps = {
      onChange: mockOnChange,
      value: false
    }

    wrapper = shallow(<Checkbox {...defaultProps} />)
  })

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onChange with the correct value', () => {
    const mockedEvent = { target: { value: true } }
    wrapper.simulate('change', mockedEvent)

    expect(mockOnChange).nthCalledWith(1, mockedEvent)
  })

  it('passes checked value to AntdCheckbox', () => {
    wrapper.setProps({
      ...defaultProps,
      value: true
    })

    expect(wrapper.props().checked).toBe(true)
  })
})
