import React from 'react'
import { Slider as AntdSlider } from 'antd'
import { shallow } from 'enzyme'
import { SliderButton } from './Slider.styles'
import { Slider } from './'

describe('Component: Slider', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      min: 1,
      max: 10,
      step: 1,
      value: 5,
      valuePrefix: 'testValuePrefix',
      onChange: jest.fn(),
      disabled: true
    }

    wrapper = shallow(<Slider {...defaultProps} />)
  })

  it('Slider renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call props.onChange with correct value when calling to Button minus', () => {
    wrapper.find(SliderButton).at(0).props().onClick()
    expect(defaultProps.onChange).nthCalledWith(1, 4)
  })

  it('should call props.onChange with correct value when calling to Button plus', () => {
    wrapper.find(SliderButton).at(1).props().onClick()
    expect(defaultProps.onChange).nthCalledWith(1, 6)
  })

  it('should not call props.onChange if value > max', () => {
    wrapper.find(AntdSlider).props().onChange(20)
    expect(defaultProps.onChange).not.toBeCalled()
  })

  it('should not call props.onChange if !value', () => {
    wrapper.find(AntdSlider).props().onChange(0)
    expect(defaultProps.onChange).not.toBeCalled()
  })

  it('should not call props.onChange if value < min', () => {
    wrapper.find(AntdSlider).props().onChange(0.5)
    expect(defaultProps.onChange).not.toBeCalled()
  })

  it('should call props onChange with correct value when calling to Slider onChange with value in the range of max and min', () => {
    wrapper.find(AntdSlider).props().onChange(5)
    expect(defaultProps.onChange).nthCalledWith(1, 5)
  })

  it('should return value with postfix when calling to formatter', () => {
    wrapper.setProps({ ...defaultProps, valuePrefix: 'test' })
    expect(wrapper.find(AntdSlider).props().tipFormatter(5)).toBe('5test')
  })

  it('should return undefined when the arg passed to the method cannot be converted to a number', () => {
    wrapper.setProps({ ...defaultProps, valuePrefix: 'test' })
    expect(wrapper.find(AntdSlider).props().tipFormatter(false)).toBe(undefined)
  })

  it('should plus SliderButton disabled = true when value >= max', () => {
    wrapper.setProps({ ...defaultProps, disabled: false, value: 15, max: 5 })
    expect(wrapper.find(SliderButton).at(1).props().disabled).toBe(true)
  })

  it('should minus SliderButton disabled = true when value <= min', () => {
    wrapper.setProps({ ...defaultProps, disabled: false, value: 0, min: 1 })
    expect(wrapper.find(SliderButton).at(0).props().disabled).toBe(true)
  })

  it('should be passed correct props from AntdSlider', () => {
    expect(wrapper.find(AntdSlider).props().onChange).toBe(wrapper.instance().onChange)
    expect(wrapper.find(AntdSlider).props().tipFormatter).toBe(wrapper.instance().formatter)
  })
})
