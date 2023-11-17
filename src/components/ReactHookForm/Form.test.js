import React from 'react'
import { mockReactHookForm } from '@/mocks/mockReactHookForm'
import { shallow } from 'enzyme'
import { Form } from './Form'

jest.mock('react-hook-form', () => mockReactHookForm)

describe('Component: Form', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      children: <input />,
      onSubmit: jest.fn(),
      handleSubmit: jest.fn()
    }

    wrapper = shallow(<Form {...defaultProps} />)
  })

  it('should render correct Form layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call handleSubmit with correct props when form is submitted', () => {
    wrapper.find('form').simulate('submit')
    expect(defaultProps.handleSubmit).nthCalledWith(1, defaultProps.onSubmit)
  })
})
