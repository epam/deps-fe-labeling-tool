import React from 'react'
import { shallow } from 'enzyme'
import { stringsToOptions } from '@/components/Select'
import { FormField } from './FormField'
import { FormFieldType } from './FormFieldType'

const mockFieldProps = {
  placeholder: 'mockText',
  onChange: jest.fn()
}

describe('Component: FormField', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      render: jest.fn((props) => <input {...props} />),
      ...mockFieldProps
    }

    wrapper = shallow(<FormField {...defaultProps} />)
  })

  it('should render component correctly in case render was passed as a default prop', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call render props with correct argument', () => {
    expect(defaultProps.render).nthCalledWith(1, mockFieldProps)
  })

  it('should render correct layout for each field type', () => {
    const options = stringsToOptions(['mock'])
    for (const fieldType of Object.values(FormFieldType)) {
      wrapper = shallow(
        <FormField
          type={fieldType}
          {...mockFieldProps}
          {...(fieldType === FormFieldType.ENUM && { options })}
        />
      )
      expect(wrapper).toMatchSnapshot()
    }
  })
})
