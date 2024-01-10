import React from 'react'
import ReactJson from 'react-json-view'
import { connect } from 'react-redux'
import { pageMarkupShape } from '@/models/Markup'
import { pageMarkupSelector } from '@/selectors/markup'
import { jsonThemeConfig } from './jsonThemeConfig'

const DISPLAY_DATA_TYPES = false
const DISPLAY_OBJECT_SIZE = false
const INDENT_WIDTH = 1
const NAME_JSON = false
const COLLAPSED_DEPTH = 1

const PreviewJson = ({ pageMarkup }) => (
  <ReactJson
    collapsed={COLLAPSED_DEPTH}
    src={pageMarkup}
    displayDataTypes={DISPLAY_DATA_TYPES}
    displayObjectSize={DISPLAY_OBJECT_SIZE}
    indentWidth={INDENT_WIDTH}
    name={NAME_JSON}
    theme={jsonThemeConfig}
  />
)

const mapStateToProps = (state) => ({
  pageMarkup: pageMarkupSelector(state)
})

PreviewJson.propTypes = {
  pageMarkup: pageMarkupShape.isRequired
}

const ConnectedComponent = connect(mapStateToProps)(PreviewJson)

export {
  ConnectedComponent as PreviewJson
}
