import React from 'react'
import PropTypes from 'prop-types'
import isRequiredIf from 'react-proptype-conditional-require'
import { childrenShape } from '@/utils/propTypes'

const FormValidationMode = {
  ON_CHANGE: 'onChange',
  ON_BLUR: 'onBlur',
  ON_SUBMIT: 'onSubmit',
  ON_TOUCHED: 'onTouched',
  ALL: 'all'
}

const Form = ({
  children,
  onSubmit,
  handleSubmit,
  ...rest
}) => (
  <form
    onSubmit={handleSubmit?.(onSubmit)}
    {...rest}
  >
    {children}
  </form>
)

Form.propTypes = {
  children: childrenShape.isRequired,
  onSubmit: PropTypes.func,
  handleSubmit: isRequiredIf(
    PropTypes.func, (props) => props.onSubmit
  )
}

export {
  Form,
  FormValidationMode
}
