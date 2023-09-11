import React, { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setRotationAngle } from '@/actions/canvas'
import { updatePageMarkup } from '@/actions/markup'
import { Button } from '@/components/Button'
import { RotateLeftIcon } from '@/components/Icons/RotateLeftIcon'
import { RotateRightIcon } from '@/components/Icons/RotateRightIcon'
import { Tooltip } from '@/components/Tooltip'
import { HotKeyEvent } from '@/constants/hotKeys'
import { Direction } from '@/enums/Rotation'
import { withHotKeys } from '@/hocs/withHotKeys'
import { Area } from '@/models/Area'
import { Label } from '@/models/Label'
import { PageMarkup, pageMarkupShape } from '@/models/Markup'
import { Table } from '@/models/Table'
import { pageRotationAngleSelector } from '@/selectors/canvas'
import { pageMarkupStateSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'

const RESOURCE_TOOLTIP_ROTATE_LEFT = 'Rotate left'
const RESOURCE_TOOLTIP_ROTATE_RIGHT = 'Rotate right'
const ROTATION_STEP_CW = 90
const ROTATION_STEP_CCW = -90

const RotationControls = ({
  setRotationAngle,
  angle,
  currentPage,
  pageMarkup,
  updatePageMarkup,
  registerHandlers
}) => {
  const getNextAngle = useCallback((direction) => {
    const step = direction === Direction.CLOCKWISE ? ROTATION_STEP_CW : ROTATION_STEP_CCW
    let nextAngle = angle || 360
    nextAngle = (nextAngle + step) % 360

    return nextAngle
  }, [angle])

  const rotateObjects = useCallback((direction) => {
    const updatedAreas = pageMarkup?.areas?.map((area) => Area.rotate(area, direction))
    const updatedLabels = pageMarkup?.labels?.map((label) => Label.rotate(label, direction))
    const updatedTables = pageMarkup?.tables?.map((table) => Table.rotate(table, direction))

    updatePageMarkup(new PageMarkup(updatedLabels, updatedTables, updatedAreas))
  }, [pageMarkup?.areas, pageMarkup?.labels, pageMarkup?.tables, updatePageMarkup])

  const changeRotation = useCallback((direction) => {
    const nextAngle = getNextAngle(direction)
    setRotationAngle(currentPage, nextAngle)
    rotateObjects(direction)
  }, [currentPage, getNextAngle, rotateObjects, setRotationAngle])

  const hotKeyHandlers = useMemo(() => ({
    [HotKeyEvent.ROTATION_LEFT]: () => changeRotation(Direction.COUNTER_CLOCKWISE),
    [HotKeyEvent.ROTATION_RIGHT]: () => changeRotation(Direction.CLOCKWISE)
  }), [changeRotation])

  useEffect(() => {
    registerHandlers(hotKeyHandlers)
  }, [hotKeyHandlers, registerHandlers])

  return (
    <>
      <Tooltip title={RESOURCE_TOOLTIP_ROTATE_LEFT}>
        <Button.Icon
          icon={<RotateLeftIcon />}
          onClick={() => changeRotation(Direction.COUNTER_CLOCKWISE)} />
      </Tooltip>
      <Tooltip title={RESOURCE_TOOLTIP_ROTATE_RIGHT}>
        <Button.Icon
          icon={<RotateRightIcon />}
          onClick={() => changeRotation(Direction.CLOCKWISE)} />
      </Tooltip>
    </>
  )
}

RotationControls.propTypes = {
  angle: PropTypes.number,
  pageMarkup: pageMarkupShape.isRequired,
  currentPage: PropTypes.number.isRequired,
  updatePageMarkup: PropTypes.func.isRequired,
  setRotationAngle: PropTypes.func.isRequired,
  registerHandlers: PropTypes.func.isRequired
}
const RotationControlsWithHotKeys = withHotKeys(RotationControls)

const mapStateToProps = (state) => ({
  angle: pageRotationAngleSelector(state),
  currentPage: currentPageSelector(state),
  pageMarkup: pageMarkupStateSelector(state)
})

const mapDispatchToProps = {
  setRotationAngle,
  updatePageMarkup
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(RotationControlsWithHotKeys)

export {
  ConnectedComponent as RotationControls
}
