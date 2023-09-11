
import React from 'react'
import { Dropdown, Menu } from 'antd'
import { shallow } from 'enzyme'
import { Option } from '@/models/Option'
import { openMenu } from './ContextMenu'

let ComponentToShallow

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  render: jest.fn((jsxObject, placeToRender) => {
    ComponentToShallow = jsxObject
  }),
  unmountComponentAtNode: jest.fn()
}))

describe('Components: ContextMenu', () => {
  Object.defineProperty(HTMLDivElement.prototype, 'remove', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: jest.fn()
  })

  const mockEvent = {
    key: 'some key'
  }

  let wrapper
  const x = 10
  const y = 10
  const options = [
    new Option('option value', 'option text', true)
  ]
  const context = 'some context'
  const onSelection = jest.fn()

  beforeEach(() => {
    openMenu(x, y, options, context, onSelection)
    wrapper = shallow(ComponentToShallow)
  })

  it('should render ContextMenu with correct props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call onSelection with correct args on onClick call', () => {
    const { overlay } = wrapper.find(Dropdown).props()
    const menuWrapper = shallow(<div>{overlay}</div>)
    menuWrapper.find(Menu).props().onClick(mockEvent)
    expect(onSelection).toHaveBeenCalledWith(mockEvent.key, context)
  })

  it('should not call unmount on componentDidUpdate with visible=true', () => {
    jest.useFakeTimers()
    wrapper.setState({ visible: false })
    jest.advanceTimersByTime(300)
    wrapper.setState({ visible: true })
    expect(HTMLDivElement.prototype.remove).toHaveBeenCalledTimes(1)
  })

  it('should call unmount on componentDidUpdate with visible=false', () => {
    jest.useFakeTimers()
    wrapper.setState({ visible: false })
    jest.advanceTimersByTime(300)
    expect(HTMLDivElement.prototype.remove).toHaveBeenCalled()
  })
})
