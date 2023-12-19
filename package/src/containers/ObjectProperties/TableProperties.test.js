import { mockApiActions } from '@/mocks/actions/api'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockComponent } from '@/mocks/mockComponent'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockUuid } from '@/mocks/mockUuid'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { mockOcrSelectors } from '@/mocks/selectors/ocr'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { mockSettingsSelectors } from '@/mocks/selectors/settings'
import React from 'react'
import { shallow } from 'enzyme'
import { ocrTable } from '@/actions/api'
import { updateAllTables, updateTables } from '@/actions/markup'
import { OcrSelect } from '@/containers/OcrSelect'
import { Table } from '@/models/Table'
import { TableProperties } from './TableProperties'

jest.mock('react-redux', () => mockReactRedux)

jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/selectors/ocr', () => mockOcrSelectors)
jest.mock('@/selectors/settings', () => mockSettingsSelectors)

jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/actions/api', () => mockApiActions)

jest.mock('@/hocs/debounce', () => ({
  debounce: () => (Component) => Component
}))

jest.mock('@/containers/ObjectNameAndIndex', () => mockComponent('ObjectNameAndIndex'))
jest.mock('@/containers/OcrSelect', () => mockComponent('OcrSelect'))
jest.mock('@/containers/ObjectCoordinates', () => mockComponent('ObjectCoordinates'))

const mockContentTable = 'mockContent'
const mockOcrTable = jest.fn(() => Promise.resolve(mockContentTable))
jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    ocrTable: mockOcrTable
  }))
}))

jest.mock('uuid', () => mockUuid)

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = TableProperties

describe('Container: TableProperties', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass ocrTable action as prop to WrappedComponent', async () => {
      await props.ocrTable()
      expect(ocrTable).toHaveBeenCalledTimes(1)
    })

    it('should pass updateTables action as prop to WrappedComponent', () => {
      props.updateTables([])
      expect(updateTables).nthCalledWith(1, [])
    })

    it('should pass updateAllTables action as prop to WrappedComponent', () => {
      const updateAllTablesPayload = {
        newTable: new Table([0.1, 0.33], [0.32, 0.55])
      }
      props.updateAllTables(updateAllTablesPayload)
      expect(updateAllTables).nthCalledWith(1, updateAllTablesPayload)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    const testTable = new Table([0.21, 0.33], [0.1, 0.51])

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        table: testTable,
        primaryEngine: 'ocrTable'
      }

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call prop updateTables with correct args when calling OcrDropdownButton ocr prop (ocrTable)', async () => {
      const OcrDropdownButtonWrapper = wrapper.find(OcrSelect)
      await OcrDropdownButtonWrapper.props().ocr('mockEngine')
      expect(defaultProps.updateTables).nthCalledWith(1, defaultProps.currentPage, [{ type: 'MOCK_OCR_TABLE' }])
    })
  })
})
