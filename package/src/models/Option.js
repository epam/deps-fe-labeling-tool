import PropTypes from 'prop-types'

class Option {
  constructor (value, text, disabled) {
    this.value = value
    this.text = text || value
    this.disabled = disabled
  }
}

const optionShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  disabled: PropTypes.bool
})

export {
  Option,
  optionShape
}
