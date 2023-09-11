
import React, { PureComponent } from 'react'
import { Radio as AntdRadio } from 'antd'
import 'antd/lib/radio/style/index.less'
import PropTypes from 'prop-types'
import { optionShape } from '@/models/Option'

class RadioGroup extends PureComponent {
  onChange = (e) => {
    this.props.onChange?.(e.target.value)
  }

  render = () => {
    const { options, ...rest } = this.props
    return (
      <AntdRadio.Group
        {...rest}
        onChange={this.onChange}
      >
        {
          options.map(
            (o, i) => (
              <Radio
                key={i}
                value={o.value}
              >
                {o.text}
              </Radio>
            )
          )
        }
      </AntdRadio.Group>
    )
  }
}

RadioGroup.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(optionShape).isRequired
}

const Radio = (props) => <AntdRadio {...props} />

export {
  Radio,
  RadioGroup
}
