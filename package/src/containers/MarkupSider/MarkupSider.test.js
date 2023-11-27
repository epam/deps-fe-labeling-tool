import React from 'react'
import { shallow } from 'enzyme'
import { MarkupSider } from '@/containers/MarkupSider'
import { SidebarContent } from '@/enums/SidebarContent'

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

const { WrappedComponent } = MarkupSider

describe('Container: MarkupSider', () => {
  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      setMarkupSiderWidth: jest.fn(),
      activeSidebar: SidebarContent.MARKUP,
      width: 1500,
      registerHandlers: jest.fn()
    }

    jest.clearAllMocks()
    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should return null when prop.width is 0', () => {
    wrapper.setProps({ ...defaultProps, width: 0 })
    expect(wrapper.props()).toEqual({})
  })

  it('should call props registerHandlers when component is mounted', () => {
    expect(defaultProps.registerHandlers).nthCalledWith(1, { COLLAPSE_EXPAND_SIDERS: expect.any(Function) })
  })
})
