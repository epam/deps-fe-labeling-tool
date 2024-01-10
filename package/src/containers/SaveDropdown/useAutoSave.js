
import { useMemo, useCallback, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Feature } from '@/enums/Feature'
import { ModifiedObjects } from '@/models/ModifiedObjects'
import { DEFAULT_AUTO_SAVE_INTERVAL_MS } from '@/models/Settings'
import { modifiedObjectsSelector } from '@/selectors/markup'
import { settingsSelector } from '@/selectors/settings'

const useAutoSave = (saveCallback) => {
  const timerId = useRef(null)
  const settings = useSelector(settingsSelector)
  const modifiedObjects = useSelector(modifiedObjectsSelector)

  const cancelPreviousAutoSave = useCallback(() => {
    timerId.current && clearTimeout(timerId.current)
  }, [])

  const autoSaveFeature = useMemo(() => settings.features?.find((f) => f.code === Feature.AUTO_SAVE), [settings.features])

  const saveByTimeout = useCallback(() => {
    const interval = autoSaveFeature?.data?.interval ?? DEFAULT_AUTO_SAVE_INTERVAL_MS

    timerId.current = setTimeout(() => {
      saveCallback()
    }, interval)
  }, [autoSaveFeature?.data?.interval, saveCallback])

  useEffect(() => {
    if (!autoSaveFeature) {
      return
    }

    if (!ModifiedObjects.isModified(modifiedObjects)) {
      return
    }

    cancelPreviousAutoSave()
    saveByTimeout()
  }, [saveByTimeout, autoSaveFeature, modifiedObjects, cancelPreviousAutoSave])

  useEffect(() => () => {
    cancelPreviousAutoSave()
  }, [cancelPreviousAutoSave])

  return cancelPreviousAutoSave
}

export { useAutoSave }
