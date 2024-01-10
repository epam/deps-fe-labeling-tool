import { mockAction } from '@/mocks/mockAction'
import {
  setMarkupObjectsFilter,
  setExpandedListKeys,
  toggleExpandedListKey,
  setActiveSidebar,
  addTemporaryFieldIndex,
  setAssignToFieldsFilter,
  deleteTemporaryFieldIndex,
  resetDefault
} from '@/actions/ui'
import { SidebarContent } from '@/enums/SidebarContent'
import { uiReducer } from '@/reducers/ui'

describe('Reducer: ui', () => {
  let defaultState

  const state = {
    markupObjectsFilter: '',
    activeSidebar: SidebarContent.MARKUP,
    expandedListKeys: [],
    temporaryFieldsIndexes: {},
    assignToFieldsFilter: ''
  }

  const mockFilter = 'test'
  const mockFieldIndex = { code: 'test', index: 1 }
  const mockKey = 'mock_key'

  beforeEach(() => {
    defaultState = uiReducer(state, mockAction)
  })

  it('should create correct default state object', () => {
    expect(defaultState).toEqual(state)
  })

  it('should handle resetDefault action correctly', () => {
    const mockState = {
      ...state,
      assignToFieldsFilter: mockFilter,
      expandedListKeys: [mockKey],
      markupObjectsFilter: mockFilter
    }
    const action = resetDefault()

    expect(uiReducer(mockState, action)).toEqual(state)
  })

  it('should handle setMarkupObjectsFilter action correctly', () => {
    const action = setMarkupObjectsFilter(mockFilter)

    const afterActionState = {
      ...state,
      markupObjectsFilter: mockFilter
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle setAssignToFieldsFilter action correctly', () => {
    const action = setAssignToFieldsFilter(mockFilter)

    const afterActionState = {
      ...state,
      assignToFieldsFilter: mockFilter
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle setActiveSidebar action correctly', () => {
    const action = setActiveSidebar(SidebarContent.TABLE_DATA)

    const afterActionState = {
      ...state,
      activeSidebar: SidebarContent.TABLE_DATA
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle setExpandedListKeys action correctly', () => {
    const mockKeys = [mockKey]
    const action = setExpandedListKeys(mockKeys)

    const afterActionState = {
      ...state,
      expandedListKeys: mockKeys
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle toggleExpandedListKey action correctly', () => {
    const action = toggleExpandedListKey(mockKey)

    const afterActionState = {
      ...state,
      expandedListKeys: [mockKey]
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle addTemporaryFieldIndex action correctly', () => {
    const action = addTemporaryFieldIndex(mockFieldIndex)

    const afterActionState = {
      ...state,
      temporaryFieldsIndexes: {
        [mockFieldIndex.code]: [mockFieldIndex.index]
      }
    }

    expect(uiReducer(state, action)).toEqual(afterActionState)
  })

  it('should handle addTemporaryFieldIndex action correctly if fieldIndex is already exists', () => {
    const mockIndex = 0

    const beforeActionState = {
      ...state,
      temporaryFieldsIndexes: {
        [mockFieldIndex.code]: [mockIndex]
      }
    }
    const action = addTemporaryFieldIndex(mockFieldIndex)

    const afterActionState = {
      ...state,
      temporaryFieldsIndexes: {
        [mockFieldIndex.code]: [mockIndex, mockFieldIndex.index]
      }
    }

    expect(uiReducer(beforeActionState, action)).toEqual(afterActionState)
  })

  it('should handle deleteTemporaryFieldIndex action correctly', () => {
    state.temporaryFieldsIndexes.test = [1]

    const afterActionState = {
      ...state,
      temporaryFieldsIndexes: {
        [mockFieldIndex.code]: []
      }
    }

    const deleteAction = deleteTemporaryFieldIndex(mockFieldIndex)
    expect(uiReducer(state, deleteAction)).toEqual(afterActionState)
  })

  it('should handle deleteTemporaryFieldIndex action correctly if no temporaryFieldIndexes', () => {
    state.temporaryFieldsIndexes = {}

    const deleteAction = deleteTemporaryFieldIndex(mockFieldIndex)
    expect(uiReducer(state, deleteAction)).toEqual(state)
  })
})
