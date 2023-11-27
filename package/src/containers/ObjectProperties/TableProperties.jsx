import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ocrTable } from '@/actions/api'
import { updateTables, updateAllTables } from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { ButtonType } from '@/components/Button'
import { TableIcon } from '@/components/Icons/TableIcon'
import { ObjectTitle } from '@/components/ObjectTitle'
import { ObjectCoordinates } from '@/containers/ObjectCoordinates'
import { ObjectNameAndIndex } from '@/containers/ObjectNameAndIndex'
import { OcrSelect } from '@/containers/OcrSelect'
import { FieldType } from '@/enums/FieldType'
import { SidebarContent } from '@/enums/SidebarContent'
import { fieldShape } from '@/models/Field'
import { ocrEngineShape } from '@/models/OcrEngine'
import * as Table from '@/models/Table'
import { fieldsSelector } from '@/selectors/model'
import { primaryEngineSelector, ocrEnginesSelector } from '@/selectors/ocr'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { getApi } from '@/services/api'
import { Grid, Divider, Button } from './ObjectProperties.styles'
import {
  TableDataName,
  StyledOpenButton,
  TableData
} from './TableProperties.styles'

const RESOURCE_OCR = 'OCR'
const RESOURCE_CONTENT = 'CONTENT'
const RESOURCE_COORDINATES = 'COORDINATES'
const RESOURCE_EXTRACT_DATA = 'Extract data'
const RESOURCE_TABLE_DATA = 'Table Data'
const RESOURCE_OPEN = 'Open'

const { tableShape } = Table

class TableProperties extends PureComponent {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    fields: PropTypes.arrayOf(fieldShape).isRequired,
    setActiveSidebar: PropTypes.func.isRequired,
    ocrTable: PropTypes.func.isRequired,
    ocrEngines: PropTypes.arrayOf(ocrEngineShape),
    primaryEngine: PropTypes.string.isRequired,
    table: tableShape.isRequired,
    updateAllTables: PropTypes.func.isRequired,
    updateTables: PropTypes.func.isRequired
  }

  octTable = async (selectedEngine) => {
    const newTable = await this.props.ocrTable(selectedEngine, this.props.table)
    this.props.updateTables(this.props.currentPage, [
      newTable
    ])
  }

  onColumnsChange = (value) => {
    const { rows } = Table.getDimensions(this.props.table)
    this.props.updateTables(this.props.currentPage, [
      Table.divide(this.props.table, rows, value)
    ])
  }

  onRowsChange = (value) => {
    const { columns } = Table.getDimensions(this.props.table)
    this.props.updateTables(this.props.currentPage, [
      Table.divide(this.props.table, value, columns)
    ])
  }

  getTableFields = () => this.props.fields.filter((f) => {
    if (f.fieldType === FieldType.LIST) {
      return f.fieldMeta.baseType === FieldType.TABLE
    }
    return f.fieldType === FieldType.TABLE
  })

  onOpenTableDataClick = () => {
    this.props.setActiveSidebar(SidebarContent.TABLE_DATA)
  }

  isTableOCRAvailable = () => !!this.props.ocrEngines.length && !!getApi().ocrTable

  render = () => {
    return (
      <Grid>
        <ObjectTitle
          title={RESOURCE_CONTENT}
        />
        <ObjectNameAndIndex
          object={this.props.table}
          onChange={this.props.updateAllTables}
        />
        {
          this.isTableOCRAvailable() && (
            <Button
              onClick={() => this.octTable(this.props.primaryEngine)}
              type={ButtonType.PRIMARY}
            >
              {RESOURCE_EXTRACT_DATA}
            </Button>
          )
        }
        <TableData>
          <TableDataName>
            <TableIcon />
            {RESOURCE_TABLE_DATA}
          </TableDataName>
          <StyledOpenButton onClick={this.onOpenTableDataClick}>
            {RESOURCE_OPEN}
          </StyledOpenButton>
        </TableData>
        <Divider />
        <ObjectTitle
          title={RESOURCE_COORDINATES}
        />
        <ObjectCoordinates />
        {
          this.isTableOCRAvailable() && (
            <>
              <Divider />
              <ObjectTitle
                title={RESOURCE_OCR}
              />
              <OcrSelect
                ocr={this.octTable}
              />
            </>
          )
        }
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  fields: fieldsSelector(state),
  ocrEngines: ocrEnginesSelector(state),
  settings: settingsSelector(state),
  primaryEngine: primaryEngineSelector(state)
})

const mapDispatchToProps = {
  ocrTable,
  setActiveSidebar,
  updateTables,
  updateAllTables
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TableProperties)

export {
  ConnectedComponent as TableProperties
}
