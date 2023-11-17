import React from 'react'
import { mockOcrActions } from '@/mocks/actions/ocr'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockOcrSelectors } from '@/mocks/selectors/ocr'
import { shallow } from 'enzyme'
import { setPrimaryEngine } from '@/actions/ocr'
import { OcrSelect } from '@/containers/OcrSelect'
import { Select } from './OcrSelect.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/ocr', () => mockOcrSelectors)

jest.mock('@/actions/ocr', () => mockOcrActions)

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

const {
  WrappedComponent,
  mapStateToProps,
  mapDispatchToProps
} = OcrSelect

describe('Container: OcrSelect', () => {
  describe('mapStateToProps', () => {
    it('should pass state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass setPrimaryEngine action as prop to WrappedComponent', () => {
      const engineCode = 'anyEngineCode'
      const { props } = mapDispatchToProps()
      props.setPrimaryEngine(engineCode)
      expect(setPrimaryEngine).nthCalledWith(1, engineCode)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps
    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        setPrimaryEngine: jest.fn(),
        registerHandlers: jest.fn(),
        ocr: jest.fn()
      }

      jest.clearAllMocks()
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call defaultProps.setPrimaryEngine with correct arg when calling to onMenuItemClick', () => {
      wrapper.find(Select).props().onChange('ocrCode')
      expect(defaultProps.setPrimaryEngine).nthCalledWith(1, 'ocrCode')
    })

    it('should call props registerHandlers when component is mounted', () => {
      expect(defaultProps.registerHandlers).nthCalledWith(1, { RECOGNIZE: expect.any(Function) })
    })
  })
})
