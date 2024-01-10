
import PropTypes from 'prop-types'

class HTColumn {
  constructor (data) {
    this.data = data
  }
}

const htColumnShape = PropTypes.shape({
  data: PropTypes.string.isRequired
})

export {
  HTColumn,
  htColumnShape
}
