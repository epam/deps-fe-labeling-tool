import { mockReactHookForm } from '@/mocks/mockReactHookForm'
import React from 'react'
import { shallow } from 'enzyme'
import { useWatch } from 'react-hook-form'
import { FormItem } from '@/components/ReactHookForm'
import { FieldType } from '@/enums/FieldType'
import { AddFieldForm, FIELDS_CODE } from './AddFieldForm'

const mockSetValue = jest.fn()
const mockFieldCode = 'code'
const mockValue = 'test'

jest.mock('react-hook-form', () => ({
  ...mockReactHookForm,
  useFormContext: jest.fn(() => ({
    control: {},
    setValue: mockSetValue
  }))
}))

describe('Component: AddFieldForm', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddFieldForm />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render layout correctly for list of enums', () => {
    useWatch
      .mockImplementationOnce(() => FieldType.LIST)
      .mockImplementationOnce(() => FieldType.ENUM)

    wrapper = shallow(<AddFieldForm />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should call setValue if onChange event is triggered on field with code "name"', () => {
    const mockEvent = {
      target: {
        value: mockValue
      }
    }

    const FormComponent = wrapper.find(FormItem).at(0)
    FormComponent.props().field.handler.onChange(mockEvent)

    expect(mockSetValue).nthCalledWith(1, mockFieldCode, mockValue, { shouldValidate: true })
  })

  it('should render "Options" field if fieldType is Enum', () => {
    useWatch
      .mockImplementationOnce(() => FieldType.ENUM)

    wrapper = shallow(<AddFieldForm />)

    expect(wrapper.find(FormItem).at(4).props().field.code).toBe(FIELDS_CODE.options)
  })
})
