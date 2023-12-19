/* eslint-disable jest/no-conditional-expect */

import { mockUuid } from '@/mocks/mockUuid'
import React from 'react'
import { shallow } from 'enzyme'
import { Table, CellsMerge, CellValue } from '@/models/Table'
import { StyledHotTable } from './HandsonTable.styles'
import {
  HandsonTable,
  HTMerge,
  HTColumn
} from '.'

jest.mock('uuid', () => mockUuid)

const mockData = new Table(
  [10, 20, 30, 40],
  [50, 60, 70, 80],
  [new CellsMerge(1, 0, 1, 2)],
  [new CellValue(0, 0, '', 0.3), new CellValue(1, 0, 'Piloncillo D', 0.8)],
  {},
  'codeTable',
  1,
  1
)

const mockChangedCellData = [
  [
    1,
    2,
    'prevValue',
    'newValue'
  ]
]

const mockSourceData = [
  ['test'],
  ['test1']
]
const mockMergedCells = []
const mockExtra = <div>mock extra box</div>

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    paddingTop: '5px',
    paddingBottom: '5px'
  })
})

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createRef: () => ({
    current: {
      hotInstance: {
        getSettings: jest.fn(),
        updateSettings: jest.fn(),
        getSourceData: jest.fn(() => mockSourceData),
        selectCells: jest.fn(),
        renderExtra: jest.fn(() => mockExtra),
        scrollViewportTo: jest.fn(),
        getPlugin: jest.fn(() => ({
          mergedCellsCollection: {
            mergedCells: mockMergedCells
          },
          enablePlugin: jest.fn(),
          disablePlugin: jest.fn(),
          recalculateAllRowsHeight: jest.fn(),
          getColumnHeaderHeight: jest.fn(() => 25),
          heights: [23, 23, 23]
        }))
      },
      hotElementRef: {
        offsetHeight: 114,
        parentNode: {
          paddingTop: '5px',
          paddingBottom: '5px'
        }
      }
    }
  })
}))

jest.mock('./Cell', () => ({
  renderCell: jest.fn()
}))

describe('Component: HandsonTable', () => {
  let defaultProps
  let wrapper
  let htProps
  const EventSource = {
    EDIT: 'edit',
    LOAD_DATA: 'loadData',
    POPULATE_FROM_ARRAY: 'populateFromArray'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    defaultProps = {
      activePage: 1,
      onChangeData: jest.fn(),
      columns: [
        new HTColumn('0.value'),
        new HTColumn('1.value')
      ],
      data: mockData,
      mergeCells: [
        new HTMerge(0, 1, 2, 1)
      ],
      readOnly: false,
      saveData: jest.fn(),
      renderExtra: jest.fn()
    }

    wrapper = shallow(<HandsonTable {...defaultProps} />)
    htProps = wrapper.find(StyledHotTable).props()
  })

  it('should render correct layout', () => {
    expect(wrapper.dive()).toMatchSnapshot()
  })

  it('should set readonly to true in case of props.readOnly is true', () => {
    defaultProps.readOnly = true
    wrapper.setProps(defaultProps)
    const { readOnly } = wrapper.find(StyledHotTable).props()
    expect(readOnly).toEqual(true)
  })

  it('should call props.saveData only in case of EventSource is `edit` and calling afterChange handsonTable hook', () => {
    Object.values(EventSource).forEach((s) => {
      htProps.afterChange(mockChangedCellData, s)

      if (s === EventSource.EDIT) {
        expect(defaultProps.saveData).nthCalledWith(1, mockChangedCellData[0])
        jest.clearAllMocks()
      } else {
        expect(defaultProps.saveData).not.toHaveBeenCalled()
      }
    })
  })
})
