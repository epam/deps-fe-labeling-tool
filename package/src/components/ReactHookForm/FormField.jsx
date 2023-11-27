import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from '@/components/Checkbox'
import { DatePicker } from '@/components/DatePicker'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { TextAreaField } from '@/components/TextAreaField'
import { FormFieldType } from './FormFieldType'

const FormField = ({
  render,
  type,
  ...restProps
}) => {
  if (render) {
    return render(restProps)
  }

  const getField = () => {
    switch (type) {
      case FormFieldType.ENUM:
        return <Select {...restProps} />
      case FormFieldType.CHECKMARK:
        return <Checkbox {...restProps} />
      case FormFieldType.DATE:
        return <DatePicker {...restProps} />
      case FormFieldType.STRING:
        return <Input {...restProps} />
      case FormFieldType.TEXTAREA:
        return <TextAreaField {...restProps} />
      default:
        throw new Error(`${type} is not supported field type.`)
    }
  }

  return getField()
}

FormField.propTypes = {
  render: PropTypes.func,
  type: PropTypes.oneOf(
    Object.values(FormFieldType)
  )
}

export { FormField }
