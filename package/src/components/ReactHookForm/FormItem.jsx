import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { FormField } from './FormField'
import { FormFieldType } from './FormFieldType'
import {
  ErrorMessage,
  FieldLabel,
  Wrapper
} from './FormItem.styles'
import {
  maxLengthValidatorShape,
  patternValidatorShape,
  requiredValidatorShape
} from './Validators'

const FormItem = ({
  label,
  requiredMark,
  field,
  children
}) => {
  const {
    defaultValue,
    rules,
    code,
    handler,
    ...rest
  } = field || {}

  const {
    field: { onChange, onBlur, value, ref },
    fieldState
  } = useController({
    name: code,
    rules,
    ...(defaultValue && { defaultValue })
  })

  const onFieldChange = (e) => {
    onChange(e)
    handler?.onChange?.(e)
  }

  const Error = useMemo(() => (
    <ErrorMessage>
      {fieldState.error?.message}
    </ErrorMessage>
  ), [fieldState.error?.message])

  return (
    <Wrapper
      hasError={!!fieldState.error}
    >
      <FieldLabel
        name={label}
        required={requiredMark}
      />
      {
        children || (
          <FormField
            defaultValue={defaultValue}
            innerRef={ref}
            onBlur={onBlur}
            onChange={onFieldChange}
            value={value}
            {...rest}
          />
        )
      }
      {Error}
    </Wrapper>
  )
}

FormItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.element
  ]),
  children: PropTypes.element,
  requiredMark: PropTypes.bool,
  field: PropTypes.shape({
    code: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    render: PropTypes.func,
    type: PropTypes.oneOf(
      Object.values(FormFieldType)
    ),
    requiredMark: PropTypes.bool,
    handler: PropTypes.shape({
      onChange: PropTypes.func
    }),
    rules: PropTypes.shape({
      required: requiredValidatorShape,
      maxLength: maxLengthValidatorShape,
      pattern: patternValidatorShape,
      validate: PropTypes.func
    }),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool
        ])
      )
    ])
  })
}

export { FormItem }
