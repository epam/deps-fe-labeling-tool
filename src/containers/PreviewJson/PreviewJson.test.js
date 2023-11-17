import React from 'react'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { shallow } from 'enzyme'
import { PreviewJson } from '@/containers/PreviewJson'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)

const {
  WrappedComponent,
  mapStateToProps
} = PreviewJson

describe('Container: PreviewJson', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('component', () => {
    let defaultProps, wrapper

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
