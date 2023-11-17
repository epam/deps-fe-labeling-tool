import React from 'react'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import { shallow } from 'enzyme'
import { toggleExpandedListKey } from '@/actions/ui'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { ListFieldMeta } from '@/models/FieldMeta'
import { ListOfMarkupObjects } from './ListOfMarkupObjects'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('./PrimitiveMarkupObject', () => mockComponent('PrimitiveMarkupObject'))
jest.mock('@/selectors/ui', () => mockUiSelectors)

const mockField = new Field(
  'field_code',
  'Field Name',
  FieldType.LIST,
  new ListFieldMeta(FieldType.STRING)
)

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = ListOfMarkupObjects

describe('Container: ListOfMarkupObjects', () => {
  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should call for toggleExpandedListKey action from props', () => {
      props.toggleExpandedListKey()
      expect(toggleExpandedListKey).toHaveBeenCalledTimes(1)
    })
  })

  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedProps = {
        expandedListKeys: mockUiSelectors.expandedListKeysSelector()
      }
      expect(props).toEqual(expectedProps)
    })
  })

  describe('ConnectedComponent', () => {
    let defaultProps
    let wrapper

    beforeEach(() => {
      defaultProps = {
        field: mockField,
        markupObjects: mockMarkupSelectors.pageLabelsSelector(),
        renderMapper: {
          [FieldType.STRING]: jest.fn()
        },
        expandedListKeys: mockUiSelectors.expandedListKeysSelector(),
        ...mapDispatchToProps().props
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call toggleExpandedListKey with correct arg when calling onChange', () => {
      wrapper.props().onChange()

      expect(toggleExpandedListKey).toHaveBeenCalled()
    })
  })
})
