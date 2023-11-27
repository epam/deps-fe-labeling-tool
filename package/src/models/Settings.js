import PropTypes from 'prop-types'
import { Feature } from '@/enums/Feature'
import { Mode } from '@/enums/Mode'
import { Panel } from '@/enums/Panel'
import { SpecialSymbol } from '@/enums/SpecialSymbol'
import { Tool } from '@/enums/Tool'
import { SubSettings, subSettingsShape } from '@/models/SubSettings'

const DEFAULT_AUTO_SAVE_INTERVAL_MS = 180_000

const FEATURE_TO_SUB_SETTINGS = {
  [Feature.SPECIAL_SYMBOLS]: (
    new SubSettings(
      Feature.SPECIAL_SYMBOLS,
      Object.values(SpecialSymbol)
    )
  ),
  [Feature.PAGING]: (
    new SubSettings(
      Feature.PAGING,
      { initialPage: 1 }
    )
  ),
  [Feature.AUTO_SAVE]: (
    new SubSettings(
      Feature.AUTO_SAVE,
      { interval: DEFAULT_AUTO_SAVE_INTERVAL_MS }
    )
  )
}

const defaultLtFeatures = Object.values(Feature).map((f) => FEATURE_TO_SUB_SETTINGS[f] ?? f)

class Settings {
  constructor (
    mode = Mode.DEFAULT,
    panels = Object.values(Panel),
    tools = Object.values(Tool),
    features = defaultLtFeatures
  ) {
    this.mode = mode
    this.panels = panels
    this.tools = tools
    this.features = features
  }

  static has = (settings, code) => (
    !!Object.values(settings.panels).find((p) => p === code || p.code === code) ||
    !!Object.values(settings.tools).find((t) => t === code || t.code === code) ||
    !!Object.values(settings.features).find((f) => f === code || f.code === code)
  )
}

const settingsShape = PropTypes.shape({
  mode: PropTypes.oneOf(Object.values(Mode)),
  panels: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf(
        Object.values(Panel)
      ),
      subSettingsShape
    ])
  ),
  tools: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf(
        Object.values(Tool)
      ),
      subSettingsShape
    ])
  ),
  features: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf(
        Object.values(Feature)
      ),
      subSettingsShape
    ])
  )
})

export {
  DEFAULT_AUTO_SAVE_INTERVAL_MS,
  Settings,
  settingsShape
}
