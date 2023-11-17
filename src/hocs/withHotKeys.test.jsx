
import React from 'react'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockHotKeysSelectors } from '@/mocks/selectors/hotkeys'
import { shallow } from 'enzyme'
import { HotKeyEvent } from '@/constants/hotKeys'
import { withHotKeys } from '@/hocs/withHotKeys'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/hotkeys', () => mockHotKeysSelectors)

const MockComponent = (props) => <div {...props}>test</div>

const withHotKeysComponent = withHotKeys(MockComponent)

const {
  mapStateToProps,
  mapDispatchToProps,
  WrappedComponent
} = withHotKeysComponent

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: jest.fn((f) => f()),
  useCallback: jest.fn((f) => f)
}))

describe('HOC: withHotKeys', () => {
  let defaultProps, wrapper

  beforeEach(() => {
    defaultProps = {
      value: 'test',
      ...mapDispatchToProps().props,
      ...mapStateToProps().props
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should corrcetly set keyMap when called registerHandlers', () => {
    wrapper.children().props().registerHandlers({ [HotKeyEvent.DELETE]: jest.fn() })
    expect(wrapper.props().keyMap).toEqual({ [HotKeyEvent.DELETE]: HotKeyEvent.DELETE.getShortcutsArray() })
  })

  it('should call registerHotKeyEvents when called registerHandlers', () => {
    wrapper.children().props().registerHandlers({ [HotKeyEvent.DELETE]: jest.fn })
    expect(defaultProps.registerHotKeyEvents).nthCalledWith(1, [HotKeyEvent.DELETE.name])
  })

  it('should not call registerHotKeyEvents when called registerHandlers with already registerd hotkey', () => {
    wrapper.children().props().registerHandlers({ [HotKeyEvent.COPY]: jest.fn() })
    expect(defaultProps.registerHotKeyEvents).not.toHaveBeenCalled()
  })

  it('should be an empty object if registerHandlers arg does not match hotKeyShortcuts', () => {
    wrapper.children().props().registerHandlers({ test: jest.fn() })
    expect(wrapper.props().keyMap).toEqual({})
  })
})
