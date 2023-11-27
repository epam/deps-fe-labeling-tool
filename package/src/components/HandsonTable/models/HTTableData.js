
import PropTypes from 'prop-types'

const rowOfPrimitivesShape = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ])
)

const rowsOfPrimitivesShape = PropTypes.arrayOf(
  rowOfPrimitivesShape
)

export { rowsOfPrimitivesShape }
