import { api } from '@/config/api'
import { documentForLabeling } from '@/config/document'
import { events } from '@/config/events'
import { markup } from '@/config/markup'
import { fields } from '@/config/model'
import { ocr } from '@/config/ocr'
import { settings } from '@/config/settings'
import { Config } from 'labeling-tool/lib/models/Config'

const SHIM_CONFIG = new Config(
  documentForLabeling,
  fields,
  ocr,
  api,
  markup,
  settings,
  events
)

export {
  SHIM_CONFIG
}
