import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import {
  addTables,
  removeTables,
  selectTables,
  updateTables
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { useTables } from '@/containers/LabelingCanvas/useTables'
import { SidebarContent } from '@/enums/SidebarContent'
import { Rectangle } from '@/models/Rectangle'
import { Table } from '@/models/Table'
import {
  pageSelectedTablesSelector,
  pageTablesSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { activeSidebarSelector } from '@/selectors/ui'

const mockActiveSidebar = SidebarContent.TABLE_DATA

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((f) => f)
}))
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/ui', () => ({
  activeSidebarSelector: jest.fn(() => mockActiveSidebar)
}))
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/ui', () => mockUiActions)

const mockTable = new Table([0.45, 0.765], [8.234, 9.564])
const mockTables = [mockTable]

describe('Hook: useTables', () => {
  let hookApi

  beforeEach(() => {
    hookApi = useTables()
  })

  it('should call currentPageSelector', () => {
    expect(currentPageSelector).toHaveBeenCalled()
  })

  it('should call pageTablesSelector', () => {
    expect(pageTablesSelector).toHaveBeenCalled()
  })

  it('should return Tables equal to data of pageTablesSelector', () => {
    expect(hookApi.tables).toEqual(pageTablesSelector())
  })

  it('should call selectedTablesSelector', () => {
    expect(pageSelectedTablesSelector).toHaveBeenCalled()
  })

  it('should return selectedTables equal to data of pageSelectedTablesSelector', () => {
    expect(hookApi.selectedTables).toEqual(pageSelectedTablesSelector())
  })

  it('should call addTables action with correct page and tables when call createTables', () => {
    const rect = new Rectangle(1, 2, 3, 4)
    hookApi.createTables(rect)
    const expectedTable = Table.fromRectangle(rect)
    expectedTable.uid = String(+expectedTable.uid - 1)
    const currentPage = currentPageSelector()
    expect(addTables).nthCalledWith(1, currentPage, [expectedTable])
  })

  it('should call addTables action with correct page and tables when call addTables', () => {
    hookApi.addTables(mockTables)
    const currentPage = currentPageSelector()
    expect(addTables).nthCalledWith(1, currentPage, mockTables)
  })

  it('should call removeTables action with correct page and tables', () => {
    hookApi.deleteTables(mockTables)
    const currentPage = currentPageSelector()
    expect(removeTables).nthCalledWith(1, currentPage, mockTables)
  })

  it('should call selectTables action with correct page and tables', () => {
    hookApi.selectTables(mockTables)
    const currentPage = currentPageSelector()
    mockReactRedux.batch(() => {
      expect(selectTables).nthCalledWith(1, currentPage, mockTables)
    })
  })

  it('should call setActiveSidebar action with correct value', () => {
    hookApi.selectTables(mockTables)
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).nthCalledWith(1, SidebarContent.MARKUP)
    })
  })

  it('should not call setActiveSidebar action with correct value if active sidebar is equal to "Markup"', () => {
    activeSidebarSelector.mockImplementationOnce(() => SidebarContent.MARKUP)
    hookApi.selectTables(mockTables)
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should not call selectTables in case selected tables are the same as incoming', () => {
    pageSelectedTablesSelector.mockImplementation(() => [mockTable])
    const hookApi = useTables()
    hookApi.selectTables([mockTable])
    mockReactRedux.batch(() => {
      expect(selectTables).not.toHaveBeenCalled()
    })
  })

  it('should not call setActiveSidebar action in case selected tables are the same as incoming', () => {
    pageSelectedTablesSelector.mockImplementation(() => [mockTable])
    const hookApi = useTables()
    hookApi.selectTables([mockTable])
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should call updateTables action with correct page and tables', () => {
    hookApi.updateTables(mockTables)
    const currentPage = currentPageSelector()
    expect(updateTables).nthCalledWith(1, currentPage, mockTables)
  })

  it('should not call updateTables action in case no tables to update', () => {
    hookApi.updateTables([])
    expect(updateTables).not.toHaveBeenCalled()
  })
})
