import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockMarkupSelectors } from '@/mocks/selectors/markup'
import { mockModelSelectors } from '@/mocks/selectors/model'
import React from 'react'
import { shallow } from 'enzyme'
import { save, saveMarkup } from '@/actions/api'
import { Button } from '@/components/Button'
import { CustomModal } from '@/components/Modal'
import { CloseButton } from '@/containers/CloseButton/CloseButton'
import { getApi } from '@/services/api'
import { Button as StyledButton } from './CloseButton.styles'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/markup', () => mockMarkupSelectors)
jest.mock('@/selectors/model', () => mockModelSelectors)

const mockApiClose = jest.fn()
const mockOnCloseEvent = jest.fn()
const mockEventTarget = {
  target: {
    innerText: 'Save'
  }
}

jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    close: mockApiClose,
    save: jest.fn(),
    saveMarkup: jest.fn(),
    ocrText: jest.fn(),
    ocrTable: jest.fn()
  }))
}))

jest.mock('@/services/events', () => ({
  getEvents: () => ({
    onClose: mockOnCloseEvent
  })
}))

jest.mock('@/actions/api', () => ({
  save: jest.fn(),
  saveMarkup: jest.fn()
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f())
}))

const { WrappedComponent, mapStateToProps, mapDispatchToProps } = CloseButton

describe('Container: CloseButton', () => {
  describe('mapStateToProps', () => {
    it('should pass correct props to the wrapped component (state)', () => {
      const { props } = mapStateToProps()
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    it('should pass save action as save prop', () => {
      const { props } = mapDispatchToProps()
      props.save()
      expect(save).toHaveBeenCalledTimes(1)
    })

    it('should pass saveMarkup action as saveMarkup prop', () => {
      const { props } = mapDispatchToProps()
      props.saveMarkup()
      expect(saveMarkup).toHaveBeenCalledTimes(1)
    })
  })

  let defaultProps, wrapper
  beforeEach(() => {
    defaultProps = {
      ...mapStateToProps().props,
      ...mapDispatchToProps().props,
      fieldsToDelete: []
    }

    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render correct layout', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render correct layout if getApi().save is undefined', () => {
    getApi.mockReturnValueOnce({}).mockReturnValueOnce({})
    wrapper = shallow(<WrappedComponent {...defaultProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call apiClose when calling to button onClick', () => {
    const button = wrapper.find(Button.Icon)
    button.simulate('click')
    expect(mockApiClose).toHaveBeenCalled()
  })

  it('should call subscribe on component mount', () => {
    expect(mockOnCloseEvent).toHaveBeenCalled()
  })

  it('should call apiClose when click on button "Ignore"', () => {
    const ModalFooter = wrapper.find(CustomModal).props().footer
    const FooterWrapper = shallow(<div>{ModalFooter}</div>)
    FooterWrapper.find(StyledButton).at(0).props().onClick()
    expect(mockApiClose).toHaveBeenCalled()
  })

  it('should call saveMarkup when click on button "Save"', () => {
    const ModalFooter = wrapper.find(CustomModal).props().footer
    const FooterWrapper = shallow(<div>{ModalFooter}</div>)
    FooterWrapper.find(StyledButton).at(1).props().onClick(mockEventTarget)
    expect(saveMarkup).toHaveBeenCalled()
  })

  it('should call onClose after saving markup', async () => {
    const ModalFooter = wrapper.find(CustomModal).props().footer
    const FooterWrapper = shallow(<div>{ModalFooter}</div>)
    await FooterWrapper.find(StyledButton).at(1).props().onClick(mockEventTarget)
    expect(mockApiClose).toHaveBeenCalled()
  })

  it('should call save when click on button "Save & extract"', () => {
    mockEventTarget.target.innerText = 'Save & extract'
    const ModalFooter = wrapper.find(CustomModal).props().footer
    const FooterWrapper = shallow(<div>{ModalFooter}</div>)
    FooterWrapper.find(StyledButton).at(2).props().onClick(mockEventTarget)
    expect(save).toHaveBeenCalled()
  })

  it('should call onClose after saving and extracting is finished', async () => {
    mockEventTarget.target.innerText = 'Save & extract'
    const ModalFooter = wrapper.find(CustomModal).props().footer
    const FooterWrapper = shallow(<div>{ModalFooter}</div>)
    FooterWrapper.find(StyledButton).at(2).props().onClick(mockEventTarget)
    await save()
    expect(mockApiClose).toHaveBeenCalled()
  })
})
