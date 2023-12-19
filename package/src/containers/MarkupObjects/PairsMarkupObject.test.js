import { mockComponent } from '@/mocks/mockComponent'
import { mockUuid } from '@/mocks/mockUuid'
import React from 'react'
import { shallow } from 'enzyme'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { LabelType, Label } from '@/models/Label'
import { PairsMarkupObject } from './PairsMarkupObject'

jest.mock('uuid', () => mockUuid)
jest.mock('@/models/Markup', () => ({
  ...jest.requireActual('@/models/Markup'),
  Markup: {
    getPageByObjectUid: jest.fn(() => 1)
  }
}))
jest.mock('./MarkupObjectHeader', () => mockComponent('MarkupObjectHeader'))

describe('Component: PairsMarkupObject', () => {
  describe('component', () => {
    let defaultProps, wrapper

    beforeEach(() => {
      defaultProps = {
        field: new Field('testPairCode', 'test Pair Name', FieldType.PAIR),
        markupObjects: [
          new Label(1, 2, 3, 4, 'testPairCode', undefined, LabelType.KEY, ''),
          new Label(1, 2, 3, 4, 'testPairCode', undefined, LabelType.VALUE, '')
        ]
      }

      wrapper = shallow(<PairsMarkupObject {...defaultProps} />)
    })

    it('should render correct layout', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
