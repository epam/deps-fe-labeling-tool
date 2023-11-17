import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { updateLabels, updateTables } from '@/actions/markup'
import { ObjectProperties } from '@/containers/ObjectProperties/ObjectProperties'
import { Table } from '@/models/Table'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/actions/markup', () => mockMarkupActions)

jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)

jest.mock('./LabelProperties', () => mockComponent('LabelProperties'))
jest.mock('./TableProperties', () => mockComponent('TableProperties'))

jest.mock('uuid', () => mockUuid)

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = ObjectProperties

describe('Container: ObjectProperties', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateLabels action as prop to WrappedComponent', () => {
      props.updateLabels([])

      expect(updateLabels).nthCalledWith(1, [])
    })

    it('should pass updateTables action as prop to WrappedComponent', () => {
      props.updateTables([])

      expect(updateTables).nthCalledWith(1, [])
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly (one label)', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should render layout correctly (one table)', () => {
      wrapper.setProps({
        selectedLabels: [],
        selectedTables: [new Table([0.21, 0.33], [0.1, 0.67])]
      })
      expect(wrapper).toMatchSnapshot()
    })

    it('should not render anything when there is no label or table', () => {
      wrapper.setProps({
        selectedLabels: [],
        selectedTables: []
      })

      expect(wrapper).toMatchSnapshot()
    })
  })
})
