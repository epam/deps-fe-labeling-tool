import React from 'react'
import { Checkbox as AntdCheckbox } from 'antd'
import PropTypes from 'prop-types'
import 'antd/lib/checkbox/style/index.less'

const Checkbox = ({
  onChange,
  value,
  innerRef,
  ...restProps
}) => (
  <AntdCheckbox
    {...restProps}
    ref={innerRef}
    checked={value}
    onChange={(e) => onChange?.(e)}
  />
)

Checkbox.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })
  ])
}

export { Checkbox }
