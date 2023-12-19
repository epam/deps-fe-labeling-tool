import React from 'react'
import { shallow } from 'enzyme'
import { debounce } from '@/hocs/debounce'

const MockComponent = (props) => <div {...props}>test</div>

const mockLodashDebounce = jest.fn((f) => f)
jest.mock('lodash/debounce', () => jest.fn((...arg) => mockLodashDebounce(...arg)))

describe('HOC: debounce', () => {
  let defaultProps, wrapper, DebouncedMockComponent

  const wait = 100
  const getValue = jest.fn((value) => value + 1)

  beforeEach(() => {
    defaultProps = {
      onChange: jest.fn(),
      value: 'test',
      testProps: 1
    }

    DebouncedMockComponent = debounce()(MockComponent)

    wrapper = shallow(<DebouncedMockComponent {...defaultProps} />)
  })

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call props.onChange with correct arg', () => {
    wrapper.props().onChange('hi')
    expect(defaultProps.onChange).nthCalledWith(1, 'hi')
  })

  it('should correctly transmit data', () => {
    wrapper.props().onChange('hi')
    expect(wrapper.props().value).toEqual('hi')
  })

  it('should call getValue arg in case calling to passed component prop onChange', () => {
    DebouncedMockComponent = debounce({ wait, getValue })(MockComponent)

    wrapper = shallow(<DebouncedMockComponent {...defaultProps} />)

    wrapper.props().onChange('hi')
    expect(getValue).toBeCalledWith('hi')
  })

  it('should called lodashDebounce with correctly arg', () => {
    DebouncedMockComponent = debounce({ wait, getValue })(MockComponent)

    wrapper = shallow(<DebouncedMockComponent {...defaultProps} />)

    wrapper.props().onChange('hi')
    expect(mockLodashDebounce).nthCalledWith(2, expect.any(Function), wait)
  })
})
