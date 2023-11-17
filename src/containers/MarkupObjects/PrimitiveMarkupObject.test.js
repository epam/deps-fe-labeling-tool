import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LABEL_TYPE_NAME } from '@/models/Label'
import { MarkupObjectHeader } from './MarkupObjectHeader'
import { PrimitiveMarkupObject } from './PrimitiveMarkupObject'

jest.mock('uuid', () => mockUuid)
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('./MarkupObjectHeader', () => mockComponent('MarkupObjectHeader'))

const mockObjectPage = 1

const {
  WrappedComponent,
  mapStateToProps
} = PrimitiveMarkupObject

describe('Component: PrimitiveMarkupObject', () => {
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
        field: new Field('MOCK_FIELD_1', LABEL_TYPE_NAME, FieldType.STRING),
        label: mockMarkupSelectors.markupSelector()[mockObjectPage].labels[0],
        markup: mockMarkupSelectors.markupSelector(),
        selectLabels: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call selectLabels props with correct values when label is selected', () => {
      const objectHeaderProps = wrapper.find(MarkupObjectHeader).props()
      objectHeaderProps.onHeaderClick()
      expect(defaultProps.selectLabels).nthCalledWith(1, mockObjectPage, [defaultProps.label])
    })
  })
})
