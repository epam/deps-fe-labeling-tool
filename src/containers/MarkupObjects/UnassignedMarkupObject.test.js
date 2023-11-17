import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { shallow } from 'enzyme'
import { MarkupObjectHeader } from '@/containers/MarkupObjects/MarkupObjectHeader'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LabelType, LABEL_TYPE_NAME, Label } from '@/models/Label'
import { Markup } from '@/models/Markup'
import { Table } from '@/models/Table'
import { UnassignedMarkupObject } from './UnassignedMarkupObject'

jest.mock('uuid', () => mockUuid)
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/models/Markup', () => ({
  ...jest.requireActual('@/models/Markup'),
  Markup: {
    getPageByObjectUid: jest.fn(() => '1')
  }
}))
jest.mock('./MarkupObjectHeader', () => mockComponent('MarkupObjectHeader'))

const { WrappedComponent, mapStateToProps } = UnassignedMarkupObject

describe('Component: UnassignedMarkupObject', () => {
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

    const mockObjectPage = Markup.getPageByObjectUid()

    beforeEach(() => {
      defaultProps = {
        field: new Field('_testCode', LABEL_TYPE_NAME, FieldType.STRING),
        markupObjects: [
          new Label(
            1,
            2,
            3,
            4,
            '_testCode',
            undefined,
            LabelType.UNASSIGNED,
            ''
          )
        ],
        markup: mockMarkupSelectors.markupSelector(),
        selectTables: jest.fn(),
        selectLabels: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call selectLabels with correct args in case of calling  MarkupObjectHeader prop onHeaderClick', () => {
      wrapper.find(MarkupObjectHeader).props().onHeaderClick()
      expect(defaultProps.selectLabels).nthCalledWith(1, mockObjectPage, defaultProps.markupObjects)
    })

    it('should call selectTables with correct args in case of calling  MarkupObjectHeader prop onHeaderClick', () => {
      defaultProps.markupObjects = [new Table(
        [10, 20],
        [10, 20]
      )]
      wrapper.setProps(defaultProps)

      wrapper.find(MarkupObjectHeader).props().onHeaderClick()
      expect(defaultProps.selectTables).nthCalledWith(1, mockObjectPage, defaultProps.markupObjects)
    })
  })
})
