import { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Feature } from '@/enums/Feature'
import { DEFAULT_AUTO_SAVE_INTERVAL_MS } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { getApi } from '@/services/api'
import { childrenShape } from '@/utils/propTypes'
import { replaceAll } from '@/utils/string'

const RESOURCE_AUTO_SAVE_NOTIFICATION_1 =
   'Please be aware, autosaving occurs every {0} minutes'

const FeatureUserNotifier = ({ children }) => {
  const settings = useSelector(settingsSelector)

  const autoSaveNotify = (autoSaveFeature) => {
    const interval =
       autoSaveFeature?.data?.interval ?? DEFAULT_AUTO_SAVE_INTERVAL_MS
    const minutes = interval / 1000 / 60
    getApi().notify?.success?.(
      replaceAll(RESOURCE_AUTO_SAVE_NOTIFICATION_1, minutes)
    )
  }

  const notifyUser = useCallback(() => {
    const autoSaveFeature = settings.features?.find(
      (f) => f.code === Feature.AUTO_SAVE
    )
    autoSaveFeature && autoSaveNotify(autoSaveFeature)
  }, [settings.features])

  useEffect(() => {
    notifyUser()
  }, [notifyUser, settings])

  return children
}

FeatureUserNotifier.propTypes = {
  children: childrenShape.isRequired
}

export { FeatureUserNotifier }
