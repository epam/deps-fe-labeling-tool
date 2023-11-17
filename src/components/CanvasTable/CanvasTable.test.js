import React from 'react'
import { MockCanvas } from '@/mocks/mockFabric'
import { mockUuid } from '@/mocks/mockUuid'
import { shallow } from 'enzyme'
import { Table } from '@/models/Table'
import { CanvasTable, CanvasTableMode } from './CanvasTable'
import { CanvasTableDefault } from './CanvasTableDefault'
import { CanvasTableMerge } from './CanvasTableMerge'
import { CanvasTableSplit } from './CanvasTableSplit'

jest.mock('@/components/CanvasProvider', () => ({ withCanvas: (c) => c }))
jest.mock('uuid', () => mockUuid)

describe('Component: CanvasTable', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      mode: CanvasTableMode.DEFAULT,
      canvas: new MockCanvas(),
      onUpdate: jest.fn(),
      table: new Table(
        [10, 20],
        [10, 20]
      ),
      selectable: false,
      scale: 1,
      image: {
        width: 1,
        height: 1
      }
    }

    wrapper = shallow(<CanvasTable {...defaultProps} />)
  })

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render CanvasTableDefault with mode:DEFAULT', () => {
    const TableDefault = wrapper.find(CanvasTableDefault)
    expect(TableDefault.exists()).toBe(true)
  })

  it('should render CanvasTableSplit with mode:SPLIT', () => {
    wrapper.setProps({ mode: CanvasTableMode.SPLIT })
    const TableSplit = wrapper.find(CanvasTableSplit)
    expect(TableSplit.exists()).toBe(true)
  })

  it('should render CanvasTableMerge with mode:MERGE', () => {
    wrapper.setProps({ mode: CanvasTableMode.MERGE })
    const TableMerge = wrapper.find(CanvasTableMerge)
    expect(TableMerge.exists()).toBe(true)
  })
})
