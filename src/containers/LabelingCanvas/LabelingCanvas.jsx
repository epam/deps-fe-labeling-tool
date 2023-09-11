import React, {
  useCallback,
  useMemo
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { detectTables } from '@/actions/api'
import { setZoom, setScale } from '@/actions/canvas'
import { setImage } from '@/actions/image'
import { clearSelection } from '@/actions/markup'
import { setActiveSidebar } from '@/actions/ui'
import { Canvas } from '@/components/Canvas'
import { CanvasArea } from '@/components/CanvasArea'
import { CanvasBackground } from '@/components/CanvasBackground'
import { CanvasDragger } from '@/components/CanvasDragger'
import { CanvasLabel } from '@/components/CanvasLabel'
import { CanvasMouseSelection } from '@/components/CanvasMouseSelection'
import { CanvasObjectsSelection } from '@/components/CanvasObjectsSelection'
import { CanvasRelation } from '@/components/CanvasRelation'
import { CanvasTable, CanvasTableMode } from '@/components/CanvasTable'
import { CanvasZoom } from '@/components/CanvasZoom'
import { Mode } from '@/enums/Mode'
import { SidebarContent } from '@/enums/SidebarContent'
import { Tool } from '@/enums/Tool'
import { Rectangle } from '@/models/Rectangle'
import { relationShape } from '@/models/Relation'
import { settingsShape } from '@/models/Settings'
import { zoomSelector, scaleSelector, pageRotationAngleSelector } from '@/selectors/canvas'
import { pageImageUrlSelector } from '@/selectors/document'
import { imageSelector } from '@/selectors/image'
import { pageRelationsSelector } from '@/selectors/markup'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'
import { COLORS } from '@/theme/theme.default'
import { throttleAndMergeArgs } from '@/utils/throttleAndMergeArgs'
import { DefaultCanvasHotKeys } from './DefaultCanvasHotKeys'
import { useAreas } from './useAreas'
import { useLabels } from './useLabels'
import { useTables } from './useTables'

const OBJECTS_UPDATE_DELAY = 0

const MIN_THRESHOLD_TO_DETECT = 1

const TOOL_TO_TABLE_MODE = {
  [Tool.MERGE]: CanvasTableMode.MERGE,
  [Tool.SPLIT]: CanvasTableMode.SPLIT
}

const OBJECT_CREATION_ENABLED_TOOLS = [
  Tool.DETECT_TABLES,
  Tool.LABEL,
  Tool.TABLE,
  Tool.AREA
]

const OBJECT_SELECTION_ENABLED_TOOLS = [
  Tool.POINTER
]

const mergeUpdates = (acc, newArg) => [...acc, ...newArg]

const getThrottledFunction = (cb) => throttleAndMergeArgs(
  cb,
  OBJECTS_UPDATE_DELAY,
  mergeUpdates,
  []
)

const LabelingCanvas = ({
  settings,
  width,
  height,
  currentPage,
  selectedTool,
  zoom,
  imageUrl,
  scale,
  image,
  setZoom,
  clearSelection,
  setActiveSidebar,
  rotationAngle,
  setImage,
  setScale,
  detectTablesProp,
  relations
}) => {
  const {
    labels,
    selectedLabels,
    createLabels,
    selectLabels,
    updateLabels
  } = useLabels()

  const {
    areas,
    selectedAreas,
    createAreas,
    selectAreas,
    updateAreas
  } = useAreas()

  const {
    tables,
    selectedTables,
    createTables,
    addTables,
    selectTables,
    updateTables
  } = useTables()

  const detectTables = useCallback(async (selection, relativeSelection) => {
    if (
      selection.w <= MIN_THRESHOLD_TO_DETECT &&
      selection.h <= MIN_THRESHOLD_TO_DETECT
    ) {
      return
    }

    const selectionWithinImage = Rectangle.getRectangleWithinImage(relativeSelection)
    const tables = await detectTablesProp(selectionWithinImage)
    tables?.length && addTables(tables)
  }, [addTables, detectTablesProp])

  const onSelectionEnd = useCallback((selection, opts) => {
    if (!OBJECT_CREATION_ENABLED_TOOLS.includes(selectedTool)) {
      return
    }

    const unscaledObject = Rectangle.scale(
      new Rectangle(selection.x, selection.y, selection.w, selection.h),
      1 / scale
    )

    const relativeSelection = Rectangle.toRelative(unscaledObject, image)

    switch (selectedTool) {
      case Tool.LABEL:
        createLabels(relativeSelection)
        break
      case Tool.AREA:
        createAreas(relativeSelection)
        break

      case Tool.TABLE:
        createTables(relativeSelection)
        break

      case Tool.DETECT_TABLES: {
        detectTables(selection, relativeSelection)
        break
      }

      default:
        break
    }
  }, [
    selectedTool,
    scale,
    image,
    createLabels,
    createAreas,
    createTables,
    detectTables
  ])

  const onObjectSelection = useCallback((selectedObjects) => {
    if (!OBJECT_SELECTION_ENABLED_TOOLS.includes(selectedTool)) {
      return
    }

    selectLabels(selectedObjects)
    selectAreas(selectedObjects)
    selectTables(selectedObjects)
  }, [
    selectedTool,
    selectLabels,
    selectAreas,
    selectTables
  ])

  const onObjectsSelectionClear = useCallback(() => {
    setActiveSidebar(SidebarContent.MARKUP)
    clearSelection(currentPage)
  }, [
    clearSelection,
    currentPage,
    setActiveSidebar
  ])

  const selectedObjectsIds = useMemo(() => [
    ...selectedLabels.map((l) => l.uid),
    ...selectedTables.map((t) => t.uid),
    ...selectedAreas.map((a) => a.uid)
  ], [
    selectedAreas,
    selectedLabels,
    selectedTables
  ])

  const onTablesUpdate = useMemo(() => getThrottledFunction(updateTables), [updateTables])

  const Tables = useMemo(() => (
    tables.map((table) => (
      <CanvasTable
        key={table.uid}
        mode={TOOL_TO_TABLE_MODE[selectedTool]}
        table={table}
        onUpdate={onTablesUpdate}
        selectable={OBJECT_SELECTION_ENABLED_TOOLS.includes(selectedTool)}
        scale={scale}
        image={image}
      />
    ))
  ), [
    onTablesUpdate,
    image,
    scale,
    selectedTool,
    tables
  ])

  const Zoom = useMemo(() => (
    <CanvasZoom
      zoom={zoom}
      setZoom={setZoom}
    />
  ), [
    setZoom,
    zoom
  ])

  const Dragger = useMemo(() => (
    <CanvasDragger />
  ), [])

  const onAreasUpdate = useMemo(() => getThrottledFunction(updateAreas), [updateAreas])

  const Areas = useMemo(() => (
    areas.map((area) => (
      <CanvasArea
        key={area.uid}
        area={area}
        onUpdate={onAreasUpdate}
        selectable={OBJECT_SELECTION_ENABLED_TOOLS.includes(selectedTool)}
        scale={scale}
        image={image}
      />
    ))
  ), [
    onAreasUpdate,
    areas,
    image,
    scale,
    selectedTool
  ])

  const onLabelsUpdate = useMemo(() => getThrottledFunction(updateLabels), [updateLabels])

  const Labels = useMemo(() => (
    labels.map((label) => (
      <CanvasLabel
        key={label.uid}
        label={label}
        onUpdate={onLabelsUpdate}
        isContentVisible={settings.mode !== Mode.MARKUP}
        selectable={OBJECT_SELECTION_ENABLED_TOOLS.includes(selectedTool)}
        scale={scale}
        image={image}
      />
    ))
  ), [
    labels,
    onLabelsUpdate,
    settings.mode,
    selectedTool,
    scale,
    image
  ])

  const Relations = useMemo(() => (
    relations.map((relation) => (
      <CanvasRelation
        key={relation.uid}
        relation={relation}
        scale={scale}
        image={image}
      />
    ))
  ), [
    image,
    relations,
    scale
  ])

  const MouseSelection = useMemo(() => [...OBJECT_CREATION_ENABLED_TOOLS, ...OBJECT_SELECTION_ENABLED_TOOLS].includes(selectedTool) && (
    <CanvasMouseSelection
      onSelectionEnd={onSelectionEnd}
    />
  ), [
    onSelectionEnd,
    selectedTool
  ])

  const ObjectsSelection = useMemo(() => OBJECT_SELECTION_ENABLED_TOOLS.includes(selectedTool) && (
    <CanvasObjectsSelection
      selectedObjectsIds={selectedObjectsIds}
      onSelection={onObjectSelection}
      onSelectionClear={onObjectsSelectionClear}
    />
  ), [
    onObjectsSelectionClear,
    onObjectSelection,
    selectedTool,
    selectedObjectsIds
  ])

  const Background = useMemo(() => {
    if (!scale) {
      return null
    }

    return (
      <CanvasBackground
        url={imageUrl}
        color={COLORS.PRIMARY_5}
        scale={scale}
        rotationAngle={rotationAngle}
        image={image}
        setImage={setImage}
        setScale={setScale}
      />
    )
  }, [
    image,
    imageUrl,
    rotationAngle,
    scale,
    setImage,
    setScale
  ])

  return (
    <>
      <Canvas
        width={width}
        height={height}
      >
        {Zoom}
        {Dragger}
        {Background}
        {MouseSelection}
        {Labels}
        {Relations}
        {Tables}
        {Areas}
        {ObjectsSelection}
      </Canvas>
      <DefaultCanvasHotKeys />
    </>
  )
}

const mapStateToProps = (state) => ({
  imageUrl: pageImageUrlSelector(state),
  currentPage: currentPageSelector(state),
  zoom: zoomSelector(state),
  scale: scaleSelector(state),
  image: imageSelector(state),
  settings: settingsSelector(state),
  selectedTool: selectedToolSelector(state),
  rotationAngle: pageRotationAngleSelector(state),
  relations: pageRelationsSelector(state)
})

const mapDispatchToProps = {
  setZoom,
  clearSelection,
  setImage,
  setScale,
  detectTablesProp: detectTables,
  setActiveSidebar
}

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(LabelingCanvas)

LabelingCanvas.propTypes = {
  settings: settingsShape.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  selectedTool: PropTypes.oneOf(
    Object.values(Tool)
  ).isRequired,
  zoom: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  scale: PropTypes.number.isRequired,
  image: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  setZoom: PropTypes.func.isRequired,
  clearSelection: PropTypes.func.isRequired,
  rotationAngle: PropTypes.number,
  setImage: PropTypes.func,
  setScale: PropTypes.func,
  detectTablesProp: PropTypes.func.isRequired,
  relations: PropTypes.arrayOf(relationShape),
  setActiveSidebar: PropTypes.func.isRequired
}

export {
  ConnectedComponent as LabelingCanvas
}
