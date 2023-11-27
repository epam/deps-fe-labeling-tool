import
React,
{
  useState,
  useEffect,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import { StyledTextArea } from './TextAreaField.styles'

const TextAreaField = ({
  value,
  disabled,
  onChange,
  onFocus,
  placeholder,
  className,
  maxLength,
  innerRef,
  showCount
}) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => setCurrentValue(value), [value])

  const onBlur = useCallback(() => {
    if (currentValue !== value) {
      onChange(currentValue)
    }
  }, [onChange, currentValue, value])

  const onChangeInput = useCallback((e) => {
    setCurrentValue(e.target.value)
  }, [])

  return (
    <StyledTextArea
      ref={innerRef}
      className={className}
      defaultValue={value}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={onChangeInput}
      onFocus={onFocus}
      placeholder={placeholder}
      showCount={showCount}
      value={currentValue}
    />
  )
}

TextAreaField.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })
  ]),
  showCount: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      formatter: PropTypes.func.isRequired
    })
  ])
}

export {
  TextAreaField
}
