
import React, { createRef, Component, memo } from 'react'
import PropTypes from 'prop-types'
import { renderCell } from './Cell'
import { StyledHotTable } from './HandsonTable.styles'
import { htColumnShape } from './models/HTColumn'
import { htMergeShape } from './models/HTMerge'
import { rowsOfPrimitivesShape } from './models/HTTableData'

const StretchColumn = {
  ALL: 'all',
  LAST: 'last',
  NONE: 'none'
}

const EventSource = {
  EDIT: 'edit',
  LOAD_DATA: 'loadData',
  POPULATE_FROM_ARRAY: 'populateFromArray'
}

const HORIZONTAL_SCROLL_HEIGHT = 10
const HEIGHT_DIFFERENCE_THRESHOLD = 1

class HandsonTable extends Component {
  static defaultProps = {
    colHeaders: true,
    manualColumnResize: true,
    manualRowResize: true,
    outsideClickDeselects: true,
    rowHeaders: true,
    stretchH: StretchColumn.ALL
  }

  static propTypes = {
    cellRenderer: PropTypes.func,
    colHeaders: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    readOnly: PropTypes.bool,
    renderExtra: PropTypes.func,
    rowHeaders: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    manualColumnResize: PropTypes.bool,
    manualRowResize: PropTypes.bool,
    outsideClickDeselects: PropTypes.bool,
    stretchH: PropTypes.oneOf(
      Object.values(StretchColumn)
    ),
    saveData: PropTypes.func,
    data: rowsOfPrimitivesShape.isRequired,
    className: PropTypes.string,
    mergeCells: PropTypes.arrayOf(
      htMergeShape
    ).isRequired,
    columns: PropTypes.arrayOf(
      htColumnShape
    )
  }

  htRef = createRef()

  ht = null

  autoRowSizePlugin = null

  getWithoutPx = (computedValue) => Number(computedValue.slice(0, -2))

  setHeight = () => {
    const hotElementRef = this.htRef.current?.hotElementRef

    const partentComputedStyle = window.getComputedStyle(hotElementRef.parentNode)
    const parentPaddingTop = this.getWithoutPx(partentComputedStyle.paddingTop)
    const parentPaddingBottom = this.getWithoutPx(partentComputedStyle.paddingBottom)

    this.autoRowSizePlugin?.recalculateAllRowsHeight()

    const headerHeight = this.autoRowSizePlugin?.getColumnHeaderHeight() || 0
    const tableHeight = this.autoRowSizePlugin?.heights
      .reduce((acc, current) => acc + current, headerHeight)
    const wrapperHeight = hotElementRef?.offsetHeight
    const parentHeight = hotElementRef?.parentNode.offsetHeight - parentPaddingTop - parentPaddingBottom

    if (!tableHeight || !wrapperHeight) {
      return
    }

    const targetHeight = tableHeight + HORIZONTAL_SCROLL_HEIGHT

    if (Math.abs(wrapperHeight - targetHeight) <= HEIGHT_DIFFERENCE_THRESHOLD) {
      return
    }

    this.ht.updateSettings({
      height: Math.min(Math.abs(parentHeight), targetHeight)
    })
  }

  onAfterChange = (changes, source) => {
    if (!changes) {
      return
    }

    const [necessaryChanges] = changes

    if (source === EventSource.EDIT) {
      this.props.saveData(necessaryChanges)
    }
  }

  cellRenderer = (instance, td, row, col, prop, value, cellProps) => {
    if (this.props.cellRenderer) {
      return this.props.cellRenderer(instance, td, row, col, prop, value, cellProps)
    }
    const extra = this.props.renderExtra && this.props.renderExtra(row, col, this.ht?.getSourceData())
    return renderCell(td, value, cellProps, extra)
  }

  componentDidMount = () => {
    this.ht = this.htRef.current.hotInstance
    this.autoRowSizePlugin = this.ht.getPlugin('AutoRowSize')

    this.setHeight()
  }

  componentWillUnmount = () => {
    this.ht.deselectCell()
  }

  render = () => (
    <StyledHotTable
      ref={this.htRef}
      afterChange={this.onAfterChange}
      className={this.props.className}
      colHeaders={this.props.colHeaders}
      columns={this.props.columns}
      data={this.props.data}
      manualColumnResize={this.props.manualColumnResize}
      manualRowResize={this.props.manualRowResize}
      mergeCells={this.props.mergeCells}
      outsideClickDeselects={this.props.outsideClickDeselects}
      readOnly={this.props.readOnly}
      renderer={this.cellRenderer}
      rowHeaders={this.props.rowHeaders}
      stretchH={this.props.stretchH}
    />
  )
}

const MemoHandsonTable = memo(HandsonTable)

export { MemoHandsonTable as HandsonTable }
