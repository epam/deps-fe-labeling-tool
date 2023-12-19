import React from 'react'
import { InputNumber } from 'antd'
import { shallow } from 'enzyme'
import { NumericInput } from './NumericInput'

describe('Components: NumericInput', () => {
  let defaultProps
  let wrapper
  let event

  const NOT_ALLOWED_TO_KEY_DOWN = [
    'Backspace',
    'Delete',
    'ArrowRight',
    'ArrowLeft'
  ]

  beforeEach(() => {
    defaultProps = {
      className: 'input',
      disabled: false,
      min: 1,
      max: 10,
      value: 5,
      onChange: jest.fn(),
      formatter: jest.fn()
    }

    event = {
      key: 'a',
      preventDefault: jest.fn()
    }

    wrapper = shallow(<NumericInput {...defaultProps} />)
  })

  it('should render NumericInput with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should change state.value on onChange', () => {
    wrapper.find(InputNumber).props().onChange(9)
    expect(wrapper.instance().state.value).toBe(9)
  })

  it('should call defaultProps.onChange func on onChange', () => {
    wrapper.find(InputNumber).props().onChange(9)
    expect(defaultProps.onChange).toHaveBeenCalled()
  })

  it('should not call defaultProps.onChange with invalid value', () => {
    const invaildValues = ['', null, NaN, defaultProps.min - 1, defaultProps.max + 10]
    const inputNumberProps = wrapper.find(InputNumber).props()
    invaildValues.forEach((value) => {
      inputNumberProps.onChange(value)
      expect(defaultProps.onChange).not.toHaveBeenCalled()
    })
  })

  it('should call preventDefault for onKeyDown', () => {
    wrapper.find(InputNumber).props().onKeyDown(event)
    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('should not call preventDefault for invalid key pressed', () => {
    NOT_ALLOWED_TO_KEY_DOWN.forEach((key) => {
      event.key = key
      wrapper.find(InputNumber).props().onKeyDown(event)
      expect(event.preventDefault).not.toHaveBeenCalled()
    })
  })
})
