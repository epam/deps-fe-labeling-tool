import React from 'react'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { shallow } from 'enzyme'
import { setZoom } from '@/actions/canvas'
import { Slider } from '@/components/Slider'
import { ImageActions } from '@/containers/ImageActions/ImageActions'

jest.mock('@/containers/RotationControls', () => mockComponent('RotationControls'))

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

jest.mock('@/actions/canvas', () => ({
  setZoom: jest.fn()
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = ImageActions

describe('Container: ImageActions', () => {
  describe('mapStateToProps', () => {
    it('should pass expected props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass setZoom action to the props of WrappedComponent', () => {
      const { props } = mapDispatchToProps()
      props.setZoom()
      expect(setZoom).toHaveBeenCalledTimes(1)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = { ...mapStateToProps().props, ...mapDispatchToProps().props }
      wrapper = shallow(
        <WrappedComponent {...defaultProps} />
      )
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call setZoom function with expected arguments', () => {
      const slider = wrapper.find(Slider)
      slider.props().onChange(120)
      expect(setZoom).nthCalledWith(1, 1.2)
    })

    it('should call setZoom function with expected arguments (below min)', () => {
      const slider = wrapper.find(Slider)
      slider.props().onChange(40)
      expect(setZoom).nthCalledWith(1, 0.5)
    })

    it('should call setZoom function with expected arguments (above max)', () => {
      const slider = wrapper.find(Slider)
      slider.props().onChange(700)
      expect(setZoom).nthCalledWith(1, 5)
    })
  })
})
