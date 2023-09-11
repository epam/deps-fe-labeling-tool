import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './ObjectTitle.styles'

const ObjectTitle = ({ title }) => (
  <Wrapper>
    {title}
  </Wrapper>
)

ObjectTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export {
  ObjectTitle
}
