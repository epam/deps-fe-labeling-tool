import React from 'react'
import { Col, Slider as AntdSlider } from 'antd'
import 'antd/lib/grid/style/index.less'
import 'antd/lib/slider/style/index.less'
import PropTypes from 'prop-types'
import { MinusIcon } from '@/components/Icons/MinusIcon'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Tooltip } from '@/components/Tooltip'
import { Shape } from '@/enums/Shape'
import { IconWrapper, ScaleInputNumber, SliderComponent, SliderButton } from './Slider.styles'

const RESOURCE_TOOLTIP_ZOOM_OUT = 'Zoom out'
const RESOURCE_TOOLTIP_ZOON_IN = 'Zoom in'

class Slider extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valuePrefix: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  onChange = (value) => {
    if (!value || value < this.props.min || value > this.props.max) {
      return
    }

    this.props.onChange(value)
  }

  incrementValue = () => {
    const { onChange, value, step } = this.props
    onChange(+value + step)
  }

  decrementValue = () => {
    const { onChange, value, step } = this.props
    onChange(+value - step)
  }

  formatter = (value) => {
    if (Number(value)) {
      return `${parseInt(value, 10)}${this.props.valuePrefix}`
    }
  }

  render () {
    const { min, max, value, step, disabled } = this.props
    return (
      <SliderComponent>
        <IconWrapper span={14}>
          <Tooltip title={RESOURCE_TOOLTIP_ZOOM_OUT}>
            <SliderButton
              icon={<MinusIcon />}
              shape={Shape.CIRCLE}
              onClick={this.decrementValue}
              disabled={value <= min || disabled}
            />
          </Tooltip>
          <AntdSlider
            disabled={disabled}
            min={min}
            max={max}
            onChange={this.onChange}
            value={value}
            tipFormatter={this.formatter}
          />
          <Tooltip title={RESOURCE_TOOLTIP_ZOON_IN}>
            <SliderButton
              icon={<PlusIcon />}
              shape={Shape.CIRCLE}
              onClick={this.incrementValue}
              disabled={value >= max || disabled}
            />
          </Tooltip>
        </IconWrapper>
        <Col span={10}>
          <ScaleInputNumber
            min={min}
            max={max}
            step={step}
            value={value}
            formatter={this.formatter}
            onChange={this.onChange}
            disabled={disabled}
          />
        </Col>
      </SliderComponent>
    )
  }
}

export {
  Slider
}
