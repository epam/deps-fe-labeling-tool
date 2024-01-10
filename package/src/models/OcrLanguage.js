
import PropTypes from 'prop-types'
import { KnownLanguage } from '@/enums/KnownLanguage'

class OcrLanguage {
  constructor (code, name) {
    this.name = name
    this.code = code
  }
}

const ocrLanguageShape = PropTypes.shape({
  code: PropTypes.oneOf(
    Object.values(KnownLanguage)
  ),
  name: PropTypes.string
})

export {
  OcrLanguage,
  ocrLanguageShape
}
