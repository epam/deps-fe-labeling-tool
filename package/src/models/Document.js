import PropTypes from 'prop-types'
import { KnownLanguage } from '@/enums/KnownLanguage'

class Document {
  constructor (pages, language = null, name = '', engine = '', extraName = '') {
    this.pages = pages
    this.language = language
    this.name = name
    this.engine = engine
    this.extraName = extraName
  }
}

const documentShape = PropTypes.shape({
  language: PropTypes.oneOf(
    Object.values(KnownLanguage)
  ),
  pages: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  engine: PropTypes.string.isRequired,
  extraName: PropTypes.string
})

export {
  documentShape,
  Document
}
