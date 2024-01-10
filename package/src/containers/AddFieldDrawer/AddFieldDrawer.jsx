import
React,
{
  useCallback,
  useMemo,
  useState
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { storeFields } from '@/actions/model'
import { ButtonType } from '@/components/Button'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { FormValidationMode } from '@/components/ReactHookForm'
import { FieldType } from '@/enums/FieldType'
import { EnumFieldMeta, ListFieldMeta } from '@/models/FieldMeta'
import { fieldsSelector } from '@/selectors/model'
import { getApi } from '@/services/api'
import {
  AddButton,
  CancelButton,
  Drawer,
  DrawerFooterWrapper,
  HeaderWrapper,
  InfoIcon,
  AddFieldButton,
  AddFieldFormContext,
  AddFieldFormWrapper
} from './AddFieldDrawer.styles'
import { AddFieldForm } from './AddFieldForm'

const RESOURCE_DRAWER_LABEL = {
  CANCEL: 'Cancel',
  ADD: 'Add',
  ADD_NEW_FIELD: 'Add new field',
  ADD_FIELD: 'Add field'
}

const DRAWER_SIZE = '36rem'
const RESOURCE_ADD_FIELD_BUTTON = 'Add field'
const RESOURCE_FIELD_EXISTS_ERROR = 'Field already exists'

const AddFieldDrawer = () => {
  const [visible, setVisible] = useState(false)

  const formProviderProps = useForm({
    mode: FormValidationMode.ON_CHANGE,
    shouldUnregister: true,
    valueAsNumber: true
  })

  const {
    getValues,
    formState: { isValid: isFormValid }
  } = formProviderProps

  const currentFields = useSelector(fieldsSelector)
  const dispatch = useDispatch()

  const toggleVisibility = useCallback(() => (
    setVisible((prev) => !prev)
  ), [])

  const getEnumMetaParams = useCallback((options) => (
    new EnumFieldMeta(options ?? [])
  ), [])

  const getFieldMetaParams = useCallback((field, options) => {
    const baseType = field.baseType ?? field.fieldType
    const baseTypeMeta = (
      baseType === FieldType.ENUM &&
      getEnumMetaParams(options)
    )

    return new ListFieldMeta(baseType, baseTypeMeta)
  }, [getEnumMetaParams])

  const createField = useCallback(() => {
    const { options, ...field } = getValues()

    field.fieldMeta = (
      field.fieldType === FieldType.ENUM
        ? getEnumMetaParams(options)
        : getFieldMetaParams(field, options)
    )

    return field
  }, [
    getEnumMetaParams,
    getFieldMetaParams,
    getValues
  ])

  const saveData = useCallback((field) => {
    const newField = field ?? createField()
    const fieldExists = currentFields.find((f) => f.code === newField.code)

    if (fieldExists) {
      return getApi().notify?.error?.(RESOURCE_FIELD_EXISTS_ERROR)
    }

    dispatch(
      storeFields([...currentFields, newField])
    )

    !field && toggleVisibility()
  }, [
    createField,
    currentFields,
    dispatch,
    toggleVisibility
  ])

  const DrawerFooter = useMemo(() => (
    <DrawerFooterWrapper>
      <CancelButton
        onClick={toggleVisibility}
      >
        {RESOURCE_DRAWER_LABEL.CANCEL}
      </CancelButton>
      <AddButton
        disabled={!isFormValid}
        onClick={() => saveData()}
        type={ButtonType.PRIMARY}
      >
        {RESOURCE_DRAWER_LABEL.ADD}
      </AddButton>
    </DrawerFooterWrapper>
  ), [
    isFormValid,
    saveData,
    toggleVisibility
  ])

  const DrawerTitle = useMemo(() => (
    <HeaderWrapper>
      <InfoIcon />
      {RESOURCE_DRAWER_LABEL.ADD_NEW_FIELD}
    </HeaderWrapper>
  ), [])

  const renderAddFieldForm = () => {
    const AddFieldForm = getApi().addFieldForm

    return (
      <AddFieldFormWrapper>
        <AddFieldForm onSave={saveData}>
          <PlusIcon />
          <AddFieldFormContext>
            {RESOURCE_ADD_FIELD_BUTTON}
          </AddFieldFormContext>
        </AddFieldForm>
      </AddFieldFormWrapper>
    )
  }

  if (getApi().addFieldForm) {
    return renderAddFieldForm()
  }

  return (
    <>
      <AddFieldButton
        onClick={toggleVisibility}
      >
        <PlusIcon />
        {RESOURCE_DRAWER_LABEL.ADD_FIELD}
      </AddFieldButton>
      <Drawer
        destroyOnClose
        footer={DrawerFooter}
        onClose={toggleVisibility}
        title={DrawerTitle}
        visible={visible}
        width={DRAWER_SIZE}
        closable={false}
      >
        <FormProvider {...formProviderProps}>
          <AddFieldForm />
        </FormProvider>
      </Drawer>
    </>
  )
}

export {
  AddFieldDrawer
}
