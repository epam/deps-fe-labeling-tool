import React from 'react'
import { shallow } from 'enzyme'
import { LeftSidebar } from '@/containers/LeftSidebar'

describe('Container: LeftSidebar', () => {
  let defaultProps, wrapper

  beforeEach(() => {
    defaultProps = {
      height: 123
    }

    wrapper = shallow(<LeftSidebar {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
