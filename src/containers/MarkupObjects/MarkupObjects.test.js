import React from 'react'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import { shallow } from 'enzyme'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LABEL_TYPE_NAME } from '@/models/Label'
import { MarkupObjects } from './MarkupObjects'

jest.mock('uuid', () => mockUuid)
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

const MOCK_FIELD_NAME = 'MOCK_FIELD_1'

const { WrappedComponent, mapStateToProps } = MarkupObjects

describe('Container: MarkupObjects', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedProps = {
        fields: mockModelSelectors.fieldsSelector(),
        markup: mockMarkupSelectors.markupSelector(),
        markupObjectsFilter: mockUiSelectors.markupObjectsFilterSelector()
      }

      expect(props).toEqual(expectedProps)
    })
  })

  describe('ConnectedComponent', () => {
    let defaultProps
    let wrapper
    beforeEach(() => {
      defaultProps = {
        markup: mockMarkupSelectors.markupSelector(),
        fields: [new Field(MOCK_FIELD_NAME, LABEL_TYPE_NAME, FieldType.LIST)],
        markupObjectsFilter: mockUiSelectors.markupObjectsFilterSelector(),
        fieldsGrouping: 'viewAll',
        setFilter: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correct layout without markup', () => {
      defaultProps = {
        ...defaultProps,
        markup: null
      }
      wrapper.setProps(defaultProps)

      expect(wrapper).toMatchSnapshot()
    })
  })
})
