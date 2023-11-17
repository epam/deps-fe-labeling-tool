import React from 'react'
import { mockFabric, MockCanvas, MockCell, MockTable } from '@/mocks/mockFabric'
import { mockUuid } from '@/mocks/mockUuid'
import { shallow } from 'enzyme'
import { openMenu } from '@/components/ContextMenu'
import { Point } from '@/models/Point'
import { Rectangle } from '@/models/Rectangle'
import {
  Table,
  addColumn,
  addRow,
  toAbsolute,
  toRelative,
  deleteColumn,
  deleteRow,
  getPosition,
  move
} from '@/models/Table'
import { getPositionAndSizeBeforeScaling } from '@/utils/fabric'
import { CanvasTableDefault } from './CanvasTableDefault'

const mockPoint = new Point(1, 1)
jest.mock('./FabricCell', () => ({
  FabricCell: MockCell
}))

jest.mock('./FabricTable', () => ({
  FabricTable: MockTable
}))

jest.mock('fabric', () => mockFabric)

jest.mock('@/utils/fabric', () => ({
  withSuppressedSelectionEvents: jest.fn((canvas, callback) => callback()),
  getAbsoluteCanvasPosition: jest.fn(() => mockPoint),
  getPositionAndSizeBeforeScaling: jest.fn(() => ({ x: 1, y: 1 })),
  applyScale: jest.fn((arg) => arg),
  atSameSpot: jest.fn(),
  saveSelection: jest.fn((arg) => arg),
  disableRotationControls: jest.fn()
}))

jest.mock('uuid', () => mockUuid)

jest.mock('@/components/ContextMenu', () => ({
  openMenu: jest.fn()
}))

describe('Component: CanvasTableDefault', () => {
  let defaultProps
  let wrapper
  let opts
  let transformOpts

  const toRender = new Table(
    [22, 33],
    [55, 66]
  )

  const shiftKeys = {
    ADD_COLUMN: 'add-column',
    ADD_ROW: 'add-row',
    DELETE_COLUMN: 'delete-column',
    DELETE_ROW: 'delete-row'
  }

  beforeEach(() => {
    defaultProps = {
      canvas: new MockCanvas(),
      onUpdate: jest.fn(),
      table: new Table(
        [11, 22],
        [44, 55]
      ),
      selectable: false,
      scale: 1,
      image: {
        width: 1,
        height: 1
      }
    }

    opts = {
      button: 3,
      target: {
        left: 5,
        top: 3,
        data: {
          x: 22,
          y: 55,
          w: 22,
          h: 55
        },
        set: jest.fn(() => ({ setCoords: jest.fn() }))
      },
      nextTarget: {
        data: {
          typeName: 'cell',
          table: {
            uid: 'test'
          },
          x: 1,
          y: 2
        },
        left: 1,
        top: 2
      },
      e: { shiftKey: shiftKeys.ADD_ROW, clientX: 3, clientY: 4 }
    }

    transformOpts = {
      e: { ...opts.e },
      transform: { ...opts }
    }

    defaultProps.canvas.getActiveObjects = () => ([{
      data: {
        typeName: 'cell',
        uid: defaultProps.table.uid
      }
    }])

    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)
  })

  it('should register correct canvas events callbacks and canvas.on should be called 2 times', () => {
    jest.clearAllMocks()

    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.on).toBeCalledTimes(2)
    expect(defaultProps.canvas.on).nthCalledWith(1, 'object:moved', wrapper.instance().onMoveOrScale)
    expect(defaultProps.canvas.on).nthCalledWith(2, 'object:scaled', wrapper.instance().onMoveOrScale)
  })

  it('should check that passed prop canvas is the same as component prop canvas', () => {
    expect(wrapper.instance().canvas).toEqual(defaultProps.canvas)
  })

  it('should not call prop onUpdate if there is no renderedTable in onMoveOrScale', () => {
    defaultProps.canvas.getActiveObjects = () => ([{
      data: { uid: 'test' }
    }])
    wrapper.instance().onMoveOrScale()

    expect(defaultProps.onUpdate).not.toBeCalled()
  })

  it('should call prop onUpdate if there is a renderedTable in onMoveOrScale', () => {
    const absolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const position = getPosition(toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image))
    const deltaX = 1 - position.x
    const deltaY = 1 - position.y
    const argOnUpdate = toRelative(move(absolutePropsTable, deltaX, deltaY), defaultProps.scale, defaultProps.image)

    wrapper.instance().onMoveOrScale()

    expect(defaultProps.onUpdate).nthCalledWith(1, argOnUpdate)
  })

  it('should register correct canvas events callbacks when calling to off', () => {
    const onMoveOrScale = wrapper.instance().onMoveOrScale
    wrapper.unmount()

    expect(defaultProps.canvas.off).nthCalledWith(1, 'object:moved', onMoveOrScale)
    expect(defaultProps.canvas.off).nthCalledWith(2, 'object:scaled', onMoveOrScale)
  })

  it('should not render any layout', () => {
    expect(wrapper.isEmptyRender()).toBe(true)
  })

  it('should call canvas.getObjects method when calling to getRenderedGroup', () => {
    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.getObjects).nthCalledWith(1)
  })

  it('should call canvas.add method when calling to componentDidshallow and it trigger renderTable and groupTable', () => {
    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.add).nthCalledWith(1, expect.any(MockCell))
    expect(defaultProps.canvas.add).nthCalledWith(2, expect.any(MockTable))
  })

  it('should call canvas.add method when calling to renderRectangle when component updated', () => {
    wrapper.setProps({ ...defaultProps, scale: 2 })

    expect(defaultProps.canvas.add).nthCalledWith(1, expect.any(MockCell))
  })

  it('should call canvas.setActiveObject method when calling to onCellMouseDblClick', () => {
    wrapper.instance().onCellMouseDblClick(opts)

    expect(defaultProps.canvas.setActiveObject).nthCalledWith(1, expect.any(MockTable))
  })

  it('should call onUpdate method when calling to onCellMoved', () => {
    const before = getPositionAndSizeBeforeScaling(transformOpts)
    const deltaX = transformOpts.transform.target.left - before.x
    const deltaY = transformOpts.transform.target.top - before.y
    const absolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const movedTable = move(absolutePropsTable, deltaX, deltaY)
    const updatedTable = toRelative(movedTable, defaultProps.scale, defaultProps.image)

    wrapper.instance().onCellMoving(transformOpts)
    wrapper.instance().onCellMoved()

    expect(defaultProps.onUpdate).nthCalledWith(1, updatedTable)
  })

  it('should call canvas.fire method when calling to onTableMouseUp', () => {
    wrapper.instance().onTableMouseUp(opts)

    expect(defaultProps.canvas.fire).nthCalledWith(1, 'selection:cleared')
  })

  it('should call canvas.getActiveObject method when calling to getSelectedTable', () => {
    wrapper.setProps({ ...defaultProps, scale: 2 })

    expect(defaultProps.canvas.getActiveObject).toBeCalledTimes(2)
  })

  it('should call canvas.getActiveObject method when calling to getSelectedCell', () => {
    wrapper.setProps({ ...defaultProps, scale: 2 })

    expect(defaultProps.canvas.getActiveObject).toBeCalledTimes(2)
  })

  it('should return ao.data when calling to getSelectedCell and conditional !isCellSelected || ao.data.table.uid !== table.uid was not executed', () => {
    wrapper.setProps({ ...defaultProps, scale: 2 })
    const ao = defaultProps.canvas.getActiveObjects()

    expect(defaultProps.canvas.getActiveObject).toBeCalledTimes(2)
    expect(wrapper.instance().getSelectedCell(defaultProps.table)).toBe(ao.data)
  })

  it('should call canvas.add with correctly args when calling to onTableMouseUp and opts.button === MouseButton.RIGHT', () => {
    jest.clearAllMocks()

    defaultProps.table.uid = '1'

    wrapper.instance().onTableMouseUp(opts)

    expect(defaultProps.canvas.add).nthCalledWith(1, 'testEl')
  })

  it('should call canvas.fire with correctly args when calling to onTableMouseUp and opts.button === MouseButton.RIGHT', () => {
    wrapper.instance().onTableMouseUp(opts)

    expect(defaultProps.canvas.fire).nthCalledWith(1, 'selection:cleared')
  })

  it('should call canvas.findTarget with correctly args when calling to onTableMouseUp and opts.button === MouseButton.RIGHT', () => {
    wrapper.instance().onTableMouseUp(opts)

    expect(defaultProps.canvas.findTarget).nthCalledWith(1, opts.e)
  })

  it('should call openContextMenu with correctly args when calling to onTableMouseUp and opts.button === MouseButton.RIGHT', () => {
    const mockResult = 'test'
    defaultProps.table.uid = '1'
    defaultProps.canvas.findTarget = jest.fn(() => mockResult)

    wrapper.setProps(defaultProps)

    wrapper.instance().onTableMouseUp(opts)

    expect(openMenu).nthCalledWith(
      1,
      opts.e.clientX,
      opts.e.clientY,
      expect.any(Array),
      mockResult,
      wrapper.instance().onContextMenuSelection
    )
  })

  it('should not call canvas.fire methods when calling to onTableMouseUp and opts.button !== MouseButton.RIGHT', () => {
    wrapper.instance().onTableMouseUp({ ...opts, button: 0 })

    expect(defaultProps.canvas.fire).not.toBeCalled()
  })

  it('should not call canvas.add methods when calling to onTableMouseUp and opts.button !== MouseButton.RIGHT', () => {
    jest.clearAllMocks()

    wrapper.instance().onTableMouseUp({ ...opts, button: 0 })

    expect(defaultProps.canvas.add).not.toBeCalled()
  })

  it('should not call canvas.remove methods when calling to onTableMouseUp and opts.button !== MouseButton.RIGHT', () => {
    jest.clearAllMocks()

    wrapper.instance().onTableMouseUp({ ...opts, button: 0 })

    expect(defaultProps.canvas.remove).not.toBeCalled()
  })

  it('should not call canvas.getActiveObject method when calling to onTableMouseOver if selectable is set to false', () => {
    wrapper.instance().onTableMouseOver()
    expect(defaultProps.canvas.getActiveObject).not.toBeCalled()
  })

  it('should call canvas.getActiveObject method when calling to onTableMouseOver if selectable is set to true', () => {
    wrapper.setProps({ ...defaultProps, selectable: true })
    wrapper.instance().onTableMouseOver(opts)

    expect(defaultProps.canvas.getActiveObject).toBeCalled()
  })

  it('should finish execution onTableMouseOver when isTable returns true', () => {
    defaultProps.canvas.getActiveObject = jest.fn(() => ({ data: { uid: defaultProps.table.uid } }))
    wrapper.setProps({ ...defaultProps, selectable: true })

    jest.clearAllMocks()

    wrapper.instance().onTableMouseOver(opts)

    expect(defaultProps.canvas.add).not.toBeCalled()
  })

  it('should call canvas.getActiveObject but not calling ungroupTable in onTableMouseOver method, if isTable return true', () => {
    wrapper.setProps({ ...defaultProps, selectable: true })
    jest.clearAllMocks()
    wrapper.instance().onTableMouseOver(opts)

    expect(defaultProps.canvas.getActiveObject).toBeCalled()
    expect(defaultProps.canvas.add).not.toBeCalled()
  })

  it('should call canvas.requestRenderAll when calling to onCellMouseOver and ao !== opts.target', () => {
    wrapper.instance().onCellMouseOver(opts)
    expect(defaultProps.canvas.requestRenderAll).toBeCalled()
  })

  it('should not call canvas.requestRenderAll when calling to onCellMouseOver and ao == opts.target', () => {
    defaultProps.canvas.getActiveObject = () => opts.target
    wrapper.instance().onCellMouseOver(opts)

    expect(defaultProps.canvas.requestRenderAll).not.toBeCalled()
  })

  it('should not be executed onCellMouseOut when isTableCell returns false', () => {
    jest.clearAllMocks()

    defaultProps.table.uid = 'test'

    wrapper.instance().onCellMouseOut(opts)

    expect(defaultProps.canvas.add).not.toBeCalled()
  })

  it('should call canvas.add when calling to onCellMouseOut', () => {
    jest.clearAllMocks()

    wrapper.instance().onCellMouseOut(opts)

    expect(defaultProps.canvas.add).nthCalledWith(1, expect.any(MockTable))
  })

  it('should assign null restoreSelection when calling to onCellMouseOut', () => {
    wrapper.instance().restoreSelection = jest.fn()

    wrapper.instance().onCellMouseOut(opts)

    expect(wrapper.instance().restoreSelection).toBe(null)
  })

  it('should call canvas.fire method when calling to onCellMouseDown and restoreSelection exists', () => {
    wrapper.instance().restoreSelection = jest.fn()

    wrapper.instance().onCellMouseDown()

    expect(defaultProps.canvas.fire).toBeCalledWith('selection:cleared')
  })

  it('should call Table.addRow with correctly args in case when option === MenuOption.ADD_ROW', () => {
    defaultProps.table = new Table(
      [20, 32, 35, 50],
      [20, 50, 75, 83]
    )

    wrapper.setProps(defaultProps)

    opts.target.data = {
      x: 6,
      y: 25,
      h: 25,
      w: 5
    }

    const updateTable = addRow(defaultProps.table, defaultProps.table.yGuidelines[2])

    wrapper.instance().onContextMenuSelection(opts.e.shiftKey, opts.target)

    expect(defaultProps.onUpdate).nthCalledWith(1, updateTable)
  })

  it('should call Table.addRow with correct args in case when option === MenuOption.ADD_COLUMN', () => {
    defaultProps.table = new Table(
      [79, 89, 100, 125],
      [55, 77, 100, 120, 130]
    )

    wrapper.setProps(defaultProps)

    const target = {
      data: {
        x: 50,
        y: 111,
        h: 44,
        w: 50
      }
    }

    opts.e.shiftKey = shiftKeys.ADD_COLUMN

    const updateTable = addColumn(defaultProps.table, defaultProps.table.xGuidelines[3])
    wrapper.instance().onContextMenuSelection(opts.e.shiftKey, target)

    expect(defaultProps.onUpdate).nthCalledWith(1, updateTable)
  })

  it('should call Table.addRow with correctly args in case when option === MenuOption.DELETE_ROW', () => {
    const points = Rectangle.getPoints(opts.target.data)
    const absolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const updateTable = deleteRow(absolutePropsTable, points[0].y, points[1].y)
    opts.e.shiftKey = shiftKeys.DELETE_ROW

    wrapper.instance().onContextMenuSelection(opts.e.shiftKey, opts.target)

    expect(defaultProps.onUpdate).nthCalledWith(1, updateTable)
  })

  it('should call Table.addRow with correctly args in case when option === MenuOption.DELETE_COLUMN', () => {
    const points = Rectangle.getPoints(opts.target.data)
    const absolutePropsTable = toAbsolute(defaultProps.table, defaultProps.scale, defaultProps.image)
    const updateTable = deleteColumn(absolutePropsTable, points[0].x, points[1].x)
    opts.e.shiftKey = shiftKeys.DELETE_COLUMN

    wrapper.instance().onContextMenuSelection(opts.e.shiftKey, opts.target)

    expect(defaultProps.onUpdate).nthCalledWith(1, updateTable)
  })

  it('should call openContextMenu with correctly args when calling onCellMouseUp and ops.button === MouseButton.RIGHT', () => {
    wrapper.instance().onCellMouseUp(opts)

    expect(openMenu).nthCalledWith(
      1,
      opts.e.clientX,
      opts.e.clientY,
      expect.any(Array),
      opts.target,
      wrapper.instance().onContextMenuSelection
    )
  })

  it('should not call openContextMenu when calling onCellMouseUp and ops.button !== MouseButton.RIGHT', () => {
    wrapper.instance().onCellMouseUp({ ...opts, button: 0 })

    expect(openMenu).not.toBeCalled()
  })

  it('should call canvas.add method when calling to ungroupTable', () => {
    jest.clearAllMocks()

    defaultProps.table.uid = '1'
    wrapper.setProps(defaultProps)

    wrapper.instance().ungroupTable(defaultProps.table)

    expect(defaultProps.canvas.add).nthCalledWith(1, 'testEl')
  })

  it('should not call canvas.add method when calling to groupTable and alreadyExists exists', () => {
    defaultProps.canvas.getObjects = () => ([{
      data: {
        typeName: 'cell',
        uid: defaultProps.table.uid
      }
    }])

    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.add).nthCalledWith(1, expect.any(MockCell))
  })

  it('should call canvas.getObjects method when calling to getRenderedRectangles and group exists', () => {
    jest.clearAllMocks()

    defaultProps.table.uid = '1'

    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.getObjects).toBeCalledTimes(1)
  })

  it('should call twice canvas.getObjects method when calling to getRenderedRectangles and group not exists', () => {
    jest.clearAllMocks()

    wrapper = shallow(<CanvasTableDefault {...defaultProps} />)

    expect(defaultProps.canvas.getObjects).toBeCalledTimes(3)
  })

  it('should call props.onUpdate with correctly args when calling to onCellScaled', () => {
    const mockUpdatedTable = {
      typeName: 'table',
      uid: '18',
      xGuidelines: [4.1, 4.2],
      yGuidelines: [2.1, 2.2],
      merges: [],
      values: []
    }
    wrapper.instance().updatedTable = mockUpdatedTable

    wrapper.instance().onCellScaled()
    expect(defaultProps.onUpdate).nthCalledWith(1, mockUpdatedTable)
  })

  it('should call method reRenderTable with correct args when calling to onCellMoving', () => {
    const objects = [{ data: { uid: '1' }, getObjects: (arg) => arg }]
    defaultProps.table.uid = '1'
    defaultProps.canvas.getObjects = () => (objects)

    wrapper.setProps(defaultProps)

    jest.clearAllMocks()

    wrapper.instance().onCellMoving(transformOpts)

    expect(defaultProps.canvas.remove).nthCalledWith(1, objects[0])
  })

  it('should call method reRenderTable with correct args when calling to onCellScaling', () => {
    const objects = [{ data: { uid: '1' }, getObjects: (arg) => arg }]

    defaultProps.table.uid = '1'
    defaultProps.canvas.getObjects = () => (objects)

    wrapper.setProps(defaultProps)

    jest.clearAllMocks()

    wrapper.instance().onCellScaling(transformOpts)

    expect(defaultProps.canvas.remove).nthCalledWith(1, objects[0])
  })

  it('should call getRenderedGroup and getRenderedRectangles methods when calling to removeTable', () => {
    jest.clearAllMocks()

    wrapper.setProps({ ...defaultProps, table: toRender })

    expect(defaultProps.canvas.getObjects).toBeCalledTimes(4)
  })

  it('should call canvas.setActiveObject when calling to withPreservedSelectionDuringReRender and cellSelectedBefore exists', () => {
    const objects = [
      {
        data: { uid: '1' },
        getObjects: (arg) => arg
      }
    ]
    const uid = defaultProps.table.uid
    defaultProps.canvas.getObjects = () => (objects)
    defaultProps.table = toRender
    defaultProps.canvas.getActiveObject = jest.fn(() => (
      {
        data:
        {
          typeName: 'cell',
          table: { uid: uid },
          uid: '1'
        }
      }))

    wrapper.setProps(defaultProps)

    expect(defaultProps.canvas.setActiveObject).nthCalledWith(1, objects[0])
  })

  it('should call canvas.setActiveObject when calling to withPreservedSelectionDuringReRender and tableSelectedBefore exists', () => {
    const uid = defaultProps.table.uid
    defaultProps.table = toRender
    defaultProps.canvas.getObjects = jest.fn(() => (
      [
        {
          data: {
            uid: uid
          },
          getObjects: jest.fn()
        }
      ]))
    defaultProps.canvas.getActiveObject = jest.fn(() => (
      {
        data:
        {
          uid: uid,
          table: { uid: uid }
        }
      }))

    wrapper.setProps(defaultProps)

    expect(defaultProps.canvas.setActiveObject).nthCalledWith(1, expect.any(MockTable))
  })

  it('should call groupTable if cellToSelect = undefined when calling to withPreservedSelectionDuringReRender', () => {
    const uid = defaultProps.table.uid
    defaultProps.canvas.getActiveObject = jest.fn(() => (
      {
        data: {
          typeName: 'cell',
          uid: 'test',
          table: { uid: uid }
        }
      }))
    defaultProps.canvas.getObjects = jest.fn(() => [])
    defaultProps.table = toRender

    wrapper.setProps(defaultProps)

    expect(defaultProps.canvas.setActiveObject).not.toBeCalled()
    expect(defaultProps.canvas.add).nthCalledWith(2, expect.any(MockTable))
  })

  it('should call groupTable when calling to withPreservedSelectionDuringReRender and cellToSelect exist', () => {
    const uid = defaultProps.table.uid
    const object = {
      data: { uid: 'test' },
      getObjects: jest.fn()
    }
    defaultProps.canvas.getActiveObject = jest.fn(() => (
      {
        data: {
          typeName: 'cell',
          uid: 'test',
          table: { uid: uid }
        }
      }))
    defaultProps.canvas.getObjects = jest.fn(() => [object])
    defaultProps.table = toRender

    wrapper.setProps(defaultProps)

    expect(defaultProps.canvas.setActiveObject).nthCalledWith(1, object)
  })
})
