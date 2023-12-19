import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setActiveSidebar } from '@/actions/ui'
import { TableViewer } from '@/containers/TableViewer'
import { SidebarContent } from '@/enums/SidebarContent'
import { StyledCloseButton } from './TableData.styles'

const RESOURCE_CLOSE = 'Close'

const TableData = ({ setActiveSidebar }) => {
  const onCloseTableDataClick = () => {
    setActiveSidebar(SidebarContent.MARKUP)
  }

  return (
    <>
      <TableViewer />
      <StyledCloseButton onClick={onCloseTableDataClick}>{RESOURCE_CLOSE}</StyledCloseButton>
    </>
  )
}

const mapDispatchToProps = {
  setActiveSidebar
}

TableData.propTypes = {
  setActiveSidebar: PropTypes.func.isRequired
}

const ConnectedComponent = connect(null, mapDispatchToProps)(TableData)

export {
  ConnectedComponent as TableData
}
