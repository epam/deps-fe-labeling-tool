import PropTypes from 'prop-types'

const RESOURCE_ERROR_MESSAGE = {
  MAX_LENGTH: (length) => `The value should be no longer than ${length} characters.`,
  REQUIRED: 'The value is required.'
}

class MaxLengthValidator {
  constructor (
    value = 128,
    message = RESOURCE_ERROR_MESSAGE.MAX_LENGTH(value)
  ) {
    this.maxLength = {
      value: value,
      message: message
    }
  }
}

class RequiredValidator {
  constructor (message = RESOURCE_ERROR_MESSAGE.REQUIRED) {
    this.required = {
      value: true,
      message: message
    }
  }
}

class PatternValidator {
  constructor (value, message) {
    this.pattern = {
      value: value,
      message: message
    }
  }
}

const maxLengthValidatorShape = PropTypes.shape({
  maxLength: PropTypes.instanceOf({
    value: PropTypes.number,
    message: PropTypes.string
  })
})

const requiredValidatorShape = PropTypes.shape({
  isRequired: PropTypes.shape({
    value: PropTypes.bool,
    message: PropTypes.string
  })
})

const patternValidatorShape = PropTypes.shape({
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp),
    message: PropTypes.string
  })
})

export {
  MaxLengthValidator,
  RequiredValidator,
  PatternValidator,
  maxLengthValidatorShape,
  requiredValidatorShape,
  patternValidatorShape
}
