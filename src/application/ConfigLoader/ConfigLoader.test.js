import React from 'react'
import { mockCanvasActions } from '@/mocks/actions/canvas'
import { mockDocumentActions } from '@/mocks/actions/document'
import { mockImageActions } from '@/mocks/actions/image'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockModelActions } from '@/mocks/actions/model'
import { mockOcrActions } from '@/mocks/actions/ocr'
import { mockPaginationActions } from '@/mocks/actions/pagination'
import { mockSettingsActions } from '@/mocks/actions/settings'
import { MockImage } from '@/mocks/mockFabric'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockOcrSelectors, mockOcrEngine } from '@/mocks/selectors/ocr'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { shallow } from 'enzyme'
import { setScale } from '@/actions/canvas'
import { storeDocument } from '@/actions/document'
import { setImage } from '@/actions/image'
import { storeMarkup } from '@/actions/markup'
import { storeFields } from '@/actions/model'
import { storeOcr } from '@/actions/ocr'
import { openPage } from '@/actions/pagination'
import { storeSettings } from '@/actions/settings'
import { Spinner } from '@/components/Spinner'
import { Feature } from '@/enums/Feature'
import { FieldType } from '@/enums/FieldType'
import { KnownLanguage } from '@/enums/KnownLanguage'
import { Config } from '@/models/Config'
import { Document } from '@/models/Document'
import { Field } from '@/models/Field'
import { OcrLanguage } from '@/models/OcrLanguage'
import { Settings } from '@/models/Settings'
import { scaleSelector } from '@/selectors/canvas'
import { documentSelector } from '@/selectors/document'
import { fieldsSelector } from '@/selectors/model'
import { ocrEnginesSelector } from '@/selectors/ocr'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { ConfigLoader } from '.'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/selectors/ocr', () => mockOcrSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

jest.mock('@/actions/canvas', () => mockCanvasActions)
jest.mock('@/actions/image', () => mockImageActions)
jest.mock('@/actions/document', () => mockDocumentActions)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/model', () => mockModelActions)
jest.mock('@/actions/ocr', () => mockOcrActions)
jest.mock('@/actions/settings', () => mockSettingsActions)
jest.mock('@/actions/pagination', () => mockPaginationActions)

jest.mock('@/utils/image', () => ({
  loadImage: jest.fn((imageURL) => {
    const mockImage = new MockImage()
    mockImage.src = imageURL
    return Promise.resolve({ image: mockImage, imageURL })
  })
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = ConfigLoader

const mockOcrLanguage = new OcrLanguage(KnownLanguage.English, 'English')

const mockDocument = new Document(
  ['page'],
  mockOcrLanguage.code,
  'testName',
  'Tesseract'
)
const mockFields = [new Field('code', 'name', FieldType.STRING)]
const mockApi = {
  close: () => null,
  save: () => null,
  saveMarkup: () => null
}
const mockOcr = {
  engines: [mockOcrEngine],
  languages: [mockOcrLanguage]
}

describe('ConfigLoader', () => {
  describe('mapStateToProps', () => {
    it('should call currentPageSelector and pass the result as currentPage prop', () => {
      const { props } = mapStateToProps()

      expect(currentPageSelector).toHaveBeenCalled()
      expect(props.currentPage).toEqual(mockPaginationSelectors.currentPageSelector())
    })

    it('should call documentSelector and pass the result as document prop', () => {
      const { props } = mapStateToProps()

      expect(documentSelector).toHaveBeenCalled()
      expect(props.document).toEqual(mockDocumentSelectors.documentSelector())
    })

    it('should call fieldsSelector and pass the result as fields prop', () => {
      const { props } = mapStateToProps()

      expect(fieldsSelector).toHaveBeenCalled()
      expect(props.fields).toEqual(mockModelSelectors.fieldsSelector())
    })

    it('should call scaleSelector and pass the result as scale prop', () => {
      const { props } = mapStateToProps()

      expect(scaleSelector).toHaveBeenCalled()
      expect(props.scale).toEqual(mockCanvasSelectors.scaleSelector())
    })

    it('should call settingsSelector and pass the result as settings prop', () => {
      const { props } = mapStateToProps()

      expect(settingsSelector).toHaveBeenCalled()
      expect(props.settings).toEqual(mockSettingsSelectors.settingsSelector())
    })

    it('should call ocrEnginesSelector and pass the result as ocrEngines prop', () => {
      const { props } = mapStateToProps()

      expect(ocrEnginesSelector).toHaveBeenCalled()
      expect(props.ocrEngines).toEqual(mockOcrSelectors.ocrEnginesSelector())
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass setScale action as prop to WrappedComponent', () => {
      const scale = 2
      props.setScale(scale)

      expect(setScale).nthCalledWith(1, scale)
    })

    it('should pass setImage action as prop to WrappedComponent', () => {
      const image = {}
      props.setImage(image)

      expect(setImage).nthCalledWith(1, image)
    })

    it('should pass storeDocument action as prop to WrappedComponent', () => {
      const document = mockDocument
      props.storeDocument(document)

      expect(storeDocument).nthCalledWith(1, document)
    })

    it('should pass storeMarkup action as prop to WrappedComponent', () => {
      const markup = {}
      props.storeMarkup(markup)

      expect(storeMarkup).nthCalledWith(1, markup)
    })

    it('should pass storeFields action as prop to WrappedComponent', () => {
      const fields = mockFields
      props.storeFields(fields)

      expect(storeFields).nthCalledWith(1, fields)
    })

    it('should pass storeOcr action as prop to WrappedComponent', () => {
      props.storeOcr(mockOcr)

      expect(storeOcr).nthCalledWith(1, mockOcr)
    })

    it('should pass storeSettings action as prop to WrappedComponent', () => {
      const settings = {}
      props.storeSettings(settings)

      expect(storeSettings).nthCalledWith(1, settings)
    })

    it('should pass openPage action as prop to WrappedComponent', () => {
      const page = 1
      props.openPage(page)

      expect(openPage).nthCalledWith(1, page)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    const InnerComponent = () => <div>Content</div>

    beforeEach(() => {
      const mockConfig = new Config(mockDocument, mockFields, mockOcr, mockApi, {}, mockSettingsSelectors.settingsSelector())

      defaultProps = {
        config: mockConfig,
        ...mapStateToProps().props,
        ...mapDispatchToProps().props
      }
    })

    it('should render spinner', () => {
      wrapper = shallow(
        <WrappedComponent {...defaultProps}>
          <InnerComponent />
        </WrappedComponent>
      )
      expect(wrapper.find(Spinner).exists()).toBe(true)
    })

    it('should render layout correctly', () => {
      wrapper = shallow(
        <WrappedComponent {...defaultProps}>
          <InnerComponent />
        </WrappedComponent>
      )
      wrapper.setState({
        isSettingMarkup: false
      })
      expect(wrapper.find(InnerComponent).exists()).toBe(true)
    })

    it('should create new settings if no settings in props', () => {
      defaultProps.config.settings = null
      defaultProps.storeSettings = jest.fn((settings) => {
        defaultProps.config.settings = settings
      })
      wrapper = shallow(
        <WrappedComponent {...defaultProps}>
          <InnerComponent />
        </WrappedComponent>
      )
      expect(defaultProps.storeSettings).nthCalledWith(1, new Settings())
    })

    it('should not call openPage if no initial page in props', () => {
      defaultProps.config.settings.features.find((f) => f.code === Feature.PAGING).data.initialPage = null
      wrapper = shallow(
        <WrappedComponent {...defaultProps}>
          <InnerComponent />
        </WrappedComponent>
      )
      expect(defaultProps.openPage).not.toHaveBeenCalled()
    })

    it('should not call storeMarkup if no markup in props', () => {
      defaultProps.config.markup = null
      wrapper = shallow(
        <WrappedComponent {...defaultProps}>
          <InnerComponent />
        </WrappedComponent>
      )
      expect(defaultProps.storeMarkup).not.toHaveBeenCalled()
    })
  })
})
