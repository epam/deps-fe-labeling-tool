import React from 'react'
import { shallow } from 'enzyme'
import { withCanvas } from '@/components/CanvasProvider'

const WithCanvas = withCanvas(() => null)

const MOCK_CANVAS = {}

describe('HOC: CanvasProvider', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<WithCanvas canvas={MOCK_CANVAS} />)
  })

  it('should render wrapped component if canvas was provided', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should not render anything if canvas was not provided', () => {
    wrapper.setProps({
      canvas: undefined
    })

    expect(wrapper.children().exists()).toBeFalsy()
  })
})
