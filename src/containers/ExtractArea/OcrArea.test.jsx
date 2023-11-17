import React from 'react'
import { mockApiActions } from '@/mocks/actions/api'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockOcrSelectors } from '@/mocks/selectors/ocr'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { shallow } from 'enzyme'
import { ocrText } from '@/actions/api'
import { updateLabels } from '@/actions/markup'
import { OcrSelect } from '@/containers/OcrSelect'
import { Label, LabelType } from '@/models/Label'
import { getApi } from '@/services/api'
import { Button } from './ExtractArea.styles'
import { OcrArea } from './OcrArea'

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    ocrText: jest.fn(() => Promise.resolve({
      confidence: 0.11,
      content: 'test'
    }))
  }))
}))
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/containers/OcrSelect', () => mockComponent('OcrSelect'))
jest.mock('@/selectors/ocr', () => mockOcrSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/api', () => mockApiActions)

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = OcrArea

describe('Container: OcrArea', () => {
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

    it('should pass ocrText action as prop to WrappedComponent', () => {
      props.ocrText()
      expect(ocrText).toHaveBeenCalled()
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

    it('should call ocrText prop with correct args when calling OcrSelect ocr prop', async () => {
      const OcrSelectWrapper = wrapper.find(OcrSelect)
      const coords = Label.toRectangle(defaultProps.label)
      await OcrSelectWrapper.props().ocr()
      expect(defaultProps.ocrText).nthCalledWith(1, defaultProps.primaryEngine, coords)
    })

    it('should call updateLabels prop with correct args when calling OcrSelect ocr prop', async () => {
      const OcrSelectWrapper = wrapper.find(OcrSelect)
      await OcrSelectWrapper.props().ocr()
      const expectedSecondArg = [
        {
          ...defaultProps.label,
          ...await defaultProps.ocrText()
        }
      ]
      expect(defaultProps.updateLabels).nthCalledWith(1, defaultProps.currentPage, expectedSecondArg)
    })

    it('should call updateLabels prop with correct args when calling Button onClick prop', async () => {
      const btn = wrapper.find(Button)
      await btn.props().onClick()
      const expectedSecondArg = [
        {
          ...defaultProps.label,
          ...await defaultProps.ocrText()
        }
      ]
      expect(defaultProps.updateLabels).nthCalledWith(1, defaultProps.currentPage, expectedSecondArg)
    })

    it('should not render anything in case empty ocrEngines', () => {
      const props = {
        ...defaultProps,
        ocrEngines: []
      }
      wrapper.setProps(props)
      expect(wrapper.isEmptyRender()).toEqual(true)
    })

    it('should not render anything in case api of ocrText is not provided', () => {
      getApi.mockImplementationOnce(() => () => ({
        ocrText: undefined
      }))
      const wrapper = shallow(<WrappedComponent {...defaultProps} />)
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })
})
