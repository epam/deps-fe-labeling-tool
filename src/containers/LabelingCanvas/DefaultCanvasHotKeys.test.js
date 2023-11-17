import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { shallow } from 'enzyme'
import { reset, undo, redo, copyMarkup, pasteMarkup } from '@/actions/markup'
import { DefaultCanvasHotKeys } from './DefaultCanvasHotKeys'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

const { WrappedComponent, mapDispatchToProps } = DefaultCanvasHotKeys

describe('Component: DefaultCanvasHotKeys', () => {
  let defaultProps
  beforeEach(() => {
    defaultProps = {
      registerHandlers: jest.fn(),
      ...mapDispatchToProps().props
    }

    shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should call registerHandlers on mount', () => {
    expect(defaultProps.registerHandlers).toHaveBeenCalled()
  })
})

describe('mapDispatchToProps', () => {
  const { props, dispatch } = mapDispatchToProps()

  it('should dispatch undo action when calling to undo prop', () => {
    props.undo()
    expect(undo).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(undo())
  })

  it('should dispatch reset action when calling to reset prop', () => {
    props.reset()
    expect(reset).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(reset())
  })

  it('should dispatch copyMarkup action when calling to copyMarkup prop', () => {
    props.copyMarkup()
    expect(copyMarkup).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(copyMarkup())
  })

  it('should dispatch pasteMarkup action when calling to pasteMarkup prop', () => {
    props.pasteMarkup()
    expect(pasteMarkup).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(pasteMarkup())
  })

  it('should dispatch redo action when calling to redo prop', () => {
    props.redo()
    expect(redo).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(redo())
  })
})
