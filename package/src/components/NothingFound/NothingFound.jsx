
import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonType } from '@/components/Button'
import { ContentWrapper, Title } from './NothingFound.styles'

const RESOURCE_NO_MATCH_FOUND = 'No match found'
const RESOURCE_SHOW_ALL = 'Show all'

const NothingFound = ({
  resetFilter
}) => (
  <ContentWrapper>
    <Title>{RESOURCE_NO_MATCH_FOUND}</Title>
    <Button
      type={ButtonType.LINK}
      onClick={resetFilter}
    >
      {RESOURCE_SHOW_ALL}
    </Button>
  </ContentWrapper>
)

NothingFound.propTypes = {
  resetFilter: PropTypes.func.isRequired
}

export {
  NothingFound
}
