import PropTypes from 'prop-types'
import { DictionaryShape } from '@/utils/propTypes'

class ModifiedObjects {
  static isModified = (modifiedObjects) => {
    if (!modifiedObjects) {
      return false
    }

    return Object.values(modifiedObjects).some((item) =>
      item && item.length > 0
    )
  }
}

const modifiedObjectsShape = DictionaryShape(PropTypes.number.isRequired, {
  modifiedObjects: PropTypes.arrayOf(PropTypes.string)
})

export {
  ModifiedObjects,
  modifiedObjectsShape
}
