import 'antd/lib/style/themes/default.less'
import 'antd/lib/style/core/index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { LabelingTool } from '@/application/LabelingTool'
import { SHIM_CONFIG } from '@/config/shim'

const LABELING_TOOL_EXPORT_KEY = 'LabelingTool'

const mount = (targetId, config) => {
  ReactDOM.render(
    <LabelingTool config={config} />,
    document.getElementById(targetId)
  )
}

const unmount = (targetId) => ReactDOM.unmountComponentAtNode(
  document.getElementById(targetId)
)

if (window.LABELING_TOOL_SHIM_TARGET_ID) {
  mount(window.LABELING_TOOL_SHIM_TARGET_ID, SHIM_CONFIG)
} else {
  window[LABELING_TOOL_EXPORT_KEY] = {
    mount,
    unmount
  }
}
