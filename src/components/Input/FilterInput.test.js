import React from 'react'
import { shallow } from 'enzyme'
import { Input } from '@/components/Input'
import { FilterInput } from './FilterInput'
import { CloseOutlinedIcon } from './FilterInput.styles.js'

describe('Components: FilterInput', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      className: 'input',
      placeholder: 'placeholder',
      value: 'filter string',
      onChange: jest.fn()
    }

    wrapper = shallow(<FilterInput {...defaultProps} />)
  })

  it('should render FilterInput with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onChange with correct args on onInputChange', () => {
    wrapper.find(Input).props().onChange({ target: { value: 'foo' } })
    expect(defaultProps.onChange).toHaveBeenCalledWith({ target: { value: 'foo' }, value: 'foo' })
  })

  it('should call onChange on onClose', () => {
    wrapper.find(CloseOutlinedIcon).props().onClick()
    expect(defaultProps.onChange).toHaveBeenCalled()
  })
})
