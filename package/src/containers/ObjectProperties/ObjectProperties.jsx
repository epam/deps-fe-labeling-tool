import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels, updateTables } from '@/actions/markup'
import { labelShape } from '@/models/Label'
import { tableShape } from '@/models/Table'
import { pageSelectedLabelsSelector, pageSelectedTablesSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { LabelProperties } from './LabelProperties'
import { PropertiesContainer } from './ObjectProperties.styles'
import { TableProperties } from './TableProperties'

class ObjectProperties extends PureComponent {
  static propTypes = {
    selectedLabels: PropTypes.arrayOf(labelShape).isRequired,
    selectedTables: PropTypes.arrayOf(tableShape).isRequired
  }

  getSelectedObjects = () => [
    ...this.props.selectedLabels,
    ...this.props.selectedTables
  ]

  render = () => {
    const selectedObjects = this.getSelectedObjects()
    if (selectedObjects.length !== 1) {
      return null
    }

    if (this.props.selectedLabels.length) {
      return (
        <PropertiesContainer>
          <LabelProperties
            label={this.props.selectedLabels[0]}
          />
        </PropertiesContainer>
      )
    }

    if (this.props.selectedTables.length) {
      return (
        <PropertiesContainer>
          <TableProperties
            table={this.props.selectedTables[0]}
          />
        </PropertiesContainer>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  selectedLabels: pageSelectedLabelsSelector(state),
  selectedTables: pageSelectedTablesSelector(state)
})

const mapDispatchToProps = {
  updateLabels,
  updateTables
}

const ConnectedObjectProperties = connect(mapStateToProps, mapDispatchToProps)(ObjectProperties)

export {
  ConnectedObjectProperties as ObjectProperties
}
