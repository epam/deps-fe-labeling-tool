
import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@/components/Button'
import { NothingFound } from './NothingFound'

describe('Container: NothingFound', () => {
  let wrapper
  let defaultProps
  beforeEach(() => {
    defaultProps = {
      resetFilter: jest.fn()
    }

    wrapper = shallow(<NothingFound {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call resetFilter when calling to button onClick', () => {
    wrapper.find(Button).props().onClick()

    expect(defaultProps.resetFilter).toHaveBeenCalled()
  })
})
