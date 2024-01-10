import
React,
{
  useCallback,
  useMemo
} from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Form, FormItem } from '@/components/ReactHookForm'
import { FormFieldType } from '@/components/ReactHookForm/FormFieldType'
import {
  MaxLengthValidator,
  PatternValidator,
  RequiredValidator
} from '@/components/ReactHookForm/Validators'
import { Select, SelectMode } from '@/components/Select'
import {
  FORBIDDEN_SPECIAL_SYMBOLS,
  FORBIDDEN_WHITE_SPACE_BEFORE_TEXT
} from '@/constants/regexp'
import { FieldType, RESOURCE_FIELD_TYPE } from '@/enums/FieldType'
import { CheckboxWrapper } from './AddFieldDrawer.styles'

const RESOURCE_FORM_LABEL = {
  BASE_TYPE_FIELD: 'Base Type Field',
  SELECT_FIELD_TYPE_LIST: 'Select field type for each element in list',
  FIELD_NAME: 'Name',
  ENTER_FIELD_NAME: 'Enter field display name',
  FIELD_CODE: 'Code',
  AUTOMATICALLY_GENERATED: 'Automatically generated field',
  REQUIRED_FIELD: 'Required field',
  FIELD_TYPE: 'Field Type',
  SELECT_FIELD_TYPE: 'Select field type',
  VALUE_SHOULD_NOT_BE_EMPTY: 'The value should not be empty.',
  OPTIONS: 'Options'
}

export const BASE_FIELD_TYPES = {
  STRING: 'string',
  PAIR: 'pair',
  TABLE: 'table',
  ENUM: 'enum',
  CHECKMARK: 'checkmark',
  DATE: 'date'
}

export const FIELDS_CODE = {
  code: 'code',
  name: 'name',
  required: 'required',
  fieldType: 'fieldType',
  options: 'options'
}

export const BASE_TYPE_FIELD_CODE = 'baseType'

const FIELD_OPTIONS = Object.values(FieldType)
  .map((fieldType) => ({
    value: fieldType,
    text: RESOURCE_FIELD_TYPE[fieldType],
    tooltip: RESOURCE_FIELD_TYPE[fieldType]
  }))

const FILED_BASE_OPTIONS = (() => {
  const baseFiledTypeNames = Object.values(BASE_FIELD_TYPES)
  return FIELD_OPTIONS.filter(({ value }) => baseFiledTypeNames.includes(value))
})()

export const AddFieldForm = () => {
  const { control, setValue } = useFormContext()

  const fieldType = useWatch({
    control,
    name: FIELDS_CODE.fieldType,
    defaultValue: FieldType.STRING
  })

  const baseType = useWatch({
    control,
    name: BASE_TYPE_FIELD_CODE,
    defaultValue: FieldType.STRING
  })

  const setCodeFieldValue = useCallback((e) => {
    const validCode = e?.target?.value?.replace(
      FORBIDDEN_SPECIAL_SYMBOLS,
      ''
    )

    setValue(FIELDS_CODE.code, validCode, { shouldValidate: true })
  }, [setValue])

  const baseTypeField = useMemo(() => [
    {
      code: BASE_TYPE_FIELD_CODE,
      label: RESOURCE_FORM_LABEL.BASE_TYPE_FIELD,
      defaultValue: baseType,
      type: FormFieldType.ENUM,
      options: FILED_BASE_OPTIONS,
      placeholder: RESOURCE_FORM_LABEL.SELECT_FIELD_TYPE_LIST
    }
  ], [baseType])

  const enumOptionsField = useMemo(() => ([
    {
      code: FIELDS_CODE.options,
      label: RESOURCE_FORM_LABEL.OPTIONS,
      requiredMark: true,
      rules: new RequiredValidator(),
      render: (props) => (
        <Select
          mode={SelectMode.TAGS}
          open={false}
          options={[]}
          {...props}
        />
      )
    }
  ]), [])

  const fields = useMemo(() => [
    {
      code: FIELDS_CODE.name,
      label: RESOURCE_FORM_LABEL.FIELD_NAME,
      handler: {
        onChange: setCodeFieldValue
      },
      type: FormFieldType.STRING,
      requiredMark: true,
      placeholder: RESOURCE_FORM_LABEL.ENTER_FIELD_NAME,
      rules: {
        ...new RequiredValidator(),
        ...new PatternValidator(
          FORBIDDEN_WHITE_SPACE_BEFORE_TEXT,
          RESOURCE_FORM_LABEL.VALUE_SHOULD_NOT_BE_EMPTY
        ),
        ...new MaxLengthValidator()
      }
    },
    {
      code: FIELDS_CODE.code,
      name: FIELDS_CODE.code,
      label: RESOURCE_FORM_LABEL.FIELD_CODE,
      type: FormFieldType.STRING,
      requiredMark: true,
      placeholder: RESOURCE_FORM_LABEL.AUTOMATICALLY_GENERATED,
      disabled: true,
      rules: new RequiredValidator()
    },
    {
      code: FIELDS_CODE.required,
      defaultValue: false,
      label: RESOURCE_FORM_LABEL.REQUIRED_FIELD,
      type: FormFieldType.CHECKMARK
    },
    {
      code: FIELDS_CODE.fieldType,
      label: RESOURCE_FORM_LABEL.FIELD_TYPE,
      defaultValue: FieldType.STRING,
      type: FormFieldType.ENUM,
      options: FIELD_OPTIONS,
      placeholder: RESOURCE_FORM_LABEL.SELECT_FIELD_TYPE
    },
    ...(fieldType === FieldType.LIST ? baseTypeField : []),
    ...(fieldType === FieldType.ENUM ? enumOptionsField : [])
  ], [
    setCodeFieldValue,
    fieldType,
    baseTypeField,
    enumOptionsField
  ])

  const BaseFormSection = useMemo(() =>
    fields.map(({ label, requiredMark, ...field }) => {
      const FormItemComponent = (
        <FormItem
          key={field.code}
          field={field}
          label={label}
          requiredMark={requiredMark}
        />
      )

      if (field.code === FIELDS_CODE.required) {
        return (
          <CheckboxWrapper key={field.code}>
            {FormItemComponent}
          </CheckboxWrapper>
        )
      }

      return FormItemComponent
    }), [fields])

  const AdditionalOptions = useMemo(() => {
    if (
      fieldType === FieldType.LIST &&
      baseType === FieldType.ENUM
    ) {
      return (
        enumOptionsField.map(({ label, requiredMark, ...field }) => (
          <FormItem
            key={field.code}
            field={field}
            label={label.toUpperCase()}
            requiredMark={requiredMark}
          />
        ))
      )
    }
  }, [
    baseType,
    enumOptionsField,
    fieldType
  ])

  return (
    <Form>
      {BaseFormSection}
      {AdditionalOptions}
    </Form>
  )
}
