import { mockModelActions } from '@/mocks/actions/model'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import React from 'react'
import { shallow } from 'enzyme'
import { addTemporaryFieldIndex } from '@/actions/ui'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { PairFieldMeta, ListFieldMeta } from '@/models/FieldMeta'
import { AssignToListItem } from './AssignToListItem'
import { Button } from './AssignToListItem.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/actions/model', () => mockModelActions)

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(() => ({
    current: {
      lastChild: {
        scrollIntoView: jest.fn()
      }
    }
  }))
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = AssignToListItem

describe('Container: AssignToListItem', () => {
  describe('mapStateToProps', () => {
    it('should expected state to be equal WrappedComponent props', () => {
      const expectedState = {
        markup: mockMarkupSelectors.markupSelector(),
        temporaryFieldsIndexes: mockUiSelectors.temporaryFieldsIndexesSelector(),
        fieldsToDelete: mockModelSelectors.fieldsToDeleteSelector(),
        filter: mockUiSelectors.assignToFieldsFilterSelector()
      }
      const { props } = mapStateToProps()
      expect(props).toEqual(expectedState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass addTemporaryFieldIndex action as prop to WrappedComponent', () => {
      props.addTemporaryFieldIndex({
        code: 'test',
        index: 1
      })
      expect(addTemporaryFieldIndex).nthCalledWith(1, {
        code: 'test',
        index: 1
      })
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        renderActions: jest.fn(),
        renderDeleteButton: jest.fn(),
        listIcon: <span></span>,
        temporaryFieldsIndexes: {
          MOCK_FIELD_1: [1, 2, 3]
        },
        field: new Field(
          'MOCK_FIELD_1',
          'name',
          FieldType.LIST,
          new ListFieldMeta(
            FieldType.PAIR,
            new PairFieldMeta(FieldType.STRING, FieldType.STRING)
          )
        ),
        fieldsToDelete: undefined,
        requiredMark: <span>*</span>
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correct layout if markup is null', () => {
      defaultProps.markup = null
      wrapper.setProps(defaultProps)

      expect(wrapper).toMatchSnapshot()
    })

    it('should call addTemporaryFieldIndex when click on button "Add new"', () => {
      wrapper.find(Button).props().onClick()

      expect(addTemporaryFieldIndex).nthCalledWith(1, {
        code: 'MOCK_FIELD_1',
        index: 4
      })
    })

    it('should correctly add temporary field index when no assigned markup objects', () => {
      defaultProps.field = new Field('code', 'name', FieldType.LIST)

      wrapper = shallow(<WrappedComponent {...defaultProps} />)

      wrapper.find(Button).props().onClick()

      expect(addTemporaryFieldIndex).nthCalledWith(1, {
        code: 'code',
        index: 1
      })
    })
  })
})
