import React from 'react'
import { shallow } from 'enzyme'
import { ObjectTitle } from '.'

const mockTitle = 'Coordinates'

describe('Component: ObjectTitle', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      title: mockTitle
    }

    wrapper = shallow(<ObjectTitle {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
