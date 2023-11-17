import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { updateTables, updateLabels } from '@/actions/markup'
import { Input } from '@/components/Input'
import { Table } from '@/models/Table'
import { ObjectCoordinates } from './ObjectCoordinates'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ObjectCoordinates

describe('Container: ObjectCoordinates', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateTables action as prop to WrappedComponent', async () => {
      await props.updateTables([])
      expect(updateTables).nthCalledWith(1, [])
    })

    it('should pass updateLabels action as prop to WrappedComponent', () => {
      props.updateLabels([])
      expect(updateLabels).nthCalledWith(1, [])
    })
  })

  let wrapper, defaultProps

  const event = {
    target: {
      value: '0.3'
    }
  }

  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should change value in input when triggered onChangeCoord', () => {
    let input = wrapper.find(Input).at(0)
    input.props().onChange(event)
    input = wrapper.find(Input).at(0)
    expect(input.props().value).toEqual(event.target.value)
  })

  it('should call updateLabels with correct args when entering the data', () => {
    const input = wrapper.find(Input).at(0)
    input.props().onPressEnter(event)
    expect(updateLabels).nthCalledWith(1, defaultProps.currentPage, defaultProps.selectedLabels)
  })

  it('should call updateTables with correct args when entering the data', () => {
    defaultProps.selectedLabels = []
    defaultProps.selectedTables = [new Table([0.1, 0.33], [0.32, 0.55])]
    wrapper = shallow(<WrappedComponent {...defaultProps} />)

    const input = wrapper.find(Input).at(0)
    input.props().onPressEnter(event)
    expect(updateTables).nthCalledWith(1, defaultProps.currentPage, defaultProps.selectedTables)
  })
})
