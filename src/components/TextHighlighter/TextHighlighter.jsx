import React from 'react'
import escapeRegExp from 'lodash/escapeRegExp'
import PropTypes from 'prop-types'
import { Mark } from './TextHighlighter.styles'

const TextHighlighter = ({
  className,
  text,
  searchTerm
}) => {
  if (!searchTerm.trim()) {
    return (
      <span className={className}>
        {text}
      </span>
    )
  }

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi')

  return (
    <span className={className}>
      {
        text
          .split(regex)
          .filter((subStr) => subStr)
          .map((subStr, i) => (
            regex.test(subStr)
              ? (
                <Mark key={i}>
                  {subStr}
                </Mark>
              )
              : subStr
          ))
      }
    </span>
  )
}

TextHighlighter.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired
}

export {
  TextHighlighter
}
