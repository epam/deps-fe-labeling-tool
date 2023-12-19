import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { resetDefault } from '@/actions/ui'
import { ApplicationToolbar } from '@/containers/ApplicationToolbar'
import { LabelingCanvas } from '@/containers/LabelingCanvas'
import { LeftSidebar } from '@/containers/LeftSidebar'
import { MarkupSider, WIDTH_RIGHT_SIDER } from '@/containers/MarkupSider'
import { Panel } from '@/enums/Panel'
import { withParentSize } from '@/hocs/withParentSize'
import { Settings, settingsShape } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { LayoutStyled } from './LabelingTool.styles'

const HEIGHT_TOP_BAR = 46
class LabelingTool extends PureComponent {
  static propTypes = {
    settings: settingsShape,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    }).isRequired,
    resetDefault: PropTypes.func.isRequired
  }

  static defaultProps = {
    panels: Object.values(Panel)
  }

  state = {
    markupSiderWidth: WIDTH_RIGHT_SIDER
  }

  setMarkupSiderWidth = (markupSiderWidth) => {
    this.setState({ markupSiderWidth })
  }

  getCanvasWidth = () => {
    return this.props.size.width && this.props.size.width - (Settings.has(this.props.settings, Panel.MARKUP_SIDEBAR) && this.state.markupSiderWidth)
  }

  getCanvasHeight = () => {
    return this.props.size.height && this.props.size.height - (Settings.has(this.props.settings, Panel.TOOLBAR) ? HEIGHT_TOP_BAR : 0)
  }

  renderToolbar = () => Settings.has(this.props.settings, Panel.TOOLBAR) && (
    <ApplicationToolbar />
  )

  renderMarkupSidebar = () => Settings.has(this.props.settings, Panel.MARKUP_SIDEBAR) && (
    <MarkupSider
      width={this.state.markupSiderWidth}
      setMarkupSiderWidth={this.setMarkupSiderWidth}
    />
  )

  renderLeftSidebar = () => Settings.has(this.props.settings, Panel.LEFT_SIDEBAR) && (
    <LeftSidebar height={this.getCanvasHeight()} />
  )

  renderCanvas = () => {
    return (
      <LabelingCanvas
        width={this.getCanvasWidth()}
        height={this.getCanvasHeight()}
      />
    )
  }

  componentWillUnmount = () => {
    this.props.resetDefault()
  }

  render = () => (
    <>
      {this.renderToolbar()}
      <LayoutStyled
        height={this.props.size.height}
      >
        {this.renderLeftSidebar()}
        {this.renderCanvas()}
        {this.renderMarkupSidebar()}
      </LayoutStyled>
    </>
  )
}

const mapStateToProps = (state) => ({
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  resetDefault
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(withParentSize({
  monitorHeight: true,
  noPlaceholder: true
})(LabelingTool))

export {
  ConnectedComponent as LabelingToolPage
}
