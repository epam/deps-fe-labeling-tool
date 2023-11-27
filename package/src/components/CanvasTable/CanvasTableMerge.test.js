import { MockCanvas, MockBorder } from '@/mocks/mockFabric'
import { mockUuid } from '@/mocks/mockUuid'
import React from 'react'
import { shallow } from 'enzyme'
import { CanvasMouseSelection } from '@/components/CanvasMouseSelection'
import {
  Table,
  toAbsolute,
  toRelative,
  mergeCells,
  CellValue,
  Cell,
  getMergeProjection
} from '@/models/Table'
import { BORDER_TYPE_NAME } from '@/models/Table/Border'
import { CanvasTableMerge } from './CanvasTableMerge'
import { FabricMergeProjection } from './FabricMergeProjection'

jest.mock('uuid', () => mockUuid)

jest.mock('./FabricBorder', () => ({
  FabricBorder: MockBorder
}))

const mockTable = new Table(
  [267, 497, 603],
  [840, 872, 906, 938],
  [],
  [
    new CellValue(0, 0, ''),
    new CellValue(1, 0, 'Piloncillo D 6HA'),
    new CellValue(2, 0, 'Original Hole')
  ]
)

const mockUpdatedTable = new Table(
  [567, 324, 503],
  [840, 872, 906, 938],
  [],
  [
    new CellValue(0, 0, ''),
    new CellValue(1, 0, 'Piloncillo D 6HA'),
    new CellValue(2, 0, 'Original Hole')
  ]
)

const cellsToMerge = [
  new Cell('1', mockTable, 267, 872, 230, 34, 1, 0, 'Piloncillo D 6HA'),
  new Cell('2', mockTable, 267, 906, 230, 31, 2, 0, 'Original Hole')
]

const mockData = [{
  data: {
    table: { },
    p1: { x: 1, y: 2 },
    p2: { x: 3, y: 4 },
    typeName: BORDER_TYPE_NAME,
    mergeable: true,
    cells: cellsToMerge
  }
}]

const mockSelection = { x: 1, y: 1, w: 10, h: 10 }

describe('Component: CanvasTableMerge', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      table: mockTable,
      scale: 1,
      image: {
        width: 1,
        height: 1
      },
      onUpdate: jest.fn()
    }

    wrapper = shallow(<CanvasTableMerge {...defaultProps} />)
  })

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass correct onSelectionEnd and onSelectionUpdate handlers to CanvasMouseSelection component', () => {
    const CanvasMouseSelectionProps = wrapper.find(CanvasMouseSelection).props()
    expect(CanvasMouseSelectionProps.onSelectionEnd).toEqual(wrapper.instance().onSelectionEnd)
    expect(CanvasMouseSelectionProps.onSelectionUpdate).toEqual(wrapper.instance().onSelectionUpdate)
  })

  it('should not call onUpdate when calling props.onSelectionEnd if there are no cellsToMerge', () => {
    const CanvasMouseSelectionProps = wrapper.find(CanvasMouseSelection).props()
    CanvasMouseSelectionProps.onSelectionEnd(mockSelection)
    expect(defaultProps.onUpdate).toHaveBeenCalledTimes(0)
  })

  it('should call onUpdate with correct props when calling props.onSelectionEnd if there are cellsToMerge', () => {
    mockData[0].data.table.uid = defaultProps.table.uid
    defaultProps.canvas.getObjects = jest.fn(() => mockData)
    const CanvasMouseSelectionProps = wrapper.find(CanvasMouseSelection).props()
    CanvasMouseSelectionProps.onSelectionEnd(mockSelection)
    const mockAbsolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockUpdatedTable = mergeCells(mockAbsolutePropsTable, cellsToMerge)
    expect(defaultProps.onUpdate).nthCalledWith(1, toRelative(mockUpdatedTable, defaultProps.scale, defaultProps.image))
  })

  it('should not call canvas.add when calling props.onSelectionUpdate if there are no cellsToMerge', () => {
    jest.clearAllMocks()
    const CanvasMouseSelectionProps = wrapper.find(CanvasMouseSelection).props()
    CanvasMouseSelectionProps.onSelectionUpdate()
    expect(defaultProps.canvas.add).toHaveBeenCalledTimes(0)
  })

  it('should call canvas.add and canvas.remove with correct props when calling props.onSelectionUpdate if there are cellsToMerge', () => {
    mockData[0].data.table.uid = defaultProps.table.uid
    defaultProps.canvas.getObjects = jest.fn(() => mockData)
    const CanvasMouseSelectionProps = wrapper.find(CanvasMouseSelection).props()
    CanvasMouseSelectionProps.onSelectionUpdate(mockSelection)
    const mockAbsolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const mockMergeProjection = getMergeProjection(mockAbsolutePropsTable, cellsToMerge)
    const mockFabricProjection = new FabricMergeProjection(mockMergeProjection)
    expect(defaultProps.canvas.add).toHaveBeenCalledWith(mockFabricProjection)
    wrapper.instance().removeMergeProjection()
    expect(defaultProps.canvas.remove).toHaveBeenCalledWith(mockFabricProjection)
  })

  it('should call canvas.remove with correct props when calling removeBorders after ComponentDidUpdate', () => {
    const mockBorders = [1, 2, 3, 4]
    wrapper.instance().getRenderedBorders = jest.fn(() => mockBorders)
    wrapper.setProps({
      table: mockUpdatedTable
    })
    expect(defaultProps.canvas.remove).nthCalledWith(1, ...mockBorders)
  })

  it('should call reRenderTable with correct props when componentWillUnmount', () => {
    const reRenderTable = jest.spyOn(wrapper.instance(), 'reRenderTable')
    wrapper.unmount()
    expect(reRenderTable).toHaveBeenCalledWith(defaultProps.table)
  })
})
