import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { updateLabels } from '@/actions/markup'
import { Label, LabelType } from '@/models/Label'
import { SpecialSymbols } from './SpecialSymbols'
import { SymbolButton } from './SpecialSymbols.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn((f) => [true, jest.fn]),
  useCallback: jest.fn((f) => f),
  useMemo: jest.fn((f) => f())
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = SpecialSymbols

describe('Container: SpecialSymbols', () => {
  describe('mapStateToProps', () => {
    it('should pass expected props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass updateLabels action to the props of WrappedComponent', () => {
      const { props } = mapDispatchToProps()
      props.updateLabels()
      expect(updateLabels).toHaveBeenCalledTimes(1)
    })
  })

  describe('Component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        label: new Label(1, 2, 3, 4, 'MOCK_FIELD_CODE_1', undefined, LabelType.VALUE, 'mock content 1')

      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call updateLabels with correct args when calling SymbolButton onClick (onCLick)', () => {
      const SymbolButtonWrapper = wrapper.find(SymbolButton).at(0)
      const mockClickEvent = { currentTarget: { innerText: 'mockInnerText' } }
      SymbolButtonWrapper.props().onClick(mockClickEvent)

      const expectedSecondArg = [
        {
          ...defaultProps.label,
          content:
            defaultProps.label.content + mockClickEvent.currentTarget.innerText
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
