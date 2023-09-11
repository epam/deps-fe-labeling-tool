import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import {
  addLabels,
  removeLabels,
  selectLabels,
  updateLabels
} from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { useLabels } from '@/containers/LabelingCanvas/useLabels'
import { SidebarContent } from '@/enums/SidebarContent'
import { Area } from '@/models/Area'
import { Label } from '@/models/Label'
import { Rectangle } from '@/models/Rectangle'
import {
  pageSelectedLabelsSelector,
  pageLabelsSelector
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
const mockLabels = [mockLabel]
const mockObjects = [mockLabel, mockArea]

describe('Hook: useLabels', () => {
  let hookApi

  beforeEach(() => {
    hookApi = useLabels()
  })

  it('should call currentPageSelector', () => {
    expect(currentPageSelector).toHaveBeenCalled()
  })

  it('should call pageLabelsSelector', () => {
    expect(pageLabelsSelector).toHaveBeenCalled()
  })

  it('should return labels equal to data of pageLabelsSelector', () => {
    expect(hookApi.labels).toEqual(pageLabelsSelector())
  })

  it('should call selectedLabelsSelector', () => {
    expect(pageSelectedLabelsSelector).toHaveBeenCalled()
  })

  it('should return selectedLabels equal to data of pageSelectedLabelsSelector', () => {
    expect(hookApi.selectedLabels).toEqual(pageSelectedLabelsSelector())
  })

  it('should call addLabels action with correct page and labels', () => {
    const rect = new Rectangle(1, 2, 3, 4)
    hookApi.createLabels(rect)
    const expectedLabel = Label.fromRectangle(rect)
    expectedLabel.uid = String(+expectedLabel.uid - 1)
    const currentPage = currentPageSelector()
    expect(addLabels).nthCalledWith(1, currentPage, [expectedLabel])
  })

  it('should call removeLabels action with correct page and labels', () => {
    hookApi.deleteLabels(mockLabels)
    const currentPage = currentPageSelector()
    expect(removeLabels).nthCalledWith(1, currentPage, mockLabels)
  })

  it('should call selectLabels action with correct page and labels', () => {
    hookApi.selectLabels(mockObjects)
    const currentPage = currentPageSelector()
    mockReactRedux.batch(() => {
      expect(selectLabels).nthCalledWith(1, currentPage, mockLabels)
    })
  })

  it('should call setActiveSidebar action with correct value', () => {
    hookApi.selectLabels(mockObjects)
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).nthCalledWith(1, SidebarContent.MARKUP)
    })
  })

  it('should not call setActiveSidebar action with correct value if active sidebar is equal to "Markup"', () => {
    activeSidebarSelector.mockImplementationOnce(() => SidebarContent.MARKUP)
    hookApi.selectLabels(mockObjects)
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should not call selectLabels in case selected labels are the same as incoming', () => {
    const mockLabel = new Label(3, 3, 3, 3)
    pageSelectedLabelsSelector.mockImplementation(() => [mockLabel])
    const hookApi = useLabels()
    hookApi.selectLabels([mockLabel])
    mockReactRedux.batch(() => {
      expect(selectLabels).not.toHaveBeenCalled()
    })
  })

  it('should not call setActiveSidebar action in case selected labels are the same as incoming', () => {
    pageSelectedLabelsSelector.mockImplementation(() => [mockLabel])
    const hookApi = useLabels()
    hookApi.selectLabels([mockLabel])
    mockReactRedux.batch(() => {
      expect(setActiveSidebar).not.toHaveBeenCalled()
    })
  })

  it('should call updateLabels action with correct page and labels', () => {
    hookApi.updateLabels(mockLabels)
    const currentPage = currentPageSelector()
    expect(updateLabels).nthCalledWith(1, currentPage, mockLabels)
  })

  it('should not call updateLabels action in case no labels to update', () => {
    hookApi.updateLabels([])
    expect(updateLabels).not.toHaveBeenCalled()
  })
})
