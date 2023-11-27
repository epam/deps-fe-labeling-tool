import React, { PureComponent } from 'react'
import { InputNumber } from 'antd'
import 'antd/lib/input-number/style/index.less'
import PropTypes from 'prop-types'

const ALLOWED_TO_KEY_DOWN_REGEXP = /^\d+$|Backspace|Delete|ArrowRight|ArrowLeft/

class NumericInput extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    formatter: PropTypes.func
  }

  state = {
    value: this.props.value
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      })
    }
  }

  onChange = (value) => {
    this.setState({
      value: value
    })

    if (
      value === '' ||
      value == null ||
      Number.isNaN(Number(value)) ||
      (this.props.min !== undefined && value < this.props.min) ||
      (this.props.max !== undefined && value > this.props.max)
    ) {
      return
    }

    this.props.onChange(value)
  }

  onKeyDown = (e) => {
    if (!ALLOWED_TO_KEY_DOWN_REGEXP.test(e.key)) {
      e.preventDefault()
    }
  }

  render = () => (
    <InputNumber
      className={this.props.className}
      min={this.props.min}
      max={this.props.max}
      value={this.state.value}
      onChange={this.onChange}
      disabled={this.props.disabled}
      formatter={this.props.formatter}
      onKeyDown={this.onKeyDown}
    />
  )
}

export {
  NumericInput
}
