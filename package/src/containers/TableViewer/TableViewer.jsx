
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateTables } from '@/actions/markup'
import { HandsonTable } from '@/components/HandsonTable'
import { tableShape } from '@/models/Table'
import { mapMarkupTableToHandsonDataStrings } from '@/models/Table/mappers'
import { pageSelectedTablesSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { TableViewerContainer } from './TableViewer.styles'

const TableViewer = ({ updateTables, currentPage, selectedTables: [table] }) => {
  const saveData = useCallback(([row, column, prevValue, newValue]) => {
    const newValues = table.values.map((value) => {
      if (value.row === row && value.column === column) {
        return {
          ...value, value: newValue
        }
      }

      return value
    })

    updateTables(currentPage, [{ ...table, values: newValues }])
  }, [currentPage, table, updateTables])

  const renderTable = useCallback(() => {
    const { HTDataForRender, mergeCells } = mapMarkupTableToHandsonDataStrings(table)

    return (
      <HandsonTable
        data={HTDataForRender}
        mergeCells={mergeCells}
        saveData={saveData}
      />
    )
  }, [saveData, table])

  return (
    <TableViewerContainer>
      {renderTable()}
    </TableViewerContainer>

  )
}

TableViewer.propTypes = {
  selectedTables: PropTypes.arrayOf(tableShape).isRequired,
  updateTables: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  selectedTables: pageSelectedTablesSelector(state)
})

const mapDispatchToProps = {
  updateTables
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TableViewer)

export {
  ConnectedComponent as TableViewer
}
