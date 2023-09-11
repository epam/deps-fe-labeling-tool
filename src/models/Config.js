import PropTypes from 'prop-types'
import { documentShape } from '@/models/Document'
import { fieldShape } from '@/models/Field'
import { markupShape } from '@/models/Markup'
import { ocrEngineShape } from '@/models/OcrEngine'
import { ocrLanguageShape } from '@/models/OcrLanguage'
import { settingsShape } from '@/models/Settings'

class Config {
  constructor (document, fields, ocr, api, markup, settings, events) {
    this.document = document
    this.fields = fields
    this.ocr = ocr
    this.api = api
    this.markup = markup
    this.settings = settings
    this.events = events
  }
}

const ocrShape = PropTypes.shape({
  engines: PropTypes.arrayOf(ocrEngineShape),
  languages: PropTypes.arrayOf(ocrLanguageShape)
})

const apiShape = PropTypes.shape({
  close: PropTypes.func.isRequired,
  getImage: PropTypes.func,
  save: PropTypes.func.isRequired,
  saveMarkup: PropTypes.func,
  ocrTable: PropTypes.func,
  ocrText: PropTypes.func,
  addFieldForm: PropTypes.func
})

const eventsShape = PropTypes.shape({
  onClose: PropTypes.func
})

const configShape = PropTypes.shape({
  document: documentShape.isRequired,
  fields: PropTypes.arrayOf(fieldShape).isRequired,
  ocr: ocrShape,
  api: apiShape.isRequired,
  markup: markupShape,
  settings: settingsShape,
  events: eventsShape
})

export {
  apiShape,
  configShape,
  Config
}
