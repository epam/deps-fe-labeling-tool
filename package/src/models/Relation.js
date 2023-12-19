import PropTypes from 'prop-types'
import { labelShape } from '@/models/Label'

const RELATION_TYPE_NAME = 'relation'

class Relation {
  typeName = RELATION_TYPE_NAME

  constructor (from, to) {
    this.uid = `${from.uid} + ${to.uid}`
    this.from = from
    this.to = to
  }
}

const relationShape = PropTypes.shape({
  typeName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  from: labelShape.isRequired,
  to: labelShape.isRequired
})

const getRelatedLabels = (labels, toLabel) => labels.filter((l) => (
  l.type !== toLabel.type &&
  l.fieldCode !== '' &&
  toLabel.fieldCode !== '' &&
  l.fieldCode === toLabel.fieldCode &&
  l.index === toLabel.index
))

export {
  RELATION_TYPE_NAME,
  relationShape,
  Relation,
  getRelatedLabels
}
