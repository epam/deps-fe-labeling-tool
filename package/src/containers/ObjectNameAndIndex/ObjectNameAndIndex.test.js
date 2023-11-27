import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import React from 'react'
import { shallow } from 'enzyme'
import { Label, LabelType } from '@/models/Label'
import { ObjectNameAndIndex } from './ObjectNameAndIndex'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

jest.mock('@/components/Tooltip', () => mockComponent('Tooltip'))
jest.mock('./IndexInput', () => mockComponent('IndexInput'))

const {
  WrappedComponent,
  mapStateToProps
} = ObjectNameAndIndex

describe('Container: ObjectNameAndIndex', () => {
  describe('mapStateToProps', () => {
    it('should pass fields from modelSelector and pass as result to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props.fields).toEqual(mockModelSelectors.fieldsSelector())
    })

    it('should pass markup from markupSelector and pass as result to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props.markup).toEqual(mockMarkupSelectors.markupSelector())
    })
  })

  describe('ConnectedComponent', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        object: new Label(1, 2, 3, 4, 'testCode', undefined, LabelType.STRING, ''),
        onChange: jest.fn()
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should correctly render label with type key', () => {
      defaultProps.object = new Label(1, 2, 3, 4, 'testKey', undefined, LabelType.KEY, '')
      wrapper.setProps(defaultProps)
      expect(wrapper).toMatchSnapshot()
    })

    it('should correctly render label with type checkmark', () => {
      defaultProps.object = new Label(1, 2, 3, 4, 'testKey', undefined, LabelType.CHECKMARK, false)
      wrapper.setProps(defaultProps)
      expect(wrapper).toMatchSnapshot()
    })

    it('should correctly render unassignedLabel', () => {
      defaultProps.object = new Label(1, 2, 3, 4, '', undefined, LabelType.UNASSIGNED, '')
      wrapper.setProps(defaultProps)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
