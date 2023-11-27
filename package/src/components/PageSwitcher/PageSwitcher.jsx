import React from 'react'
import PropTypes from 'prop-types'
import { LeftIcon } from '@/components/Icons/LeftIcon'
import { RightIcon } from '@/components/Icons/RightIcon'
import { Input } from '@/components/Input'
import {
  Switcher,
  Splitter,
  PagesQuantity,
  PaginationButton
} from './PageSwitcher.styles'

class PageSwitcher extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    pagesQuantity: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    changeActivePage: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  prevPage = () => {
    const { activePage } = this.props
    this.onInputChange(Number(activePage) - 1)
  }

  nextPage = () => {
    const { activePage } = this.props
    this.onInputChange(Number(activePage) + 1)
  }

  onInputChange = (newActivePage) => {
    const { activePage, pagesQuantity, changeActivePage } = this.props
    if (newActivePage !== activePage &&
        newActivePage > 0 &&
        newActivePage <= pagesQuantity) {
      changeActivePage(newActivePage)
    }
  }

  render () {
    const { className, pagesQuantity, activePage, disabled } = this.props

    return (
      <Switcher className={className}>
        <PaginationButton
          icon={<LeftIcon />}
          onClick={this.prevPage}
          disabled={activePage === 1}
        />
        <Input.Numeric
          disabled={disabled}
          min={1}
          max={pagesQuantity}
          value={activePage}
          onChange={this.onInputChange}
        />
        <PaginationButton
          icon={<RightIcon />}
          onClick={this.nextPage}
          disabled={activePage === pagesQuantity}
        />
        <Splitter disabled={disabled}>/</Splitter>
        <PagesQuantity
          disabled={disabled}
        >
          {pagesQuantity}
        </PagesQuantity>
      </Switcher>
    )
  }
}

export {
  PageSwitcher
}
