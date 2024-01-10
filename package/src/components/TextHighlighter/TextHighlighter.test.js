import React from 'react'
import { shallow } from 'enzyme'
import { TextHighlighter } from '.'

describe('TextHighlighter', () => {
  let defaultProps
  let wrapper

  beforeEach(() => {
    defaultProps = {
      text: 'mock Text',
      searchTerm: 'm'
    }

    wrapper = shallow(<TextHighlighter {...defaultProps} />)
  })

  it('should render layout correctly in case there is a match in text', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render layout correctly in case there is no match in text', () => {
    wrapper.setProps({
      ...defaultProps,
      searchTerm: 'hey'
    })

    expect(wrapper).toMatchSnapshot()
  })
})
