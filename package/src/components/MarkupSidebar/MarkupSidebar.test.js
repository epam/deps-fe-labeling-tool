import React from 'react'
import { shallow } from 'enzyme'
import { MarkupSidebar } from '@/components/MarkupSidebar'

describe('Component: LeftSidebar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<MarkupSidebar />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
