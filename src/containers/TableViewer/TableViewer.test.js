
import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockTables } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { updateTables } from '@/actions/markup'
import { CellValue } from '@/models/Table'
import { TableViewer } from './TableViewer'

jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/markup', () => ({
  pageSelectedTablesSelector: jest.fn(() => mockTables)
}))
jest.mock('react-redux', () => mockReactRedux)
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((f) => f)
}))

const mockCellValue = [0, 0, 'Test content']

const mockNewCellData = [...mockCellValue, 'new Value']

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = TableViewer

describe('Component: TableViewer', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render TableViewer with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger updateTables with correct props when call saveData', () => {
    wrapper.props().children.props.saveData(mockNewCellData)
    expect(updateTables).nthCalledWith(1, defaultProps.currentPage, [{ ...defaultProps.selectedTables[0], values: [new CellValue(0, 0, 'new Value', 0.8)] }])
  })
})
