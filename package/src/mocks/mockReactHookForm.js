import { FieldType } from '@/enums/FieldType'

const mockReactHookForm = ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(() => ({
    handleSubmit: jest.fn(),
    getValues: jest.fn(),
    formState: {}
  })),
  useController: jest.fn(() => ({
    field: {},
    fieldState: {}
  })),
  useFormContext: jest.fn(() => ({
    control: {},
    setValue: jest.fn()
  })),
  useWatch: jest.fn(() => FieldType.STRING)
})

export {
  mockReactHookForm
}
