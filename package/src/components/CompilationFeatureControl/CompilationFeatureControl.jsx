import { isCompilationFeatureEnabled } from '@/utils/compilation'

function CompilationFeatureControl ({ featureName, children }) {
  return isCompilationFeatureEnabled(featureName) ? children : null
}

export {
  isCompilationFeatureEnabled as isFeatureEnabled,
  CompilationFeatureControl
}
