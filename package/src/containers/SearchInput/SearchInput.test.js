import React from 'react'
import { shallow } from 'enzyme'
import { SearchInput } from './SearchInput'

jest.mock('@/hocs/debounce', () => ({
  debounce: () => (Component) => Component
}))

describe('Components: SearchInput', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      value: 'search',
      onChange: jest.fn(() => 'test_value')
    }
    wrapper = shallow(<SearchInput {...defaultProps} />)
  })

  it('should render Input with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
