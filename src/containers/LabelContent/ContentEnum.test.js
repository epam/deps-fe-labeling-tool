import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { updateLabels } from '@/actions/markup'
import { Autocomplete } from '@/components/Autocomplete'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { Label, LabelType } from '@/models/Label'
import { Option } from '@/models/Option'
import { ContentEnum } from './ContentEnum'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ContentEnum

describe('Container: ContentEnum', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()

      const expectedState = {
        currentPage: mockPaginationSelectors.currentPageSelector(),
        fields: mockModelSelectors.fieldsSelector()
      }

      expect(props).toEqual(expectedState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateLabels action as prop to WrappedComponent', () => {
      props.updateLabels([])
      expect(updateLabels).nthCalledWith(1, [])
    })
  })

  let wrapper, defaultProps

  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props,
      label: new Label(
        0.1,
        0.2,
        0.3,
        0.4,
        'enum',
        undefined,
        LabelType.ENUM,
        'test',
        { data: 'some data' },
        0.7
      )
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render correct layout based on props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call props updateLabels with correct argument in case of calling to Autocomplete onChange', () => {
    const radioGroupProps = wrapper.find(Autocomplete).props()
    radioGroupProps.onChange('newValue')
    expect(defaultProps.updateLabels).nthCalledWith(
      1,
      defaultProps.currentPage,
      [
        {
          ...defaultProps.label,
          content: 'newValue',
          confidence: CONFIDENCE_ON_MANUAL_CHANGE
        }
      ])
  })

  it('should set correct options to Autocomplete if there are list of enums', () => {
    const enumListFieldCode = 'enumList'
    const enumListField = defaultProps.fields.find((f) => f.code === enumListFieldCode)
    const options = enumListField.fieldMeta.baseTypeMeta.options.map((o) => new Option(o))

    defaultProps.label = new Label(
      0.1,
      0.2,
      0.3,
      0.4,
      enumListFieldCode,
      1,
      LabelType.ENUM,
      'test',
      { data: 'some data' },
      0.7
    )

    wrapper = shallow(<WrappedComponent {...defaultProps} />)

    expect(wrapper.find(Autocomplete).props().options).toEqual(options)
  })
})
