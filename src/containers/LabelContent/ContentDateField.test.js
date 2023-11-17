import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockDayjs } from '@/mocks/mockDayjs'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import dayjs from 'dayjs'
import { shallow } from 'enzyme'
import { updateLabels } from '@/actions/markup'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { Label, LabelType } from '@/models/Label'
import { dayjsToString } from '@/utils/dayjs'
import { ContentDateField } from './ContentDateField'
import { StyledDatePicker, StyledInput } from './ContentDateField.styles'

jest.mock('dayjs', () => mockDayjs())
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/containers/SpecialSymbols', () =>
  mockComponent('SpecialSymbols')
)
jest.mock('@/hocs/debounce', () => ({
  debounce: () => (Component) => Component
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ContentDateField

describe('Container: ContentDateField', () => {
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

  describe('Component', () => {
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
          'date',
          { data: 'some meta for enclosures value label' },
          0.66
        )
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout based on props', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call updateLabels prop with correct args when calling StyledInput onChange', () => {
      const TextAreaWrapper = wrapper.find(StyledInput)
      const mockValue = 'mockValue'
      TextAreaWrapper.props().onChange(mockValue)

      const expectedSecondArg = [
        {
          ...defaultProps.label,
          content: mockValue,
          confidence: CONFIDENCE_ON_MANUAL_CHANGE
        }
      ]

      expect(updateLabels).nthCalledWith(
        1,
        defaultProps.currentPage,
        expectedSecondArg
      )
    })

    it('should call updateLabels prop with correct args when calling StyledDatePicker onChange', () => {
      const TextAreaWrapper = wrapper.find(StyledDatePicker)
      const mockValue = dayjs()
      TextAreaWrapper.props().onChange(mockValue)

      const expectedSecondArg = [
        {
          ...defaultProps.label,
          content: dayjsToString(mockValue),
          confidence: CONFIDENCE_ON_MANUAL_CHANGE
        }
      ]

      expect(updateLabels).nthCalledWith(
        1,
        defaultProps.currentPage,
        expectedSecondArg
      )
    })
  })
})
