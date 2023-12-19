import React from 'react'
import { shallow } from 'enzyme'
import { CommentsButton } from '@/containers/CommentsButton'

describe('Container: CommentButton', () => {
  const wrapper = shallow(<CommentsButton />)

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
