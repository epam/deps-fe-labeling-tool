
import { useCallback } from 'react'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { renderHook } from '@testing-library/react-hooks'
import { useAutoSave } from '@/containers/SaveDropdown/useAutoSave'
import { Feature } from '@/enums/Feature'
import { DEFAULT_AUTO_SAVE_INTERVAL_MS } from '@/models/Settings'
import { modifiedObjectsSelector } from '@/selectors/markup'
import { settingsSelector } from '@/selectors/settings'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

let mockCancelPreviousAutoSave, mockOnUnmount

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((f) => f),
  useEffect: jest.fn((f) => {
    mockOnUnmount = f()
  })
}))

describe('Hook: useAutoSave', () => {
  const mockSaveCallback = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  it('should call settingsSelector once', () => {
    renderHook(() => useAutoSave(mockSaveCallback))
    expect(settingsSelector).toHaveBeenCalledTimes(1)
  })

  it('should call modifiedObjectsSelector once', () => {
    renderHook(() => useAutoSave(mockSaveCallback))
    expect(modifiedObjectsSelector).toHaveBeenCalledTimes(1)
  })

  it('should return correct value', () => {
    useCallback.mockImplementationOnce((f) => {
      mockCancelPreviousAutoSave = f
      return f
    })
    const { result } = renderHook(() => useAutoSave(mockSaveCallback))
    expect(result.current).toEqual(mockCancelPreviousAutoSave)
  })

  it('should call provided save callback after in case interval is provided with feature', () => {
    const interval = 10_000
    modifiedObjectsSelector.mockReturnValueOnce(['uid'])
    settingsSelector.mockReturnValueOnce({
      features: [{
        code: Feature.AUTO_SAVE,
        data: {
          interval
        }
      }]
    })
    const TEST_INTERVAL_STEP = 6_000
    renderHook(() => useAutoSave(mockSaveCallback))
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_INTERVAL_STEP)
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_INTERVAL_STEP)
    expect(mockSaveCallback).toBeCalled()
  })

  it('should call provided save callback after default interval in case interval is not provided with feature', () => {
    modifiedObjectsSelector.mockReturnValueOnce(['uid'])
    const TEST_QUARTER_INTERVAL_STEP = DEFAULT_AUTO_SAVE_INTERVAL_MS / 4
    renderHook(() => useAutoSave(mockSaveCallback))
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_QUARTER_INTERVAL_STEP)
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_QUARTER_INTERVAL_STEP)
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_QUARTER_INTERVAL_STEP)
    expect(mockSaveCallback).not.toBeCalled()
    jest.advanceTimersByTime(TEST_QUARTER_INTERVAL_STEP)
    expect(mockSaveCallback).toBeCalled()
  })

  it('should not call neither setTimeout nor clearTimeout in case feature autosave is not provided', () => {
    settingsSelector.mockReturnValueOnce({
      features: []
    })
    const spyOnSetTimeout = jest.spyOn(global, 'setTimeout')
    const spyOnClearTimeout = jest.spyOn(global, 'clearTimeout')
    renderHook(() => useAutoSave(mockSaveCallback))
    jest.runAllTimers()
    expect(spyOnSetTimeout).not.toBeCalled()
    expect(spyOnClearTimeout).not.toBeCalled()
  })

  it('should not call neither setTimeout nor clearTimeout in case no modified objects', () => {
    modifiedObjectsSelector.mockReturnValueOnce(null)
    const spyOnSetTimeout = jest.spyOn(global, 'setTimeout')
    const spyOnClearTimeout = jest.spyOn(global, 'clearTimeout')
    renderHook(() => useAutoSave(mockSaveCallback))
    jest.runAllTimers()
    expect(spyOnSetTimeout).not.toBeCalled()
    expect(spyOnClearTimeout).not.toBeCalled()
  })

  it('should call clearTimeout once with correct timerId in case unmounting', () => {
    modifiedObjectsSelector.mockReturnValueOnce(['uid'])
    const mockSetTimeoutId = 'blah'
    jest.spyOn(global, 'setTimeout').mockImplementationOnce((f) => {
      f()
      return mockSetTimeoutId
    })
    const spyOnClearTimeout = jest.spyOn(global, 'clearTimeout')
    renderHook(() => useAutoSave(mockSaveCallback))
    mockOnUnmount()
    expect(spyOnClearTimeout).nthCalledWith(1, mockSetTimeoutId)
  })
})
