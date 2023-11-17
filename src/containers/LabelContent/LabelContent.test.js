
import React from 'react'
import { mockUuid } from '@/mocks/mockUuid'
import { shallow } from 'enzyme'
import { Label, LabelType } from '@/models/Label'
import { LabelContent } from './LabelContent'
jest.mock('uuid', () => mockUuid)

describe('Container: LabelContent', () => {
  it('should render correct ContentTextArea layout based on props', () => {
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
    const wrapper = shallow(<LabelContent label={label} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct ContentCheckmarkRadio layout based on props', () => {
    const label = new Label(
      0.113,
      0.8104,
      0.017,
      0.0119,
      'enclosures',
      undefined,
      LabelType.CHECKMARK,
      true,
      { data: 'some meta for enclosures value label' },
      0.66
    )
    const wrapper = shallow(<LabelContent label={label} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct ContentEnum layout based on props', () => {
    const label = new Label(
      0.113,
      0.8104,
      0.017,
      0.0119,
      'enum',
      undefined,
      LabelType.ENUM,
      'test',
      { data: 'some meta for enum value label' },
      0.66
    )
    const wrapper = shallow(<LabelContent label={label} />)
    expect(wrapper).toMatchSnapshot()
  })
})
