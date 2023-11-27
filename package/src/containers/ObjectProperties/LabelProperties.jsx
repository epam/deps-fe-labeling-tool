import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateAllLabels } from '@/actions/markup'
import { ObjectTitle } from '@/components/ObjectTitle'
import { ExtractArea } from '@/containers/ExtractArea'
import { LabelContent } from '@/containers/LabelContent'
import { ObjectCoordinates } from '@/containers/ObjectCoordinates'
import { ObjectNameAndIndex } from '@/containers/ObjectNameAndIndex'
import { Mode } from '@/enums/Mode'
import { labelShape } from '@/models/Label'
import { settingsShape } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { Grid, Divider } from './ObjectProperties.styles'

const RESOURCE_CONTENT = 'CONTENT'
const RESOURCE_COORDINATES = 'COORDINATES'

class LabelProperties extends PureComponent {
  isContentAvailable = () => this.props.settings.mode !== Mode.MARKUP

  render = () => (
    <Grid>
      <ObjectTitle
        title={RESOURCE_CONTENT}
      />
      <ObjectNameAndIndex
        object={this.props.label}
        onChange={this.props.updateAllLabels}
      />
      {
        this.isContentAvailable() && (
          <>
            <LabelContent label={this.props.label} />
            <ExtractArea label={this.props.label} />
          </>
        )
      }
      <Divider />
      <ObjectTitle
        title={RESOURCE_COORDINATES}
      />
      <ObjectCoordinates />
    </Grid>
  )
}

LabelProperties.propTypes = {
  label: labelShape.isRequired,
  settings: settingsShape.isRequired,
  updateAllLabels: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  updateAllLabels
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(LabelProperties)

export {
  ConnectedComponent as LabelProperties
}
