import React from 'react'
import PropTypes from 'prop-types'
import { StyledCollapse } from './Collapse.styles'

const { Panel } = StyledCollapse

const Collapse = ({
  children,
  className,
  defaultActiveKey,
  extra,
  header,
  collapseId,
  onChange,
  ...props
}) => (
  <StyledCollapse
    className={className}
    defaultActiveKey={defaultActiveKey}
    ghost
    onChange={onChange}
    {...props}
  >
    <Panel
      extra={extra}
      header={header}
      key={collapseId}
    >
      {children}
    </Panel>
  </StyledCollapse>
)

Collapse.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number)
  ]),
  extra: PropTypes.node,
  header: PropTypes.element,
  collapseId: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export { Collapse }
