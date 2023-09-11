import { SidebarContent } from '@/enums/SidebarContent'

const markupObjectsFilterSelector = jest.fn(() => 'testMarkupFilter')

const assignToFieldsFilterSelector = jest.fn(() => 'mockFilter')

const expandedListKeysSelector = jest.fn(() => ['mockKey'])

const temporaryFieldsIndexesSelector = jest.fn(() => ({
  countryState: [2, 3, 4]
}))

const activeSidebarSelector = jest.fn(() => SidebarContent.MARKUP)

const mockUiSelectors = {
  expandedListKeysSelector,
  markupObjectsFilterSelector,
  assignToFieldsFilterSelector,
  temporaryFieldsIndexesSelector,
  activeSidebarSelector
}

export {
  mockUiSelectors
}
