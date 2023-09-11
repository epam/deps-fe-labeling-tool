import { mockUiActions } from '@/mocks/actions/ui'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockUiSelectors } from '@/mocks/selectors/ui'
import React from 'react'
import { shallow } from 'enzyme'
import { setAssignToFieldsFilter } from '@/actions/ui'
import { AddFieldDrawer } from '@/containers/AddFieldDrawer'
import { SearchInput } from '@/containers/SearchInput'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { AssignTo } from './AssignTo'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)
jest.mock('@/selectors/ui', () => mockUiSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/containers/AddFieldDrawer', () => mockComponent('AddFieldDrawer'))
jest.mock('@/containers/FieldsDeleteModeManager', () => mockComponent('FieldsDeleteModeManager'))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = AssignTo

describe('Container: AssignTo', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const expectedState = {
        fields: mockModelSelectors.fieldsSelector(),
        filter: mockUiSelectors.assignToFieldsFilterSelector(),
        settings: mockSettingsSelectors.settingsSelector(),
        fieldsToDelete: mockModelSelectors.fieldsToDeleteSelector()
      }
      const { props } = mapStateToProps()
      expect(props).toEqual(expectedState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass setAssignToFieldsFilter action as prop to WrappedComponent', () => {
      props.setAssignToFieldsFilter('test')
      expect(setAssignToFieldsFilter).nthCalledWith(1, 'test')
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    const fields = [
      new Field('1', 'FirstField', FieldType.STRING),
      new Field('2', 'SecondField', FieldType.PAIR),
      new Field('3', 'ThirdField', FieldType.TABLE)
    ]

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        fields: fields,
        fieldsToDelete: undefined
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render empty layout', () => {
      defaultProps.filter = 'very long text'
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should filter fields correctly', () => {
      const input = wrapper.find(SearchInput)
      input.props().onChange('ThirdField')

      expect(wrapper).toMatchSnapshot()
    })

    it('should not render AddFieldDrawer if no addField feature in settings', () => {
      defaultProps.settings.features = []

      wrapper = shallow(<WrappedComponent {...defaultProps} />)

      expect(wrapper.find(AddFieldDrawer).exists()).toBe(false)
    })
  })
})
