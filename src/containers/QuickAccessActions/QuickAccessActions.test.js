import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { shallow } from 'enzyme'
import { undo } from '@/actions/markup'
import { QuickAccessActions } from '.'

const { WrappedComponent, mapDispatchToProps } = QuickAccessActions

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/containers/SaveDropdown', () => mockComponent('SaveDropdown'))

describe('Container: QuickAcessActions', () => {
  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass undo action as prop to WrappedComponent', () => {
      props.undo()
      expect(undo).toHaveBeenCalledTimes(1)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    beforeEach(() => {
      defaultProps = {
        ...mapDispatchToProps().props
      }
      delete defaultProps.modifiedObjects

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
