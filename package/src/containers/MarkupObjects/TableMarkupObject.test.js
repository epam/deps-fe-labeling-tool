import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import React from 'react'
import { shallow } from 'enzyme'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { TableMarkupObject } from './TableMarkupObject'

jest.mock('uuid', () => mockUuid)

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('./MarkupObjectHeader', () => mockComponent('MarkupObjectHeader'))

const mockObjectPage = 1

const {
  WrappedComponent,
  mapStateToProps
} = TableMarkupObject

describe('Component: TableMarkupObject', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedProps = {
        markup: mockMarkupSelectors.markupSelector()
      }

      expect(props).toEqual(expectedProps)
    })
  })

  describe('component', () => {
    let defaultProps, wrapper

    beforeEach(() => {
      defaultProps = {
        field: new Field('MOCK_FIELD_4', 'test Field Name', FieldType.TABLE),
        table: mockMarkupSelectors.markupSelector()[mockObjectPage].tables[0],
        markup: mockMarkupSelectors.markupSelector(),
        selectTables: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call selectTables props with correct values when table is selected', () => {
      const objectHeaderProps = wrapper.find(MarkupObjectHeader).props()
      objectHeaderProps.onHeaderClick()
      expect(defaultProps.selectTables).nthCalledWith(1, mockObjectPage, [defaultProps.table])
    })
  })
})
