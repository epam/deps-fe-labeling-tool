import { SidebarContent } from '@/enums/SidebarContent'
import {
  markupObjectsFilterSelector,
  expandedListKeysSelector,
  activeSidebarSelector,
  temporaryFieldsIndexesSelector,
  assignToFieldsFilterSelector
} from '@/selectors/ui'

const mockExpandedListKeys = ['mock_extended_key']

describe('Selectors: ui', () => {
  const defaultState = {
    ui: {
      markupObjectsFilter: 'test1',
      assignToFieldsFilter: 'test2',
      expandedListKeys: mockExpandedListKeys,
      activeSidebar: SidebarContent.MARKUP,
      temporaryFieldsIndexes: {
        countryState: [2]
      }
    }
  }

  it('should get markupObjectsFilter from state when using markupObjectsFilterSelector', () => {
    expect(markupObjectsFilterSelector(defaultState)).toBe('test1')
  })

  it('should get assignToFieldsFilter from state when using assignToFieldsFilterSelector', () => {
    expect(assignToFieldsFilterSelector(defaultState)).toBe('test2')
  })

  it('should get activeSidebar from state when using activeSidebarSelector', () => {
    expect(activeSidebarSelector(defaultState)).toBe('MARKUP')
  })

  it('should get expandedListKeys from state when using expandedListKeysSelector', () => {
    expect(expandedListKeysSelector(defaultState)).toBe(mockExpandedListKeys)
  })

  it('should get temporaryFieldsIndexes from state when using temporaryFieldsIndexesSelector', () => {
    expect(temporaryFieldsIndexesSelector(defaultState)).toStrictEqual(defaultState.ui.temporaryFieldsIndexes)
  })
})
