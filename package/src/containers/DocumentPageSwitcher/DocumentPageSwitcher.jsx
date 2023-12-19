import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openPage } from '@/actions/pagination'
import { setActiveSidebar } from '@/actions/ui'
import { PageSwitcher } from '@/components/PageSwitcher'
import { SidebarContent } from '@/enums/SidebarContent'
import {
  pageImageUrlSelector,
  pagesQuantitySelector
} from '@/selectors/document'
import {
  currentPageSelector
} from '@/selectors/pagination'
import { activeSidebarSelector } from '@/selectors/ui'

const DocumentPageSwitcher = ({
  imageUrl,
  pagesQuantity,
  activePage,
  openPage,
  activeSidebar,
  setActiveSidebar
}) => {
  const changeActivePage = useCallback(
    (page) => {
      openPage(page)

      if (activeSidebar === SidebarContent.TABLE_DATA) {
        setActiveSidebar(SidebarContent.MARKUP)
      }
    },
    [openPage, activeSidebar, setActiveSidebar]
  )

  return (
    <PageSwitcher
      disabled={!imageUrl}
      changeActivePage={changeActivePage}
      pagesQuantity={pagesQuantity}
      activePage={activePage}
    />
  )
}

DocumentPageSwitcher.propTypes = {
  activePage: PropTypes.number.isRequired,
  pagesQuantity: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  openPage: PropTypes.func.isRequired,
  setActiveSidebar: PropTypes.func.isRequired,
  activeSidebar: PropTypes.oneOf(Object.values(SidebarContent)).isRequired
}

const mapStateToProps = (state) => ({
  imageUrl: pageImageUrlSelector(state),
  pagesQuantity: pagesQuantitySelector(state),
  activePage: currentPageSelector(state),
  activeSidebar: activeSidebarSelector(state)
})

const mapDispatchToProps = {
  openPage,
  setActiveSidebar
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(DocumentPageSwitcher)

export {
  ConnectedComponent as DocumentPageSwitcher
}
