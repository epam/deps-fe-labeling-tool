import PropTypes from 'prop-types'
import { isCompilationFeatureEnabled } from '@/utils/compilation'

function CompilationFeatureControl ({ featureName, children }) {
  return isCompilationFeatureEnabled(featureName) ? children : null
}

CompilationFeatureControl.propTypes = {
  children: PropTypes.node.isRequired,
  featureName: PropTypes.string
}

export {
  isCompilationFeatureEnabled as isFeatureEnabled,
  CompilationFeatureControl
}
