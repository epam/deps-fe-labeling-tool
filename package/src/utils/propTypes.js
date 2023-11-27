import PropTypes, { checkPropTypes } from 'prop-types'

const DictionaryShape = (keyShape, valueShape) => PropTypes.shape({
  validator: (props, _, componentName, location, propFullPath) => {
    if (!keyShape || !valueShape) {
      return
    }

    const propName = propFullPath.substring(0, propFullPath.indexOf('.validator'))

    Object.keys(props).forEach((key) => {
      const keySpec = {
        [key]: keyShape
      }

      const keyObject = {
        [key]: +key ? +key : key
      }

      checkPropTypes(keySpec, keyObject, `${propName} key`, componentName)
      checkPropTypes(valueShape, props[key], `${propName}.${key} value`, componentName)
    })
  }
})

const childrenShape = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.element
])

export {
  childrenShape,
  DictionaryShape
}
