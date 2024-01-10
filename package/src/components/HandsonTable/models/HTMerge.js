import PropTypes from 'prop-types'

class HTMerge {
  constructor (row, col, rowspan, colspan) {
    this.row = row
    this.col = col
    this.rowspan = rowspan
    this.colspan = colspan
  }
}

const htMergeShape = PropTypes.shape({
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  rowspan: PropTypes.number.isRequired,
  colspan: PropTypes.number.isRequired
})

export {
  HTMerge,
  htMergeShape
}
