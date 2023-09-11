
import { mockCanvasActions } from '@/mocks/actions/canvas'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockImageSelectors } from '@/mocks/selectors/image'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import React from 'react'
import { shallow } from 'enzyme'
import { setRotationAngle } from '@/actions/canvas'
import { updatePageMarkup } from '@/actions/markup'
import { Button } from '@/components/Button'
import { RotationControls } from './RotationControls'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/actions/canvas', () => mockCanvasActions)
jest.mock('@/actions/markup', () => mockMarkupActions)

jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/image', () => mockImageSelectors)

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = RotationControls

describe('Container: RotationControls', () => {
  describe('mapStateToProps', () => {
    it('should pass expected props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass setRotationAngle action to the props of WrappedComponent', () => {
      const { props } = mapDispatchToProps()
      props.setRotationAngle()
      expect(setRotationAngle).toHaveBeenCalledTimes(1)
    })

    it('should pass updatePageMarkup action to the props of WrappedComponent', () => {
      const { props } = mapDispatchToProps()
      props.updatePageMarkup()
      expect(updatePageMarkup).toHaveBeenCalledTimes(1)
    })
  })

  describe('Component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        setRotationAngle: jest.fn(),
        angle: 0,
        currentPage: 1,
        pageMarkup: mockMarkupSelectors.pageMarkupStateSelector(),
        updatePageMarkup: jest.fn(),
        registerHandlers: jest.fn()
      }
      wrapper = shallow(
        <WrappedComponent {...defaultProps} />
      )
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call setRotationAngle when on rotate left button click', () => {
      const angle = 270
      const button = wrapper.find(Button.Icon).at(0)
      button.props().onClick()
      expect(defaultProps.setRotationAngle).nthCalledWith(1, defaultProps.currentPage, angle)
    })

    it('should call setRotationAngle when on rotate right button click', () => {
      const angle = 90
      const button = wrapper.find(Button.Icon).at(1)
      button.props().onClick()
      expect(defaultProps.setRotationAngle).nthCalledWith(1, defaultProps.currentPage, angle)
    })
  })
})
