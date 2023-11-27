import { mockUiActions } from '@/mocks/actions/ui'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import React from 'react'
import { shallow } from 'enzyme'
import { setMarkupObjectsFilter, setExpandedListKeys } from '@/actions/ui'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LABEL_TYPE_NAME } from '@/models/Label'
import { AllMarkupObjects } from './AllMarkupObjects'
import { ButtonIcon } from './AllMarkupObjects.styles'

jest.mock('uuid', () => mockUuid)
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/containers/MarkupObjects', () => mockComponent('MarkupObjects'))

const MOCK_FIELD_NAME = 'MOCK_FIELD_1'

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = AllMarkupObjects

describe('Container: AllMarkupObject', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedProps = {
        documentName: mockDocumentSelectors.documentNameSelector(),
        extraName: mockDocumentSelectors.extraNameSelector(),
        fields: mockModelSelectors.fieldsSelector(),
        markupObjectsFilter: mockUiSelectors.markupObjectsFilterSelector(),
        expandedListKeys: mockUiSelectors.expandedListKeysSelector()
      }

      expect(props).toEqual(expectedProps)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should call for setMarkupObjectsFilter action from props', () => {
      props.setMarkupObjectsFilter()
      expect(setMarkupObjectsFilter).toHaveBeenCalledTimes(1)
    })

    it('should pass setExpandedListKeys action as setExpandedListKeys prop', () => {
      const { props } = mapDispatchToProps()
      props.setExpandedListKeys()
      expect(setExpandedListKeys).toHaveBeenCalledTimes(1)
    })
  })

  describe('ConnectedComponent', () => {
    let defaultProps
    let wrapper
    beforeEach(() => {
      defaultProps = {
        documentName: mockDocumentSelectors.documentNameSelector(),
        extraName: mockDocumentSelectors.extraNameSelector(),
        fields: [new Field(MOCK_FIELD_NAME, LABEL_TYPE_NAME, FieldType.LIST)],
        markupObjectsFilter: mockUiSelectors.markupObjectsFilterSelector(),
        expandedListKeys: mockUiSelectors.expandedListKeysSelector(),
        ...mapDispatchToProps().props
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call setExpandedListKeys with correct arg when calling collapse all button onClick', () => {
      const mockClickEvent = {
        stopPropagation: jest.fn()
      }

      const collapseAll = shallow(<div>
        {
          wrapper.props().extra
        }
      </div>).find(ButtonIcon).first()
      const collapseAllProps = collapseAll.find(ButtonIcon).props()
      collapseAllProps.onClick(mockClickEvent)
      expect(setExpandedListKeys).nthCalledWith(1, [])
    })

    it('should call setExpandedListKeys with correct arg when calling expand all button onClick', () => {
      const mockClickEvent = {
        stopPropagation: jest.fn()
      }
      const expandAll = shallow(<div>
        {
          wrapper.props().extra
        }
      </div>).find(ButtonIcon).at(1)
      const expandAllProps = expandAll.find(ButtonIcon).props()
      expandAllProps.onClick(mockClickEvent)
      expect(setExpandedListKeys).nthCalledWith(
        1,
        defaultProps.fields
          .filter(({ fieldType }) => fieldType === FieldType.LIST)
          .map((field) => field.code)
      )
    })
  })
})
