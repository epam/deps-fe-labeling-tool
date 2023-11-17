import React from 'react'
import { mockMarkupActions } from '@/mocks/actions/markup'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockPaginationSelectors } from '@/mocks/selectors/pagination'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { shallow } from 'enzyme'
import { removeLabels, removeTables } from '@/actions/markup'
import { Button } from '@/components/Button'
import { DeleteButton } from '@/containers/DeleteButton'
import { Label, LabelType } from '@/models/Label'
import { Table } from '@/models/Table'

jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/pagination', () => mockPaginationSelectors)
jest.mock('@/actions/markup', () => mockMarkupActions)

jest.mock('@/hocs/withHotKeys', () => ({
  withHotKeys: (Component) => Component
}))

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn((f) => f()),
  useCallback: jest.fn((f) => f)
}))

const {
  mapStateToProps,
  mapDispatchToProps,
  WrappedComponent
} = DeleteButton

describe('Container: DeleteButton', () => {
  let wrapper, defaultProps
  const labelA = new Label(1, 1, 1, 1, 'fieldCode1', 0, LabelType.VALUE, 'value 1')
  const labelB = new Label(2, 2, 2, 2, 'fieldCode1', 0, LabelType.KEY, 'key 1')
  const defaultState = {
    markup:
      {
        present:
          {
            pagination:
              {
                currentPage: 1
              }
          }
      }
  }
  beforeEach(() => {
    defaultProps = {
      currentPage: 1,
      labels: [labelA, labelB],
      selectedLabels: [labelA, labelB],
      selectedTables: [new Table([1, 1], [2, 2])],
      removeTables: jest.fn(),
      removeLabels: jest.fn(),
      setActiveSidebar: jest.fn(),
      registerHandlers: jest.fn()
    }
    wrapper = shallow(<WrappedComponent {...defaultProps} />)
  })

  it('should render correct layout based on the props', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call registerHandlers on mount', () => {
    expect(defaultProps.registerHandlers).toHaveBeenCalled()
  })

  it('should call Modal confirmation with correct values when calling to delete button onClick', () => {
    Modal.confirm = jest.fn()
    const deleteButtonProps = wrapper.find(Button.Icon).props()
    deleteButtonProps.onClick()
    expect(Modal.confirm).nthCalledWith(1, {
      cancelText: 'Cancel',
      content: 'Are you sure you want to delete markup?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      onCancel: expect.anything(),
      onOk: expect.anything(),
      title: 'Deletion Confirmation'
    })
  })

  it('should call props removeLabels, removeTables when calling onOk confirm', () => {
    Modal.confirm = jest.fn((config) => config.onOk())
    const deleteButtonProps = wrapper.find(Button.Icon).props()
    deleteButtonProps.onClick()

    expect(defaultProps.removeLabels).nthCalledWith(1, defaultProps.currentPage, defaultProps.selectedLabels)
    expect(defaultProps.removeTables).nthCalledWith(1, defaultProps.currentPage, defaultProps.selectedTables)
  })

  describe('mapStateToProps', () => {
    let props

    beforeEach(() => {
      props = mapStateToProps(defaultState, defaultProps).props
    })

    it('should pass correct props to the wrapped component', () => {
      expect(props).toMatchSnapshot()
    })
  })

  describe('mapDispatchToProps', () => {
    const { props, dispatch } = mapDispatchToProps()

    it('should dispatch removeLabels actions when calling to removeLabels props', () => {
      props.removeLabels(defaultProps.selectedLabels)
      expect(removeLabels).toHaveBeenCalledWith(defaultProps.selectedLabels)
      expect(dispatch).toHaveBeenCalledWith(removeLabels(defaultProps.selectedLabels))
    })

    it('should dispatch removeTables actions when calling to removeTables props', () => {
      props.removeTables(defaultProps.selectedTables)
      expect(removeTables).toHaveBeenCalledWith(defaultProps.selectedTables)
      expect(dispatch).toHaveBeenCalledWith(removeTables(defaultProps.selectedTables))
    })
  })
})
