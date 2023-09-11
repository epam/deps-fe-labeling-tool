import React, { useCallback, useEffect } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import 'antd/lib/modal/style/index.less'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeLabels, removeTables, removeAreas } from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { Button } from '@/components/Button'
import { DeleteIcon } from '@/components/Icons/DeleteIcon'
import { Tooltip } from '@/components/Tooltip'
import { HotKeyEvent } from '@/constants/hotKeys'
import { SidebarContent } from '@/enums/SidebarContent'
import { withHotKeys } from '@/hocs/withHotKeys'
import { areaShape } from '@/models/Area'
import { labelShape } from '@/models/Label'
import { tableShape } from '@/models/Table'
import {
  pageSelectedLabelsSelector,
  pageSelectedTablesSelector,
  pageSelectedAreasSelector,
  pageLabelsSelector
} from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { replaceAll } from '@/utils/string'

const RESOURCE_TOOLTIP_DELETE = 'Delete'
const RESOURCE_CONFIRM_DELETE_TITLE = 'Deletion Confirmation'
const RESOURCE_CONFIRM_DELETE_CONTENT = 'Are you sure you want to delete markup?'
const RESOURCE_CONFIRM_OBJECTS_DELETION_CONTENT_1 = 'Are you sure you want to delete {0} objects?'
const RESOURCE_CANCEL_DELETE = 'Cancel'

const DeleteButton = ({
  currentPage,
  selectedLabels,
  selectedTables,
  selectedAreas,
  removeLabels,
  removeTables,
  removeAreas,
  registerHandlers,
  setActiveSidebar
}) => {
  const deleteMarkup = useCallback(() => {
    selectedLabels.length && removeLabels(currentPage, selectedLabels)
    selectedTables.length && removeTables(currentPage, selectedTables)
    selectedAreas.length && removeAreas(currentPage, selectedAreas)
  }, [
    removeLabels,
    removeTables,
    removeAreas,
    selectedLabels,
    selectedTables,
    selectedAreas,
    currentPage
  ])

  const confirmDelete = useCallback((onOk, onCancel, content) => Modal.confirm({
    title: RESOURCE_CONFIRM_DELETE_TITLE,
    icon: <ExclamationCircleOutlined />,
    content: content,
    okText: RESOURCE_TOOLTIP_DELETE,
    cancelText: RESOURCE_CANCEL_DELETE,
    onOk,
    onCancel
  }), [])

  const onClick = useCallback((e, confirmContent = RESOURCE_CONFIRM_DELETE_CONTENT) => {
    confirmDelete(
      deleteMarkup,
      () => { },
      confirmContent
    )
  }, [confirmDelete, deleteMarkup])

  const onKeyDelete = useCallback(() => {
    const selectedObjects = [
      ...selectedLabels,
      ...selectedTables,
      ...selectedAreas
    ]

    if (selectedObjects.length === 0) {
      return
    }

    if (selectedObjects.length === 1) {
      setActiveSidebar(SidebarContent.MARKUP)
      deleteMarkup()
      return
    }

    onClick(null, replaceAll(RESOURCE_CONFIRM_OBJECTS_DELETION_CONTENT_1, selectedObjects.length))
  }, [
    selectedLabels,
    selectedTables,
    selectedAreas,
    deleteMarkup,
    onClick,
    setActiveSidebar
  ])

  const isDisabled = () => !(
    selectedLabels.length ||
    selectedTables.length ||
    selectedAreas.length
  )

  useEffect(() => {
    const deleteHotKeyHandler = {
      [HotKeyEvent.DELETE]: () => onKeyDelete()
    }
    registerHandlers(deleteHotKeyHandler)
  }, [
    onKeyDelete,
    registerHandlers
  ])

  return (
    <Tooltip title={RESOURCE_TOOLTIP_DELETE}>
      <Button.Icon
        disabled={isDisabled()}
        icon={<DeleteIcon />}
        onClick={onClick}
      />
    </Tooltip>
  )
}

DeleteButton.propTypes = {
  currentPage: PropTypes.number.isRequired,
  selectedLabels: PropTypes.arrayOf(labelShape).isRequired,
  selectedTables: PropTypes.arrayOf(tableShape).isRequired,
  selectedAreas: PropTypes.arrayOf(areaShape).isRequired,
  removeLabels: PropTypes.func.isRequired,
  removeTables: PropTypes.func.isRequired,
  removeAreas: PropTypes.func.isRequired,
  registerHandlers: PropTypes.func.isRequired,
  setActiveSidebar: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  removeLabels,
  removeTables,
  removeAreas,
  setActiveSidebar
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  labels: pageLabelsSelector(state),
  selectedLabels: pageSelectedLabelsSelector(state),
  selectedTables: pageSelectedTablesSelector(state),
  selectedAreas: pageSelectedAreasSelector(state)
})

const ConnectedComponent = withHotKeys(
  connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
)

export {
  ConnectedComponent as DeleteButton
}
