import { mockUuid } from '@/mocks/mockUuid'
import React from 'react'
import { shallow } from 'enzyme'
import { Label, LabelType } from '@/models/Label'
import { ExtractArea } from './ExtractArea'

jest.mock('uuid', () => mockUuid)

describe('Container: ExtractArea', () => {
  it('should render OcrArea layout based on props', () => {
    const label = new Label(
      0.113,
      0.8104,
      0.017,
      0.0119,
      'enclosures',
      undefined,
      LabelType.STRING,
      'hello world',
      { data: 'some meta for enclosures value label' },
      0.66
    )
    const wrapper = shallow(<ExtractArea label={label} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct OmrArea layout based on props', () => {
    const label = new Label(
      0.113,
      0.8104,
      0.017,
      0.0119,
      'enclosures',
      undefined,
      LabelType.CHECKMARK,
      false,
      { data: 'some meta for enclosures value label' },
      0.66
    )
    const wrapper = shallow(<ExtractArea label={label} />)
    expect(wrapper).toMatchSnapshot()
  })
})
