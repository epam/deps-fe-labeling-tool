import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import {
  addAreas,
  removeAreas,
  selectAreas,
  updateAreas
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { useAreas } from '@/containers/LabelingCanvas/useAreas'
import { SidebarContent } from '@/enums/SidebarContent'
import { Area } from '@/models/Area'
import { Label } from '@/models/Label'
import { Rectangle } from '@/models/Rectangle'
import {
  pageSelectedAreasSelector,
  pageAreasSelector
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

const mockLabel = new Label(1, 2, 3, 4)
const mockArea = new Area(1, 2, 3, 4)
const mockAreas = [mockArea]
const mockObjects = [mockLabel, mockArea]

describe('Hook: useAreas', () => {
  let hookApi

  beforeEach(() => {
    hookApi = useAreas()
  })

  it('should call currentPageSelector', () => {
    expect(currentPageSelector).toHaveBeenCalled()
  })

  it('should call pageAreasSelector', () => {
    expect(pageAreasSelector).toHaveBeenCalled()
  })

  it('should return areas equal to data of pageAreasSelector', () => {
    expect(hookApi.areas).toEqual(pageAreasSelector())
  })

  it('should call selectedAreasSelector', () => {
    expect(pageSelectedAreasSelector).toHaveBeenCalled()
  })

  it('should return selectedAreas equal to data of pageSelectedAreasSelector', () => {
    expect(hookApi.selectedAreas).toEqual(pageSelectedAreasSelector())
  })

  it('should call addAreas action with correct page and areas', () => {
    const rect = new Rectangle(1, 2, 3, 4)
    hookApi.createAreas(rect)
    const expectedArea = Area.fromRectangle(rect)
    expectedArea.uid = String(+expectedArea.uid - 1)
    const currentPage = currentPageSelector()
    expect(addAreas).nthCalledWith(1, currentPage, [expectedArea])
  })

  it('should call removeAreas action with correct page and areas', () => {
    hookApi.deleteAreas(mockAreas)
    const currentPage = currentPageSelector()
    expect(removeAreas).nthCalledWith(1, currentPage, mockAreas)
  })

  it('should call selectAreas action with correct page and areas', () => {
    hookApi.selectAreas(mockObjects)
    const currentPage = currentPageSelector()
    mockReactRedux.batch(() => {
      expect(selectAreas).nthCalledWith(1, currentPage, mockAreas)
    })
  })

  it('should call setActiveSidebar action with correct value', () => {
    hookApi.selectAreas(mockObjects)

    mockReactRedux.batch(() => {
      expect(setActiveSidebar).nthCalledWith(1, SidebarContent.MARKUP)
    })
  })

  it('should not call setActiveSidebar action with correct value if active sidebar is equal to "Markup"', () => {
    activeSidebarSelector.mockImplementationOnce(() => SidebarContent.MARKUP)
    hookApi.selectAreas(mockObjects)
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should not call selectAreas in case selected areas are the same as incoming', () => {
    pageSelectedAreasSelector.mockImplementation(() => [mockArea])
    const hookApi = useAreas()
    hookApi.selectAreas([mockArea])
    mockReactRedux.batch(() => {
      expect(selectAreas).not.toHaveBeenCalled()
    })
  })

  it('should not call setActiveSidebar action in case selected areas are the same as incoming', () => {
    pageSelectedAreasSelector.mockImplementation(() => [mockArea])
    const hookApi = useAreas()
    hookApi.selectAreas([mockArea])
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should call updateAreas action with correct page and areas', () => {
    hookApi.updateAreas(mockAreas)
    const currentPage = currentPageSelector()
    expect(updateAreas).nthCalledWith(1, currentPage, mockAreas)
  })

  it('should not call updateAreas action in case no areas to update', () => {
    hookApi.updateAreas([])
    expect(updateAreas).not.toHaveBeenCalled()
  })
})
