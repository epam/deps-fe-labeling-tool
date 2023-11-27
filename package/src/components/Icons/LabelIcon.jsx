import React from 'react'
import PropTypes from 'prop-types'
import Label from '@/assets/icons/ic-32-add-data.svg'

const LabelIcon = (props) => (
  <Label onClick={props.onClick} />
)

LabelIcon.propTypes = {
  onClick: PropTypes.func
}

export {
  LabelIcon
}
