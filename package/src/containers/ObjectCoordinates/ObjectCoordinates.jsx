import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLabels, updateTables } from '@/actions/markup'
import { Input } from '@/components/Input'
import { useComponentWillUnmount } from '@/hooks/useComponentWillUnmount'
import { usePrevious } from '@/hooks/usePrevious'
import { Label, labelShape } from '@/models/Label'
import * as Table from '@/models/Table'
import { tableShape } from '@/models/Table'
import { getPosition } from '@/models/Table/getPosition'
import { getSize } from '@/models/Table/getSize'
import { pageSelectedLabelsSelector, pageSelectedTablesSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { InputPrefix, Param, InputsWrapper } from './ObjectCoordinates.styles'

const INPUT_LENGTH = 6
const CoordSymbol = {
  X: 'x',
  Y: 'y',
  W: 'w',
  H: 'h'
}
const TABLE_TYPE_NAME = 'table'

const coordsToSlicedString = (coords) => Object.fromEntries(
  Object.entries(coords).map(([param, value]) => (
    [param, String(value).slice(0, 6)]
  ))
)

const getInitialCoords = (selected) => {
  if (selected.typeName === TABLE_TYPE_NAME) {
    return coordsToSlicedString({
      ...getPosition(selected),
      ...getSize(selected)
    })
  }

  return coordsToSlicedString(Label.toRectangle(selected))
}

const ObjectCoordinates = ({
  currentPage,
  selectedLabels: [selectedLabel],
  selectedTables: [selectedTable],
  updateLabels,
  updateTables
}) => {
  const selectedObject = selectedLabel ?? selectedTable

  const prevSelectedObject = usePrevious(selectedObject)

  const [coords, setCoords] = useState(getInitialCoords(selectedObject))

  const lastParam = useRef()

  const updateObject = useCallback((param) => {
    if (!param) {
      return
    }

    const numericValue = Number(coords[param])

    if (selectedTable) {
      const tableWithNewPos = param === CoordSymbol.X
        ? Table.setPosition(selectedTable, { x: numericValue })
        : Table.setPosition(selectedTable, { y: numericValue })
      return updateTables(currentPage, [tableWithNewPos])
    }

    return updateLabels(currentPage, [{
      ...selectedLabel,
      [param]: numericValue
    }])
  }, [
    coords,
    currentPage,
    selectedLabel,
    selectedTable,
    updateLabels,
    updateTables
  ])

  useComponentWillUnmount(() => updateObject(lastParam.current))

  useEffect(() => {
    if (prevSelectedObject !== selectedObject) {
      setCoords(getInitialCoords(selectedObject))
    }
  }, [
    coords,
    prevSelectedObject,
    selectedObject,
    selectedLabel,
    selectedTable,
    updateObject
  ])

  const onChangeCoord = (value, param) => {
    lastParam.current = param
    setCoords((prevCoords) => ({
      ...prevCoords,
      [param]: `${value}`
    }))
  }

  const isInputDisabled = useCallback(
    (param) => !!selectedTable && (param === CoordSymbol.W || param === CoordSymbol.H),
    [selectedTable]
  )

  const getCoordPrefix = (prefix) => (
    <InputPrefix>
      <Param>{prefix}</Param>
    </InputPrefix>
  )

  const renderInputs = useMemo(() => (
    Object.keys(coords).map((param) => (
      <Input
        key={param}
        disabled={isInputDisabled(param)}
        maxLength={INPUT_LENGTH}
        onBlur={() => updateObject(param)}
        onChange={(e) => onChangeCoord(e.target.value, param)}
        onPressEnter={() => updateObject(param)}
        prefix={getCoordPrefix(param)}
        value={coords[param]}
      />
    ))
  ), [coords, isInputDisabled, updateObject])

  return (
    <InputsWrapper>
      {renderInputs}
    </InputsWrapper>
  )
}

ObjectCoordinates.propTypes = {
  currentPage: PropTypes.number.isRequired,
  updateLabels: PropTypes.func.isRequired,
  updateTables: PropTypes.func.isRequired,
  selectedLabels: PropTypes.arrayOf(labelShape).isRequired,
  selectedTables: PropTypes.arrayOf(tableShape).isRequired
}

const mapStateToProps = (state) => ({
  currentPage: currentPageSelector(state),
  selectedLabels: pageSelectedLabelsSelector(state),
  selectedTables: pageSelectedTablesSelector(state)
})

const mapDispatchToProps = {
  updateLabels,
  updateTables
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ObjectCoordinates)

export {
  ConnectedComponent as ObjectCoordinates
}
