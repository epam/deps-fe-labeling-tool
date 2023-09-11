import React from 'react'
import { ConfigLoader } from '@/application/ConfigLoader'
import { Provider } from '@/application/Provider'
import { configShape } from '@/models/Config'
import { LabelingTool } from '@/pages/LabelingTool'
import { GlobalStyle } from './Root.styles'

const Root = ({ config }) => (
  <>
    <GlobalStyle />
    <Provider>
      <ConfigLoader
        config={config}
      >
        <LabelingTool />
      </ConfigLoader>
    </Provider>
  </>
)

Root.propTypes = {
  config: configShape.isRequired
}

export {
  Root
}
