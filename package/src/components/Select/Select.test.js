import React from 'react'
import { shallow } from 'enzyme'
import { Option } from '@/models/Option'
import {
  Select,
  SelectMode,
  enumToOptions,
  keyValueToOptions
} from './Select'

const MOCK_VALUE_1 = 'MOCK_VALUE_1'
const MOCK_VALUE_2 = 'MOCK_VALUE_2'

describe('Component: Select', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      allowSearch: true,
      allowClear: true,
      placeholder: 'MOCK_PLACEHOLDER',
      value: [MOCK_VALUE_1],
      onChange: jest.fn(),
      options: [
        new Option(MOCK_VALUE_1, 'MOCK_TEXT_1'),
        new Option(MOCK_VALUE_2, 'MOCK_TEXT_2')
      ],
      dropdownRender: jest.fn(),
      onSearch: jest.fn(),
      dropdownMatchSelectWidth: true,
      mode: SelectMode.MULTIPLE
    }

    wrapper = shallow(<Select {...defaultProps} />)
  })

  it('should render antd Select with correct value and options', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass correct onChange callback to antd Select', () => {
    expect(wrapper.props().onChange).toEqual(defaultProps.onChange)
  })

  it('should pass correct filterOption callback to the antd Select', () => {
    expect(wrapper.props().filterOption).toEqual(wrapper.instance().filterOption)
  })

  it('should filter options in case insensitive manner', () => {
    const options = [{
      content: 'Minsk',
      expected: true
    }, {
      content: 'Paris',
      expected: false
    }, {
      content: 'Milan',
      expected: true
    }, {
      content: {},
      expected: false
    }]

    const searchStr = 'mI'

    options.forEach((o) => {
      const option = {
        props: {
          children: o.content
        }
      }

      const output = wrapper.instance().filterOption(searchStr, option)
      expect(output).toEqual(o.expected)
    })
  })

  it('should getContainer be passed in case of the absence of the getPopupContainer prop', () => {
    expect(wrapper.props().getPopupContainer).toEqual(wrapper.instance().getContainer)
  })

  it('should render with props.getPopupContainer if it was passed', () => {
    const getPopupContainer = jest.fn()
    wrapper.setProps({ ...defaultProps, getPopupContainer })
    expect(wrapper.props().getPopupContainer).toEqual(getPopupContainer)
  })

  it('should keyValueToOptions return array of Option', () => {
    const arrOptions = keyValueToOptions({ test: 'test1', test2: 'test3' })
    expect(arrOptions).toEqual([new Option('test', 'test1'), new Option('test2', 'test3')])
  })

  it('should enumToOptions return array of Option', () => {
    const arrOptions = enumToOptions({ test: 'test', test1: 'test1' })
    expect(arrOptions).toEqual([new Option('test'), new Option('test1')])
  })
})
