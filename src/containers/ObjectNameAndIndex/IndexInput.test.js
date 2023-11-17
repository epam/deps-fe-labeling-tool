import React from 'react'
import { mockUiActions } from '@/mocks/actions/ui'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { shallow } from 'enzyme'
import { deleteTemporaryFieldIndex } from '@/actions/ui'
import { IndexInput } from '@/containers/ObjectNameAndIndex/IndexInput'
import { Field } from '@/models/Field'
import { Table } from '@/models/Table'
import { NumericInput } from './IndexInput.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/ui', () => mockUiActions)

const { WrappedComponent, mapDispatchToProps } = IndexInput

const fields = [
  new Field('1', 'FirstField', 'string'),
  new Field('2', 'SecondField', 'pair'),
  new Field('3', 'ThirdField', 'table')
]

const testTable = new Table(
  [790, 1190],
  [550, 580],
  [],
  [],
  { meta: 'some meta' },
  'countryState',
  1
)
const mockOnChange = jest.fn()

describe('Container: IndexInput', () => {
  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass deleteTemporaryFieldIndex action as prop to WrappedComponent', () => {
      props.deleteTemporaryFieldIndex({
        code: 'test',
        index: 1
      })
      expect(deleteTemporaryFieldIndex).nthCalledWith(1, {
        code: 'test',
        index: 1
      })
    })
  })

  describe('WrappedComponent', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapDispatchToProps().props,
        fields,
        onChange: mockOnChange,
        object: testTable
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
      jest.clearAllMocks()
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call onChange prop when index from table and value from arg do not match', () => {
      const input = wrapper.find(NumericInput)
      input.props().onChange('nomatch')
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
    })

    it('should not call onChange prop when index from table and value arg match', () => {
      const input = wrapper.find(NumericInput)
      input.props().onChange(1)
      expect(defaultProps.onChange).toHaveBeenCalledTimes(0)
    })

    it('should call deleteTemporaryIndex when change index', () => {
      const mockNewIndex = 3
      const input = wrapper.find(NumericInput)
      input.props().onChange(mockNewIndex)
      expect(deleteTemporaryFieldIndex).nthCalledWith(1, {
        code: defaultProps.object.fieldCode,
        index: mockNewIndex
      })
    })
  })
})
