import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockModelActions } from '@/mocks/actions/model'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import { shallow } from 'enzyme'
import { updateLabelsWithSettings, updateTablesWithSettings } from '@/actions/markup'
import { updateFieldsToDelete } from '@/actions/model'
import { deleteTemporaryFieldIndex } from '@/actions/ui'
import { Button } from '@/components/Button'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { PairFieldMeta, ListFieldMeta } from '@/models/FieldMeta'
import { Label, LabelType, LABEL_TYPE_NAME } from '@/models/Label'
import { FieldsToAssign } from './FieldsToAssign'
import {
  PossibleNamesList,
  ListItemStyled
} from './FieldsToAssign.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/actions/model', () => mockModelActions)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

jest.mock('@/containers/AssignTo/AssignToListItem', () => mockComponent('AssignToListItem'))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn((f) => f),
  useMemo: jest.fn((f) => f())
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = FieldsToAssign

describe('Container: FieldsToAssign', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedState = {
        selectedMarkupObjects: mockMarkupSelectors.pageSelectedMarkupObjectsSelector(),
        filter: mockUiSelectors.assignToFieldsFilterSelector(),
        markup: mockMarkupSelectors.markupSelector(),
        fieldsToDelete: mockModelSelectors.fieldsToDeleteSelector()
      }
      expect(props).toEqual(expectedState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass deleteTemporaryFieldIndex action as prop to WrappedComponent', () => {
      props.deleteTemporaryFieldIndex({
        code: 'test',
        index: 1
      })
      expect(deleteTemporaryFieldIndex).nthCalledWith(1, {
        code: 'test',
        index: 1
      })
    })

    it('should pass updateLabelsWithSettings action as prop to WrappedComponent', () => {
      props.updateLabelsWithSettings([])
      expect(updateLabelsWithSettings).nthCalledWith(1, [])
    })

    it('should pass updateTablesWithSettings action as prop to WrappedComponent', () => {
      props.updateTablesWithSettings([])
      expect(updateTablesWithSettings).nthCalledWith(1, [])
    })

    it('should pass updateFieldsToDelete action as prop to WrappedComponent', () => {
      props.updateFieldsToDelete([])
      expect(updateFieldsToDelete).nthCalledWith(1, [])
    })
  })

  let wrapper, defaultProps

  const fields = [
    new Field('1', 'FirstField', FieldType.STRING),
    new Field('2', 'SecondField', FieldType.PAIR),
    new Field('3', 'ThirdField', FieldType.TABLE),
    new Field(
      'MOCK_FIELD_1',
      'name',
      FieldType.LIST,
      new ListFieldMeta(
        FieldType.PAIR,
        new PairFieldMeta(FieldType.STRING, FieldType.STRING)
      )
    ),
    new Field(
      'MOCK_FIELD_4',
      'name',
      FieldType.LIST,
      new ListFieldMeta(
        FieldType.TABLE
      )
    ),
    new Field('checkboxina', 'Check box i na', FieldType.CHECKMARK),
    new Field('enum', 'enum', FieldType.ENUM)
  ]

  const fieldsGrouping = 'View All'

  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props,
      fields,
      fieldsToDelete: undefined,
      fieldsGrouping
    }
    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for string field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[0])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for pair field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[1])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for table field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[2])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for list field type with pair as base field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[3])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for list field type with table as base field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[4])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should match snapshot of renderItem for checkmark field type', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[5])
    const listWrapper = shallow(<div>{list}</div>)
    expect(listWrapper).toMatchSnapshot()
  })

  it('should call updateLabelsWithSettings with correct argument when Boolean button is clicked', () => {
    const namesList = wrapper.find(PossibleNamesList)
    const itemRender = namesList.props().renderItem(defaultProps.fields[5])
    const listWrapperProps = shallow(<div>{itemRender}</div>)
    const listToAssignProps = listWrapperProps.find(ListItemStyled).props()
    const btns = shallow(<div>{listToAssignProps.actions}</div>)
    const btnProps = btns.find(Button).props()
    btnProps.onClick()
    const [selectedObject] = defaultProps.selectedMarkupObjects
    expect(defaultProps.updateLabelsWithSettings).nthCalledWith(1, {
      ...selectedObject,
      content: null,
      fieldCode: defaultProps.fields[5].code,
      type: LabelType.CHECKMARK,
      index: undefined
    })
  })

  it('should match snapshot if several markup objects are selected', () => {
    defaultProps.selectedMarkupObjects = [
      new Label(1, 2, 3, 4, 'testCode1', undefined, LabelType.STRING, ''),
      new Label(1, 2, 3, 4, 'testCode2', undefined, LabelType.STRING, '')
    ]

    wrapper.setProps(defaultProps)
    const namesList = wrapper.find(PossibleNamesList)
    const ListItem = namesList.props().renderItem(defaultProps.fields[0])
    const ListItemWrapper = shallow(<div>{ListItem}</div>)
    expect(ListItemWrapper).toMatchSnapshot()
  })

  it('should call updateLabelsWithSettings when clicked on labels list item', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[3])

    const { code, fieldMeta } = defaultProps.fields[3]

    list.props.renderDeleteButton(code, fieldMeta.baseType, 0).props.onClick()
    expect(updateLabelsWithSettings).toHaveBeenCalled()
  })

  it('should call updateTablesWithSettings when clicked on tables list item', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[4])

    const { code, fieldMeta } = defaultProps.fields[4]

    list.props.renderDeleteButton(code, fieldMeta.baseType).props.onClick()
    expect(updateTablesWithSettings).toHaveBeenCalled()
  })

  it('should call deleteTemporaryIndex when clicked on temporary list item', () => {
    const input = wrapper.find(PossibleNamesList)
    const list = input.props().renderItem(defaultProps.fields[4])

    list.props.renderDeleteButton('countryState', LABEL_TYPE_NAME, 2).props.onClick()
    expect(deleteTemporaryFieldIndex).toHaveBeenCalled()
  })
})
