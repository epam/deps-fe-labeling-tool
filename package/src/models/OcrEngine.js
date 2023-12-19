import PropTypes from 'prop-types'

class OcrEngine {
  constructor (code, name) {
    this.code = code
    this.name = name
  }
}

const ocrEngineShape = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
})

export {
  ocrEngineShape,
  OcrEngine
}
