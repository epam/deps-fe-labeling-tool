import { mockDayjs } from '@/mocks/mockDayjs'
import React from 'react'
import { shallow } from 'enzyme'
import { DatePicker } from './DatePicker'

jest.mock('dayjs', () => mockDayjs())

describe('Component: DatePicker', () => {
  let defaultProps
  let component

  beforeEach(() => {
    defaultProps = {
      value: null,
      onChange: jest.fn()
    }

    component = shallow(<DatePicker {...defaultProps} />)
  })

  it('should correct render default state', () => {
    expect(component).toMatchSnapshot()
  })

  it('should correct render with defined value', () => {
    component.setProps({
      ...defaultProps,
      value: '06-03-2020 8:30'
    })

    expect(component).toMatchSnapshot()
  })
})
