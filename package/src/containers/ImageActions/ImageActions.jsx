import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setZoom } from '@/actions/canvas'
import { Button } from '@/components/Button'
import { CompilationFeatureControl } from '@/components/CompilationFeatureControl'
import { BrightnessIcon } from '@/components/Icons/BrightnessIcon'
import { ContrastIcon } from '@/components/Icons/ContrastIcon'
import { Slider } from '@/components/Slider'
import { Tooltip } from '@/components/Tooltip'
import { ZOOM_STEP, ZOOM_MIN, ZOOM_MAX } from '@/constants/canvas'
import { RotationControls } from '@/containers/RotationControls'
import { CompilationFeature } from '@/enums/CompilationFeature'
import { Feature } from '@/enums/Feature'
import { settingsShape } from '@/models/Settings'
import { zoomSelector } from '@/selectors/canvas'
import { settingsSelector } from '@/selectors/settings'

const RESOURCE_TOOLTIP_BRIGHTNESS = 'Adjust brightness'
const RESOURCE_TOOLTIP_CONTRAST = 'Adjust contrast'

const ImageActions = ({
  zoom,
  setZoom,
  settings
}) => {
  const changeZoom = useCallback(
    (zoomPercent) => {
      let zoom = zoomPercent / 100
      zoom = zoom <= ZOOM_MIN ? ZOOM_MIN : zoom
      zoom = zoom >= ZOOM_MAX ? ZOOM_MAX : zoom
      setZoom(zoom)
    },
    [setZoom]
  )

  return (
    <>
      <CompilationFeatureControl featureName={CompilationFeature.SHOW_NOT_IMPLEMENTED}>
        <Tooltip title={RESOURCE_TOOLTIP_CONTRAST}>
          <Button.Icon icon={<ContrastIcon />} />
        </Tooltip>
        <Tooltip title={RESOURCE_TOOLTIP_BRIGHTNESS}>
          <Button.Icon icon={<BrightnessIcon />} />
        </Tooltip>
      </CompilationFeatureControl>
      <Slider
        min={ZOOM_MIN * 100}
        max={ZOOM_MAX * 100}
        step={ZOOM_STEP * 10000}
        value={zoom * 100}
        onChange={changeZoom}
        valuePrefix={'%'}
      />
      {
        settings.features.includes(Feature.ROTATION) && (
          <RotationControls />
        )
      }
    </>
  )
}

ImageActions.propTypes = {
  zoom: PropTypes.number.isRequired,
  setZoom: PropTypes.func.isRequired,
  settings: settingsShape.isRequired
}

const mapStateToProps = (state) => ({
  zoom: zoomSelector(state),
  settings: settingsSelector(state)
})

const mapDispatchToProps = {
  setZoom
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ImageActions)

export {
  ConnectedComponent as ImageActions
}
