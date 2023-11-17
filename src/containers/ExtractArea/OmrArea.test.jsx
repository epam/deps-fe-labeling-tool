import React from 'react'
import { mockApiActions } from '@/mocks/actions/api'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { omrArea } from '@/actions/api'
import { updateLabels } from '@/actions/markup'
import { Label, LabelType } from '@/models/Label'
import { getApi } from '@/services/api'
import { Button } from './ExtractArea.styles'
import { OmrArea } from './OmrArea'

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    omrArea: jest.fn(() => Promise.resolve({
      confidence: 0.11,
      content: false
    }))
  }))
}))
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/api', () => mockApiActions)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = OmrArea

describe('Container: OmrArea', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass updateLabels action as prop to WrappedComponent', () => {
      props.updateLabels()
      expect(updateLabels).toHaveBeenCalled()
    })

    it('should pass omrArea action as prop to WrappedComponent', () => {
      props.omrArea()
      expect(omrArea).toHaveBeenCalled()
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    const testLabel = new Label(1, 2, 3, 4, undefined, 5, LabelType.STRING, 'test', {}, 0.78)

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        label: testLabel
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call updateLabels prop with correct args when calling Button onClick prop', async () => {
      const btn = wrapper.find(Button)
      await btn.props().onClick()
      const expectedSecondArg = [
        {
          ...defaultProps.label,
          ...await defaultProps.omrArea()
        }
      ]
      expect(defaultProps.updateLabels).nthCalledWith(1, defaultProps.currentPage, expectedSecondArg)
    })

    it('should not render anything in case api of omrArea is not provided', () => {
      getApi.mockImplementationOnce(() => () => ({
        omrArea: undefined
      }))
      const wrapper = shallow(<WrappedComponent {...defaultProps} />)
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })
})
