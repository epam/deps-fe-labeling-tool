import React from 'react'
import { ConfigLoader } from '@/application/ConfigLoader'
import { Provider } from '@/application/Provider'
import { configShape } from '@/models/Config'
import { LabelingToolPage } from '@/pages/LabelingTool'
import { GlobalStyle } from './LabelingTool.styles'

const LabelingTool = ({ config }) => (
  <>
    <GlobalStyle />
    <Provider>
      <ConfigLoader
        config={config}
      >
        <LabelingToolPage />
      </ConfigLoader>
    </Provider>
  </>
)

LabelingTool.propTypes = {
  config: configShape.isRequired
}

export {
  LabelingTool
}
