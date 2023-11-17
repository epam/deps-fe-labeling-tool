import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { updateLabels } from '@/actions/markup'
import { RadioGroup } from '@/components/Radio'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { Label, LabelType } from '@/models/Label'
import { ContentCheckmarkRadio } from './ContentCheckmarkRadio'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ContentCheckmarkRadio

describe('Container: ContentCheckmarkRadio', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedState = {
        currentPage: mockPaginationSelectors.currentPageSelector()
      }
      expect(props).toEqual(expectedState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateLabels action as prop to WrappedComponent', () => {
      props.updateLabels()
      expect(updateLabels).toHaveBeenCalled()
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        label: new Label(
          0.113,
          0.8104,
          0.017,
          0.0119,
          'enclosures',
          undefined,
          LabelType.CHECKMARK,
          true,
          { data: 'some meta for enclosures value label' },
          0.66
        )
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout based on props', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call props updateLabels with correct argument in case of calling to RadioGroup onChange', () => {
      const radioGroupProps = wrapper.find(RadioGroup).props()
      radioGroupProps.onChange(false)
      expect(defaultProps.updateLabels).nthCalledWith(
        1,
        defaultProps.currentPage,
        [
          {
            ...defaultProps.label,
            content: false,
            confidence: CONFIDENCE_ON_MANUAL_CHANGE
          }
        ])
    })
  })
})
