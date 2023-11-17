import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { shallow } from 'enzyme'
import { TableDataSidebar } from '@/containers/TableDataSidebar'

jest.mock('@/containers/TableData', () => mockComponent('TableData'))

describe('Component: TableDataSidebar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TableDataSidebar />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
