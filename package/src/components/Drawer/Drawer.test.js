import React from 'react'
import { shallow } from 'enzyme'
import { Drawer } from '.'

describe('Component: Drawer', () => {
  const wrapper = shallow(
    <Drawer>
      <div>children</div>
    </Drawer>
  )

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
