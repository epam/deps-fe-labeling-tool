
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CompilationFeatureControl } from '@/components/CompilationFeatureControl'
import { CloseButton } from '@/containers/CloseButton'
import { CommentsButton } from '@/containers/CommentsButton'
import { DeleteButton } from '@/containers/DeleteButton'
import { DocumentPageSwitcher } from '@/containers/DocumentPageSwitcher'
import { DocumentProperties } from '@/containers/DocumentProperties'
import { HotKeysDrawer } from '@/containers/HotKeysDrawer'
import { ImageActions } from '@/containers/ImageActions'
import { MainMenu } from '@/containers/MainMenu'
import { ObjectActions, isObjectActionsEmpty } from '@/containers/ObjectActions'
import { QuickAccessActions } from '@/containers/QuickAccessActions'
import { ToolsPicker, isToolsPickerEmpty } from '@/containers/ToolsPicker'
import { CompilationFeature } from '@/enums/CompilationFeature'
import { Feature } from '@/enums/Feature'
import { Tool } from '@/enums/Tool'
import { Settings, settingsShape } from '@/models/Settings'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'
import {
  Wrapper,
  Row,
  Block,
  RightBlock,
  LeftSeparator,
  RightSeparator
} from './ApplicationToolbar.styles'

const ApplicationToolbar = ({
  settings,
  selectedTool
}) => {
  const [hotKeysVisible, setHotKeysVisible] = useState(false)

  const toggleHotKeysInfo = () => {
    setHotKeysVisible((prevVisible) => !prevVisible)
  }

  return (
    <Wrapper>
      <Block>
        <RightSeparator>
          <MainMenu
            toggleHotKeysInfo={toggleHotKeysInfo}
          />
        </RightSeparator>
        <RightSeparator>
          <QuickAccessActions />
        </RightSeparator>
        {
          !isToolsPickerEmpty(settings) && (
            <RightSeparator>
              <Row>
                <ToolsPicker />
              </Row>
            </RightSeparator>
          )
        }
        {
          selectedTool === Tool.POINTER && (
            <RightSeparator>
              <DeleteButton />
            </RightSeparator>
          )
        }
        {
          !isObjectActionsEmpty(settings) && (
            <RightSeparator>
              <ObjectActions />
            </RightSeparator>
          )
        }
      </Block>
      <Block>
        <ImageActions />
      </Block>
      <RightBlock>
        {
          Settings.has(settings, Feature.PAGING) && (
            <LeftSeparator>
              <DocumentPageSwitcher />
            </LeftSeparator>
          )
        }
        <LeftSeparator>
          <DocumentProperties />
        </LeftSeparator>
        <CompilationFeatureControl featureName={CompilationFeature.SHOW_NOT_IMPLEMENTED}>
          <LeftSeparator>
            <CommentsButton />
          </LeftSeparator>
        </CompilationFeatureControl>
        <LeftSeparator>
          <CloseButton />
        </LeftSeparator>
      </RightBlock>
      <HotKeysDrawer
        visible={hotKeysVisible}
        toggleHotKeysInfo={toggleHotKeysInfo}
      />
    </Wrapper>
  )
}

ApplicationToolbar.propTypes = {
  settings: settingsShape,
  selectedTool: PropTypes.oneOf(
    Object.values(Tool)
  ).isRequired
}

const mapStateToProps = (state) => ({
  settings: settingsSelector(state),
  selectedTool: selectedToolSelector(state)
})

const Container = connect(mapStateToProps)(ApplicationToolbar)

export {
  Container as ApplicationToolbar
}
