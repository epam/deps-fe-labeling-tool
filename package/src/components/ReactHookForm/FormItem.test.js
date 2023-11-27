import { mockReactHookForm } from '@/mocks/mockReactHookForm'
import React from 'react'
import { shallow } from 'enzyme'
import { useController } from 'react-hook-form'
import { FormFieldType } from './FormFieldType'
import { FormItem } from './FormItem'
import { ErrorMessage, Wrapper } from './FormItem.styles'
import { RequiredValidator } from './Validators'

jest.mock('react-hook-form', () => mockReactHookForm)

describe('Component: FormItem', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      label: 'mockLabel',
      requiredMark: true,
      field: {
        code: 'mockName',
        defaultValue: 'defaultValue',
        rules: new RequiredValidator(),
        label: 'mockLabel',
        type: FormFieldType.STRING,
        handler: {
          onChange: jest.fn()
        }
      }
    }

    wrapper = shallow(<FormItem {...defaultProps} />)
  })

  it('should render FormItem with default props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render error message in case of field error', () => {
    const error = 'mockError'
    useController.mockImplementationOnce(() => ({
      field: {},
      fieldState: { error: { message: error } }
    }))
    wrapper = shallow(<FormItem {...defaultProps} />)
    expect(wrapper.find(ErrorMessage).text().includes(error)).toBe(true)
    expect(wrapper.find(Wrapper).props().hasError).toBe(true)
  })

  it('should render children component correctly', () => {
    wrapper.setProps({
      name: 'mockName',
      children: <textarea />
    })

    expect(wrapper).toMatchSnapshot()
  })
})
