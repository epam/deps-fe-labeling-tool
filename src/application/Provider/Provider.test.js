import { mockCommonActions } from '@/mocks/actions/common'
import { mockRedux } from '@/mocks/mockRedux'
import React from 'react'
import { render } from '@testing-library/react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { createStore } from 'redux'
import { resetDefault } from '@/actions/common'
import { Provider } from '@/application/Provider'

jest.mock('redux', () => mockRedux)

jest.mock('@/actions/common', () => mockCommonActions)

describe('Container: Provider', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(
      <Provider>
        <div />
      </Provider>
    )
  })

  it('should render correct layout', () => {
    const shallowRenderer = new ShallowRenderer()
    const wrapper = shallowRenderer.render(
      <Provider>
        <div />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should call store.dispatch with resetDefault on unmount', () => {
    const store = createStore()
    wrapper.unmount()
    expect(store.dispatch).nthCalledWith(1, resetDefault())
  })
})
