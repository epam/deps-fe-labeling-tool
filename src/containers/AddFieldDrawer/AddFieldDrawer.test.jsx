import React from 'react'
import { mockModelActions } from '@/mocks/actions/model'
import { mockReactHookForm } from '@/mocks/mockReactHookForm'
import { mockReactRedux } from '@/mocks/mockReactRedux'
import { mockModelSelectors } from '@/mocks/selectors/model'
import { shallow } from 'enzyme'
import { useForm } from 'react-hook-form'
import { storeFields } from '@/actions/model'
import { FieldType } from '@/enums/FieldType'
import { Field } from '@/models/Field'
import { EnumFieldMeta, ListFieldMeta } from '@/models/FieldMeta'
import { getApi } from '@/services/api'
import {
  AddButton,
  AddFieldButton,
  Drawer
} from './AddFieldDrawer.styles'
import { AddFieldDrawer } from '.'

const AddFieldForm = () => <div></div>
const mockNotify = { error: jest.fn() }

jest.mock('react-hook-form', () => mockReactHookForm)
jest.mock('react-redux', () => mockReactRedux)
jest.mock('@/selectors/model', () => mockModelSelectors)
jest.mock('@/actions/model', () => mockModelActions)
jest.mock('@/services/api', () => ({
  getApi: jest.fn(() => ({
    addFieldForm: AddFieldForm,
    notify: mockNotify
  }))
}))

describe('Container: AddFieldDrawer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AddFieldDrawer />)
  })

  it('should render layout correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should call storeFields with correct argument in case creating a new field', () => {
    getApi.mockImplementationOnce(() => ({}))

    const mockedResult = {
      fieldMeta: new ListFieldMeta(FieldType.TABLE),
      code: 'code',
      fieldType: FieldType.TABLE,
      name: 'name',
      required: 'test'
    }

    const mockFormValues = {
      code: 'code',
      name: 'name',
      fieldType: FieldType.TABLE,
      required: 'test'
    }

    useForm.mockImplementation(() => ({
      formState: {},
      getValues: jest.fn(() => mockFormValues)
    }))

    wrapper = shallow(<AddFieldDrawer />)

    const Footer = wrapper.find(Drawer).props().footer
    const DrawerFooter = shallow(<div>{Footer}</div>)
    DrawerFooter.find(AddButton).props().onClick()

    expect(storeFields).nthCalledWith(
      1,
      [
        ...mockModelSelectors.fieldsSelector(),
        mockedResult
      ]
    )
  })

  it('should call storeFields with correct argument in case creating a new field with enum type', () => {
    getApi.mockImplementationOnce(() => ({}))
    const mockOptions = ['option']

    const mockedResult = {
      fieldMeta: new EnumFieldMeta(mockOptions),
      code: 'code',
      fieldType: FieldType.ENUM,
      name: 'name',
      required: 'test'
    }

    const mockFormValues = {
      code: 'code',
      name: 'name',
      fieldType: FieldType.ENUM,
      required: 'test',
      options: mockOptions
    }

    useForm.mockImplementation(() => ({
      formState: {},
      getValues: jest.fn(() => mockFormValues)
    }))

    wrapper = shallow(<AddFieldDrawer />)

    const Footer = wrapper.find(Drawer).props().footer
    const DrawerFooter = shallow(<div>{Footer}</div>)
    DrawerFooter.find(AddButton).props().onClick()

    expect(storeFields).nthCalledWith(
      1,
      [
        ...mockModelSelectors.fieldsSelector(),
        mockedResult
      ]
    )
  })

  it('should change Drawer visibility when click on onToggleVisible', () => {
    getApi
      .mockImplementationOnce(() => ({}))
      .mockImplementationOnce(() => ({}))

    wrapper = shallow(<AddFieldDrawer />)

    const previousVisibility = wrapper.find(Drawer).props().visible

    wrapper.find(AddFieldButton).props().onClick()

    expect(wrapper.find(Drawer).props().visible).not.toBe(previousVisibility)
  })

  it('should notify User of error if field already exists when running onSave', () => {
    const addFieldForm = wrapper.find(getApi().addFieldForm).props()
    const field = mockModelSelectors.fieldsSelector()[0]
    const ERROR_MESSAGE = 'Field already exists'
    addFieldForm.onSave(field)
    expect(getApi().notify?.error).nthCalledWith(1, ERROR_MESSAGE)
  })

  it('should correctly store new field when running onSave', () => {
    const addFieldForm = wrapper.find(getApi().addFieldForm).props()
    const fields = mockModelSelectors.fieldsSelector()
    const field = new Field('1', '1', FieldType.STRING)
    addFieldForm.onSave(field)
    expect(storeFields).toHaveBeenNthCalledWith(1, [...fields, field])
  })

  it('should render layout correctly if getApi().addFieldForm is undefined', () => {
    getApi.mockImplementationOnce(() => ({}))

    wrapper = shallow(<AddFieldDrawer />)

    expect(wrapper.find(Drawer).exists()).toBe(true)
  })
})
