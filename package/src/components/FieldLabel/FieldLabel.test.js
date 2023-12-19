import React from 'react'
import { shallow } from 'enzyme'
import { FieldLabel } from './FieldLabel'
import { StyledTooltip } from './FieldLabel.styles'

describe('Component: FieldLabel', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      active: false,
      clickable: true,
      onClick: jest.fn(),
      name: 'Label :',
      required: true,
      className: 'test-class'
    }

    wrapper = shallow(<FieldLabel {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass correct properties to the component', () => {
    expect(wrapper.props().active).toBe(defaultProps.active)
    expect(wrapper.props().clickable).toBe(defaultProps.clickable)
    expect(wrapper.props().className).toBe(defaultProps.className)
  })

  it('should not render tooltip if field is not required', () => {
    defaultProps.required = false

    wrapper = shallow(<FieldLabel {...defaultProps} />)

    expect(wrapper.find(StyledTooltip).exists()).toBe(false)
  })
})
