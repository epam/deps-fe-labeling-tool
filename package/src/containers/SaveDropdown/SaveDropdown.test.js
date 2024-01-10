import { mockApiActions } from '@/mocks/actions/api'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import React from 'react'
import { shallow } from 'enzyme'
import { save, saveMarkup } from '@/actions/api'
import { updateInitialMarkup, storeAssignedMarkup } from '@/actions/markup'
import { getApi } from '@/services/api'
import { SaveDropdown } from '.'

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = SaveDropdown

const SAVE_WITHOUT_EXTRACTION = 'Save without extraction'
const SAVE_AND_EXTRACT = 'Save & extract'
const SAVE_EXTRACT_AND_CLOSE = 'Save, extract & close'
const mockApiClose = jest.fn()
const mockSaveMarkup = jest.fn()
const mockSave = jest.fn()

const mockCancelAutoSave = jest.fn()

jest.mock('./useAutoSave', () => ({
  useAutoSave: jest.fn(() => mockCancelAutoSave)
}))

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    close: mockApiClose,
    saveMarkup: mockSaveMarkup,
    save: mockSave
  }))
}))

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/actions/api', () => mockApiActions)
jest.mock('@/actions/markup', () => mockMarkupActions)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

describe('Container: SaveDropdown', () => {
  describe('mapStateToProps', () => {
    it('should pass expected state as props to WrappedComponent', () => {
      const { props } = mapStateToProps()
      expect(props.modifiedObjects).toEqual([])
    })
  })

  describe('mapDispatchToProps', () => {
    const { props } = mapDispatchToProps()

    it('should pass save action as prop to WrappedComponent', async () => {
      await props.save()
      expect(save).toHaveBeenCalledTimes(1)
    })

    it('should pass saveMarkup action as prop to WrappedComponent', async () => {
      await props.saveMarkup()
      expect(saveMarkup).toHaveBeenCalledTimes(1)
    })

    it('should pass updateInitialMarkup action as prop to WrappedComponent', () => {
      props.updateInitialMarkup()
      expect(updateInitialMarkup).toHaveBeenCalledTimes(1)
    })

    it('should pass storeAssignedMarkup action as prop to WrappedComponent', () => {
      props.storeAssignedMarkup()
      expect(storeAssignedMarkup).toHaveBeenCalledTimes(1)
    })
  })

  describe('component', () => {
    let wrapper, defaultProps

    beforeEach(() => {
      defaultProps = {
        ...mapStateToProps().props,
        ...mapDispatchToProps().props,
        registerHandlers: jest.fn()
      }
      delete defaultProps.modifiedObjects

      wrapper = shallow(<WrappedComponent {...defaultProps} />)
    })

    it('should render layout correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('should call registerHandlers on mount', () => {
      expect(defaultProps.registerHandlers).toHaveBeenCalled()
    })

    it('should render layout correctly if getApi().save is undefined', () => {
      getApi.mockReturnValueOnce({})
      wrapper = shallow(<WrappedComponent {...defaultProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render active Dropdown correctly', () => {
      const DropdownProps = wrapper.props().overlay()
      const MenuComponent = shallow(<div>{DropdownProps}</div>)
      expect(MenuComponent).toMatchSnapshot()
    })

    it('should call save storeAssignedMarkup when clicked on "Save & extract" item', async () => {
      const DropdownProps = wrapper.props().overlay()
      const MenuComponent = shallow(<div>{DropdownProps}</div>)
      const mockItem = {
        key: SAVE_AND_EXTRACT
      }

      await MenuComponent.props().children.props.onClick(mockItem)
      expect(defaultProps.save).toHaveBeenCalled()
      expect(defaultProps.storeAssignedMarkup).nthCalledWith(1, mockMarkupSelectors.markupSelector())
    })

    it('should call save and close when clicked on "Save, extract & close" item', async () => {
      const DropdownProps = wrapper.props().overlay()
      const MenuComponent = shallow(<div>{DropdownProps}</div>)
      const mockItem = {
        key: SAVE_EXTRACT_AND_CLOSE
      }

      await MenuComponent.props().children.props.onClick(mockItem)
      expect(defaultProps.save).toHaveBeenCalled()
      expect(mockApiClose).toHaveBeenCalled()
    })

    it('should call saveMarkup when clicked on "Save without extraction" item', async () => {
      const DropdownProps = wrapper.props().overlay()
      const MenuComponent = shallow(<div>{DropdownProps}</div>)
      const mockItem = {
        key: SAVE_WITHOUT_EXTRACTION
      }

      await MenuComponent.props().children.props.onClick(mockItem)
      expect(defaultProps.saveMarkup).toHaveBeenCalled()
    })
  })
})
