import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { clearSelection } from '@/actions/markup'
import { openPage } from '@/actions/pagination'
import { changeTool } from '@/actions/tools'
import { setActiveSidebar } from '@/actions/ui'
import { TextHighlighter } from '@/components/TextHighlighter'
import { SidebarContent } from '@/enums/SidebarContent'
import { Tool } from '@/enums/Tool'
import { labelShape } from '@/models/Label'
import { tableShape } from '@/models/Table'
import { pageSelectedLabelsSelector, pageSelectedTablesSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { selectedToolSelector } from '@/selectors/tools'
import { markupObjectsFilterSelector } from '@/selectors/ui'
import { childrenShape } from '@/utils/propTypes'
import { replaceAll } from '@/utils/string'
import { TextWrapper, TitleWithIconWrapper, PageSpan, NameSpan } from './MarkupObjectHeader.styles'

const RESOURCE_PAGE_1 = 'page {0}'

const MarkupObjectHeader = ({
  badge,
  collapseIcon,
  icon,
  name,
  pagesTitle,
  unassigned,
  page,
  markupObjectFilter,
  onHeaderClick,
  currentPage,
  clearSelection,
  openPage,
  changeTool,
  selectedTool,
  selectedLabels,
  selectedTables,
  setActiveSidebar
}) => {
  const onClick = () => {
    if (selectedTool !== Tool.POINTER) {
      changeTool(Tool.POINTER)
    }

    if (selectedLabels.length || selectedTables.length) {
      clearSelection(currentPage)
    }

    setActiveSidebar(SidebarContent.MARKUP)

    if (currentPage !== page && page !== undefined) {
      openPage(page)
    }

    onHeaderClick?.()
  }

  return (
    <TextWrapper
      $unassigned={unassigned}
      onClick={onClick}
    >
      {badge}
      {collapseIcon}
      <TitleWithIconWrapper>
        {icon}
        <NameSpan>
          <TextHighlighter
            searchTerm={markupObjectFilter}
            text={name}
          />
        </NameSpan>
      </TitleWithIconWrapper>
      {pagesTitle && <PageSpan>{pagesTitle}</PageSpan>}
      {page && <PageSpan>{replaceAll(RESOURCE_PAGE_1, page)}</PageSpan>}
    </TextWrapper>
  )
}

MarkupObjectHeader.propTypes = {
  badge: childrenShape,
  collapseIcon: childrenShape,
  icon: childrenShape,
  pagesTitle: PropTypes.string,
  setActiveSidebar: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  page: PropTypes.number,
  unassigned: PropTypes.bool,
  markupObjectFilter: PropTypes.string,
  onHeaderClick: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  openPage: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  changeTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.oneOf(
    Object.values(Tool)
  ).isRequired,
  selectedLabels: PropTypes.arrayOf(labelShape).isRequired,
  selectedTables: PropTypes.arrayOf(tableShape).isRequired
}

const mapStateToProps = (state) => ({
  markupObjectFilter: markupObjectsFilterSelector(state),
  currentPage: currentPageSelector(state),
  selectedTool: selectedToolSelector(state),
  selectedLabels: pageSelectedLabelsSelector(state),
  selectedTables: pageSelectedTablesSelector(state)
})

const mapDispatchToProps = {
  openPage,
  clearSelection,
  changeTool,
  setActiveSidebar
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MarkupObjectHeader)

export {
  ConnectedComponent as MarkupObjectHeader
}
