import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { undo } from '@/actions/markup'
import { Button } from '@/components/Button'
import { CompilationFeatureControl } from '@/components/CompilationFeatureControl'
import { RevertIcon } from '@/components/Icons/RevertIcon'
import { TemplateIcon } from '@/components/Icons/TemplateIcon'
import { ViewIcon } from '@/components/Icons/ViewIcon'
import { Tooltip } from '@/components/Tooltip'
import { SaveDropdown } from '@/containers/SaveDropdown'
import { CompilationFeature } from '@/enums/CompilationFeature'

const RESOURCE_TOOLTIP_VIEW = 'View'
const RESOURCE_TOOLTIP_TEMPLATE = 'Apply template'
const RESOURCE_TOOLTIP_REVERT = 'Revert to last saved version (Ctrl+Z)'

const QuickAccessActions = ({ undo }) => {
  return (
    <>
      <SaveDropdown />
      <CompilationFeatureControl featureName={CompilationFeature.SHOW_NOT_IMPLEMENTED}>
        <Tooltip title={RESOURCE_TOOLTIP_VIEW}>
          <Button.Icon icon={<ViewIcon />} />
        </Tooltip>
        <Tooltip title={RESOURCE_TOOLTIP_TEMPLATE}>
          <Button.Icon icon={<TemplateIcon />} />
        </Tooltip>
      </CompilationFeatureControl>
      <Tooltip title={RESOURCE_TOOLTIP_REVERT}>
        <Button.Icon icon={<RevertIcon />} onClick={undo} />
      </Tooltip>
    </>
  )
}

QuickAccessActions.propTypes = {
  undo: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  undo
}

const ConnectedComponent = connect(null, mapDispatchToProps)(QuickAccessActions)

export {
  ConnectedComponent as QuickAccessActions
}
