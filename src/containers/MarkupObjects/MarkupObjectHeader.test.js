import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import { shallow } from 'enzyme'
import { SidebarContent } from '@/enums/SidebarContent'
import { Tool } from '@/enums/Tool'
import { LabelType } from '@/models/Label'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { TextWrapper } from './MarkupObjectHeader.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/components/TextHighlighter', () => mockComponent('TextHighlighter'))
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/tools', () => mockToolsSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)

const mockObjectPage = 1

const {
  WrappedComponent,
  mapStateToProps
} = MarkupObjectHeader

describe('Component: MarkupObjectHeader', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedProps = {
        markupObjectFilter: mockUiSelectors.markupObjectsFilterSelector(),
        currentPage: mockPaginationSelectors.currentPageSelector(),
        selectedTool: mockToolsSelectors.selectedToolSelector(),
        selectedLabels: [mockMarkupSelectors.markupSelector()[mockObjectPage].labels[0]],
        selectedTables: []
      }

      expect(props).toEqual(expectedProps)
    })
  })

  describe('component', () => {
    let defaultProps, wrapper

    beforeEach(() => {
      defaultProps = {
        name: 'test_name',
        page: 1,
        unassigned: true,
        type: LabelType.KEY,
        markupObjectFilter: 'test_markup',
        onHeaderClick: jest.fn(),
        currentPage: 1,
        clearSelection: jest.fn(),
        openPage: jest.fn(),
        changeTool: jest.fn(),
        selectedTool: Tool.GRABBING,
        selectedLabels: [],
        selectedTables: [],
        setActiveSidebar: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call setActiveSidebar prop when onClick event was fired', () => {
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.setActiveSidebar).nthCalledWith(1, SidebarContent.MARKUP)
    })

    it('should call onHeaderClick prop when onClick event was fired', () => {
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.onHeaderClick).toHaveBeenCalled()
    })

    it('should not call clearSelection prop when onClick event was fired if there no selectedLabels or selectedTables', () => {
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.clearSelection).toHaveBeenCalledTimes(0)
    })

    it('should call clearSelection prop when onClick event was fired if there are selectedLabels or selectedTables', () => {
      wrapper.setProps({
        ...defaultProps,
        selectedLabels: [mockMarkupSelectors.markupSelector()[mockObjectPage].labels[0]]
      })
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.clearSelection).nthCalledWith(1, defaultProps.currentPage)
    })

    it('should call openPage prop when onClick event was fired and current page differs from object page', () => {
      wrapper.setProps({
        ...defaultProps,
        currentPage: 2
      })
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.openPage).nthCalledWith(1, defaultProps.page)
    })

    it('should call changeTool prop if selectedTool is not equal to pointer when onClick event was fired', () => {
      const textWrapperProps = wrapper.find(TextWrapper).props()
      textWrapperProps.onClick()
      expect(defaultProps.changeTool).nthCalledWith(1, Tool.POINTER)
    })
  })
})
