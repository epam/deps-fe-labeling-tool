import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Option, optionShape } from '@/models/Option'
import { Select as StyledSelect } from './Select.styles'

const OptionFilterProp = {
  CHILDREN: 'children',
  LABEL: 'label'
}

const SelectMode = {
  MULTIPLE: 'multiple',
  TAGS: 'tags'
}

const enumToOptions = (obj) => Object.keys(obj).map((key) => (
  new Option(obj[key])
))

const keyValueToOptions = (obj) => Object.keys(obj).map((key) => (
  new Option(key, obj[key])
))

const stringsToOptions = (list, mapper) => list.map((value) => (
  new Option(value, mapper?.[value] || value)
))

class Select extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    allowSearch: PropTypes.bool,
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(optionShape).isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    dropdownRender: PropTypes.func,
    onSearch: PropTypes.func,
    suffixIcon: PropTypes.element,
    dropdownMatchSelectWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    getPopupContainer: PropTypes.func,
    mode: PropTypes.string
  }

  filterOption = (input, option) => {
    const content = option.props.children
    if (typeof content !== 'string') {
      return false
    }

    return content.toLowerCase().includes(input.toLowerCase())
  }

  renderOptions = () =>
    this.props.options.map(({ value, text }) => (
      <StyledSelect.Option key={value} value={value}>
        {text}
      </StyledSelect.Option>
    ))

  getContainer = (trigger) => trigger.parentNode

  render = () => (
    <StyledSelect
      className={this.props.className}
      defaultValue={this.props.defaultValue}
      dropdownMatchSelectWidth={this.props.dropdownMatchSelectWidth}
      dropdownRender={this.props.dropdownRender}
      getPopupContainer={this.props.getPopupContainer || this.getContainer}
      allowClear={this.props.allowClear}
      showSearch={this.props.allowSearch}
      placeholder={this.props.placeholder}
      value={this.props.value}
      onChange={this.props.onChange}
      onSearch={this.props.onSearch}
      filterOption={this.filterOption}
      suffixIcon={this.props.suffixIcon}
      disabled={this.props.disabled}
      mode={this.props.mode}
    >
      {this.renderOptions()}
    </StyledSelect>
  )
}

Select.Option = StyledSelect.Option

export {
  enumToOptions,
  keyValueToOptions,
  stringsToOptions,
  Select,
  OptionFilterProp,
  SelectMode
}
