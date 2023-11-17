import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { shallow } from 'enzyme'
import { updateLabels } from '@/actions/markup'
import { CONFIDENCE_ON_MANUAL_CHANGE } from '@/constants/constants'
import { Label, LabelType } from '@/models/Label'
import { ContentTextArea } from './ContentTextArea'
import { TextAreaStyled } from './ContentTextArea.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/containers/SpecialSymbols', () =>
  mockComponent('SpecialSymbols')
)
jest.mock('@/hocs/debounce', () => ({
  debounce: () => (Component) => Component
}))
jest.mock('uuid', () => mockUuid)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ContentTextArea

describe('Container: ContentTextArea', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      const expectedState = {
        currentPage: mockPaginationSelectors.currentPageSelector(),
        settings: mockSettingsSelectors.settingsSelector()
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

    it('should call updateLabels prop with correct args when calling TextArea onChange (onContentChange)', () => {
      const TextAreaWrapper = wrapper.find(TextAreaStyled)
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
  })
})
