import {
  setMarkupObjectsFilter,
  setExpandedListKeys,
  toggleExpandedListKey,
  addTemporaryFieldIndex,
  setAssignToFieldsFilter,
  deleteTemporaryFieldIndex,
  resetDefault
} from './ui'

const mockFilter = 'mock'
const mockFieldIndex = { code: 'test', index: 0 }

describe('Actions: ui', () => {
  it('should create setExpandedListKeys action with correct type and payload', () => {
    const mockKey = 'mock_key'
    const action = setExpandedListKeys(mockKey)
    expect(action).toEqual({
      type: setExpandedListKeys.toString(),
      payload: mockKey
    })
  })

  it('should create toggleExpandedListKey action with correct type and payload', () => {
    const mockKey = 'mock_key'
    const action = toggleExpandedListKey(mockKey)

    expect(action).toEqual({
      type: toggleExpandedListKey.toString(),
      payload: mockKey
    })
  })

  it('should create setMarkupObjectsFilter action with correct type and payload', () => {
    const action = setMarkupObjectsFilter(mockFilter)
    expect(action).toEqual({
      type: setMarkupObjectsFilter.toString(),
      payload: mockFilter
    })
  })

  it('should create setAssignToFieldsFilter action with correct type and payload', () => {
    const action = setAssignToFieldsFilter(mockFilter)
    expect(action).toEqual({
      type: setAssignToFieldsFilter.toString(),
      payload: mockFilter
    })
  })

  it('should create addTemporaryFieldIndex action with correct type and payload', () => {
    const action = addTemporaryFieldIndex(mockFieldIndex)
    expect(action).toEqual({
      type: addTemporaryFieldIndex.toString(),
      payload: mockFieldIndex
    })
  })

  it('should create deleteTemporaryFieldIndex action with correct type and payload', () => {
    const action = deleteTemporaryFieldIndex(mockFieldIndex)
    expect(action).toEqual({
      type: deleteTemporaryFieldIndex.toString(),
      payload: mockFieldIndex
    })
  })

  it('should create resetDefault action with correct type', () => {
    const action = resetDefault()
    expect(action).toEqual({
      type: resetDefault.toString()
    })
  })
})
