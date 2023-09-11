import { mockCanvasActions } from '@/mocks/actions/canvas'
import { mockImageActions } from '@/mocks/actions/image'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockCanvasSelectors } from '@/mocks/selectors/canvas'
import { mockDocumentSelectors } from '@/mocks/selectors/document'
import { mockImageSelectors } from '@/mocks/selectors/image'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import { mockToolsSelectors } from '@/mocks/selectors/tools'
import React from 'react'
import { shallow } from 'enzyme'
import { setZoom } from '@/actions/canvas'
import { setImage } from '@/actions/image'
import { clearSelection } from '@/actions/markup'
import { CanvasBackground } from '@/components/CanvasBackground'
import { CanvasMouseSelection } from '@/components/CanvasMouseSelection'
import { CanvasObjectsSelection } from '@/components/CanvasObjectsSelection'
import { Tool } from '@/enums/Tool'
import { Area } from '@/models/Area'
import { Label } from '@/models/Label'
import { Rectangle } from '@/models/Rectangle'
import { Table, CellValue } from '@/models/Table'
import { zoomSelector, scaleSelector, pageRotationAngleSelector } from '@/selectors/canvas'
import { pageImageUrlSelector } from '@/selectors/document'
import { imageSelector } from '@/selectors/image'
import { currentPageSelector } from '@/selectors/pagination'
import { settingsSelector } from '@/selectors/settings'
import { selectedToolSelector } from '@/selectors/tools'
import { LabelingCanvas as ConnectedCanvas } from './LabelingCanvas'
import { useAreas } from './useAreas'
import { useLabels } from './useLabels'
import { useTables } from './useTables'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/canvas', () => mockCanvasSelectors)
jest.mock('@/selectors/document', () => mockDocumentSelectors)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)
jest.mock('@/selectors/tools', () => mockToolsSelectors)
jest.mock('@/selectors/image', () => mockImageSelectors)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/actions/canvas', () => mockCanvasActions)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/image', () => mockImageActions)
jest.mock('./DefaultCanvasHotKeys', () => mockComponent('DefaultCanvasHotKeys'))

const mockLabels = [
  new Label(
    0.1,
    0.2,
    0.3,
    0.4,
    'MOCK_FIELD_1',
    0,
    'key',
    'MOCK FIELD KEY 1',
    {},
    0.8
  )
]

const mockAreas = [
  new Area(
    0.1,
    0.2,
    0.3,
    0.4,
    {}
  )
]

const mockTables = [
  new Table(
    [0.5, 0.6, 0.8],
    [0.303, 0.32, 0.336],
    [],
    new CellValue(
      0,
      0,
      'value',
      0.8
    ),
    {},
    'MOCK_FIELD_4',
    undefined,
    '9'
  )
]

jest.mock('./useLabels', () => ({
  useLabels: jest.fn(() => ({
    labels: mockLabels,
    selectedLabels: mockLabels,
    createLabels: jest.fn(),
    selectLabels: jest.fn(),
    updateLabels: jest.fn()
  }))
}))

jest.mock('./useAreas', () => ({
  useAreas: jest.fn(() => ({
    areas: mockAreas,
    selectedAreas: mockAreas,
    createAreas: jest.fn(),
    selectAreas: jest.fn(),
    updateAreas: jest.fn()
  }))
}))

jest.mock('./useTables', () => ({
  useTables: jest.fn(() => ({
    tables: mockTables,
    selectedTables: mockTables,
    createTables: jest.fn(),
    addTables: jest.fn(),
    selectTables: jest.fn(),
    updateTables: jest.fn()
  }))
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = ConnectedCanvas

describe('Container: LabelingCanvas', () => {
  const defaultProps = {
    imageUrl: 'MOCK_URL'
  }

  const defaultState = { markup: { present: {} } }

  describe('mapStateToProps', () => {
    let props

    beforeEach(() => {
      props = mapStateToProps(defaultState, defaultProps).props
    })

    it('should pass correct props to the wrapped component', () => {
      expect(props).toMatchSnapshot()
    })

    it('should call zoomSelector with state as argument', () => {
      expect(zoomSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call pageImageUrlSelector with state as argument', () => {
      expect(pageImageUrlSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call currentPageSelector with state as argument', () => {
      expect(currentPageSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call scaleSelector with state as argument', () => {
      expect(scaleSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call imageSelector with state as argument', () => {
      expect(imageSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call settingsSelector with state as argument', () => {
      expect(settingsSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call selectedToolSelector with state as argument', () => {
      expect(selectedToolSelector).toHaveBeenCalledWith(defaultState)
    })

    it('should call pageRotationAngleSelector with state as argument', () => {
      expect(pageRotationAngleSelector).toHaveBeenCalledWith(defaultState)
    })
  })

  describe('mapDispatchToProps', () => {
    const { props, dispatch } = mapDispatchToProps()

    it('should dispatch setZoom action when calling to setZoom prop', () => {
      const MOCK_ZOOM = 2

      props.setZoom(MOCK_ZOOM)

      expect(setZoom).toHaveBeenCalledWith(MOCK_ZOOM)
      expect(dispatch).toHaveBeenCalledWith(setZoom(MOCK_ZOOM))
    })

    it('should dispatch clearSelection action when calling to clearSelection prop', () => {
      props.clearSelection()
      expect(clearSelection).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith(clearSelection())
    })

    it('should dispatch setImage action when calling to setImage prop', () => {
      props.setImage()
      expect(setImage).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith(setImage())
    })
  })

  describe('Component', () => {
    let wrapper, defaultProps, selection, hookApi

    selection = {
      x: 2,
      y: 2,
      w: 2,
      h: 2
    }

    const rectangle = new Rectangle(0.001, 0.001, 0.001, 0.001)

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

    it('should call createLabels once, with correct args when onSelectionEnd is called', () => {
      hookApi = useLabels()
      useLabels.mockImplementationOnce(() => hookApi)
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
      const CanvasMouseSelectionWrapper = wrapper.find(CanvasMouseSelection).at(0)
      CanvasMouseSelectionWrapper.props().onSelectionEnd(selection)
      expect(hookApi.createLabels).nthCalledWith(1, rectangle)
    })

    it('should call createAreas once, with correct args when onSelectionEnd is called', () => {
      const selectedTool = Tool.AREA
      hookApi = useAreas()
      useAreas.mockImplementationOnce(() => hookApi)
      wrapper = shallow(<WrappedComponent {...defaultProps} selectedTool={selectedTool} />)
      const CanvasMouseSelectionWrapper = wrapper.find(CanvasMouseSelection).at(0)
      CanvasMouseSelectionWrapper.props().onSelectionEnd(selection)
      expect(hookApi.createAreas).nthCalledWith(1, rectangle)
    })

    it('should call createTables once, with correct args when onSelectionEnd is called', () => {
      const selectedTool = Tool.TABLE
      hookApi = useTables()
      useTables.mockImplementationOnce(() => hookApi)
      wrapper = shallow(<WrappedComponent {...defaultProps} selectedTool={selectedTool} />)
      const CanvasMouseSelectionWrapper = wrapper.find(CanvasMouseSelection).at(0)
      CanvasMouseSelectionWrapper.props().onSelectionEnd(selection)
      expect(hookApi.createTables).nthCalledWith(1, rectangle)
    })

    it('should call detectTablesProp once, with correct args when onSelectionEnd is called', () => {
      const selectedTool = Tool.DETECT_TABLES
      wrapper = shallow(<WrappedComponent {...defaultProps} selectedTool={selectedTool} />)
      const CanvasMouseSelectionWrapper = wrapper.find(CanvasMouseSelection).at(0)
      CanvasMouseSelectionWrapper.props().onSelectionEnd(selection)
      expect(defaultProps.detectTablesProp).nthCalledWith(1, rectangle)
    })

    it('should not call detectTablesProp with selectedTool type detectTables when onSelectionEnd is called', () => {
      const selectedTool = Tool.DETECT_TABLES
      selection = {
        x: 0.5,
        y: 0.5,
        w: 0.5,
        h: 0.5
      }
      wrapper = shallow(<WrappedComponent {...defaultProps} selectedTool={selectedTool} />)
      const CanvasMouseSelectionWrapper = wrapper.find(CanvasMouseSelection).at(0)
      CanvasMouseSelectionWrapper.props().onSelectionEnd(selection)
      expect(defaultProps.detectTablesProp).not.toHaveBeenCalled()
    })

    it('should call clearSelection with selectedTool type Pointer when onSelectionClear is called', () => {
      const selectedTool = Tool.POINTER
      wrapper = shallow(<WrappedComponent {...defaultProps} selectedTool={selectedTool} />)
      const CanvasObjectsSelectionWrapper = wrapper.find(CanvasObjectsSelection).at(0)
      CanvasObjectsSelectionWrapper.props().onSelectionClear()
      expect(defaultProps.clearSelection).toHaveBeenCalled()
    })

    it('should not render CanvasBackground if scale is 0', () => {
      defaultProps.scale = 0
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
      expect(wrapper.find(CanvasBackground).exists()).toBe(false)
    })
  })
})
