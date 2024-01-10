import React from 'react'
import { Layout } from 'antd'
import 'antd/lib/layout/style/index.less'

const ANTD_LIGHT_THEME = 'light'

const Sider = (props) => (
  <Layout.Sider {...props} theme={ANTD_LIGHT_THEME} />
)

export {
  Sider
}
