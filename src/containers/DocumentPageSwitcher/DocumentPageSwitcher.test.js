import React from 'react'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { openPage } from '@/actions/pagination'
import { DocumentPageSwitcher } from '@/containers/DocumentPageSwitcher/DocumentPageSwitcher'
import { SidebarContent } from '@/enums/SidebarContent'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)

jest.mock('@/actions/pagination', () => ({
  openPage: jest.fn()
}))

jest.mock('@/selectors/ui', () => ({
  activeSidebarSelector: jest.fn(() => 'TABLE_DATA')
}))

jest.mock('@/actions/ui', () => ({
  setActiveSidebar: jest.fn()
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = DocumentPageSwitcher

describe('Container: DocumentPageSwitcher', () => {
  describe('mapStateToProps', () => {
    it('should pass correct props to the wrapped component', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass openPage action as openPage prop', () => {
      const { props } = mapDispatchToProps()
      props.openPage()
      expect(openPage).toHaveBeenCalledTimes(1)
    })
  })

  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should function call to change page with expected params', () => {
    const desiredPage = 2

    wrapper.props().changeActivePage(desiredPage)
    expect(openPage).toHaveBeenCalledWith(desiredPage)
  })

  it('should call setActiveSidebar with correct argument once', () => {
    wrapper.props().changeActivePage()

    const { setActiveSidebar } = defaultProps
    expect(setActiveSidebar).nthCalledWith(1, SidebarContent.MARKUP)
  })
})
